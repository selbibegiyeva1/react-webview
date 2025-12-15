import { useEffect, useState } from "react";

export type ProductGroup = {
    group_name: string;
    category: string;
    icon_url: string;
};

const GROUPS_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GROUPS_PATH}`;

export function useProductGroups() {
    const [data, setData] = useState<ProductGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("session_token");
        if (!token) {
            setError("No session token.");
            setData([]);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        (async () => {
            try {
                setLoading(true);
                setError(null);

                // ✅ fetch entire endpoint once (no category query)
                const res = await fetch(GROUPS_URL, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(text || `Request failed with status ${res.status}`);
                }

                const json = (await res.json()) as ProductGroup[];
                setData(Array.isArray(json) ? json : []);
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                setError(e instanceof Error ? e.message : "Failed to fetch groups");
                setData([]);
            } finally {
                setLoading(false);
            }
        })();

        return () => controller.abort();
    }, []);

    return { data, loading, error };
}
