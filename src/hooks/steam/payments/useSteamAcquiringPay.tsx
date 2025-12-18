import { useCallback, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
const STEAM_ACQUIRING_URL = `${API_BASE}${import.meta.env.VITE_STEAM_ACQUIRING_ENDPOINT}`;
const VOUCHER_ACQUIRING_URL = `${API_BASE}${import.meta.env.VITE_VOUCHER_ACQUIRING_ENDPOINT}`;

type AcquiringResponse = {
    status: boolean;
    payment_url?: string;
    comment?: string;
};

type SteamTopupPayload = {
    steam_username: string;
    amount_tmt: number;
    email: string;
    bank: string;
};

export function useSteamAcquiringPay() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postAcquiring = useCallback(async (url: string, payload: unknown) => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem("session_token");
            if (!token) {
                throw new Error("No session token. Create session first.");
            }

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                console.error("Acquiring error:", response.status, text);
                throw new Error(text || `Request failed with status ${response.status}`);
            }

            const data = (await response.json()) as AcquiringResponse;

            if (!data.status || !data.payment_url) {
                console.error("Unexpected acquiring response:", data);
                throw new Error(data.comment || "No payment_url in response");
            }

            window.location.href = data.payment_url;
        } catch (err) {
            console.error("Failed to create acquiring payment:", err);
            setError(err instanceof Error ? err.message : "Failed to create acquiring payment");
        } finally {
            setLoading(false);
        }
    }, []);

    const createTopupPayment = useCallback(
        async (payload: SteamTopupPayload) => {
            await postAcquiring(STEAM_ACQUIRING_URL, payload);
        },
        [postAcquiring]
    );

    const createVoucherPayment = useCallback(
        async (payload: Record<string, unknown>) => {
            await postAcquiring(VOUCHER_ACQUIRING_URL, payload);
        },
        [postAcquiring]
    );

    return { createTopupPayment, createVoucherPayment, loading, error };
}
