import { useEffect, useState } from "react";

export type GroupItemOption = {
    value: string | number;
    name?: string;
    product?: string;
    price?: number;
    region?: string;
    name_prefix?: string;
    type?: string;
};

export type GroupItemField = {
    name: string;
    type: "text" | "options";
    label: string;
    options?: GroupItemOption[];
};

export type GroupItemForms = {
    voucher_fields?: GroupItemField[] | null;
    topup_fields?: GroupItemField[] | null;
};

export type GroupItemResponse = {
    icon?: string;
    group?: string;
    short_info?: string;
    image?: string;
    category?: string;
    forms?: GroupItemForms | null;
};

export type Status = "idle" | "loading" | "success" | "error";

const GROUP_FORM_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GROUP_FORM_PATH}`;

export function useGroupItem(groupName: string) {
    const [status, setStatus] = useState<Status>("idle");
    const [data, setData] = useState<GroupItemResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("session_token");

        if (!token) {
            setStatus("error");
            setError("No session token");
            setData(null);
            return;
        }

        if (!groupName) {
            setStatus("error");
            setError("Missing group name");
            setData(null);
            return;
        }

        const controller = new AbortController();
        setStatus("loading");
        setError(null);
        setData(null);

        (async () => {
            try {
                const url = `${GROUP_FORM_URL}?group=${encodeURIComponent(groupName)}`;

                const res = await fetch(url, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(text || `Request failed with status ${res.status}`);
                }

                const json = (await res.json()) as GroupItemResponse;
                setData(json ?? null);
                setStatus("success");
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setError(e instanceof Error ? e.message : "Failed to fetch");
                setStatus("error");
            }
        })();

        return () => controller.abort();
    }, [groupName]);

    return { status, data, error };
}
