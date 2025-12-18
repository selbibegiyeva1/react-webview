import { useCallback, useEffect, useState } from "react";
import type { VoucherField } from "../../component/steam/SteamVoucherForm";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const VOUCHER_ENDPOINT = import.meta.env.VITE_STEAM_VOUCHER_ENDPOINT;
const STEAM_FORMS_URL = `${API_BASE}${VOUCHER_ENDPOINT}`;

type VoucherFieldsResponse = {
    forms?: { voucher_fields?: unknown };
    voucher_fields?: unknown;
};

function extractVoucherFields(data: VoucherFieldsResponse): VoucherField[] {
    const raw = (data?.forms?.voucher_fields ?? data?.voucher_fields) as unknown;
    return Array.isArray(raw) ? (raw as VoucherField[]) : [];
}

export function useSteamVoucherFields(enabled: boolean) {
    const [fields, setFields] = useState<VoucherField[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchFields = useCallback(async (signal?: AbortSignal) => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("session_token");

            const res = await fetch(STEAM_FORMS_URL, {
                method: "GET",
                headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                signal,
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(text || `Request failed with status ${res.status}`);
            }

            const data = (await res.json()) as VoucherFieldsResponse;
            setFields(extractVoucherFields(data));
        } catch (e) {
            if (e instanceof DOMException && e.name === "AbortError") return;
            setError(e instanceof Error ? e.message : "Failed to load voucher fields");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!enabled) return;
        if (fields.length) return;

        const controller = new AbortController();
        fetchFields(controller.signal);

        return () => controller.abort();
    }, [enabled, fields.length, fetchFields]);

    const refetch = useCallback(async () => {
        const controller = new AbortController();
        await fetchFields(controller.signal);
    }, [fetchFields]);

    return { fields, loading, error, refetch };
}
