import { useEffect, useState } from "react";

export type ProductGroup = {
    group_name: string;
    category: string;
    icon_url: string;
};

const GROUPS_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_GROUPS_PATH}`;

export function useProductGroups(category: "games" | "business" = "games") {
    const [data, setData] = useState<ProductGroup[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("session_token");
        if (!token) {
            setError("No session token.");
            setData([]);
            return;
        }

        const controller = new AbortController();

        const fetchGroups = async () => {
            try {
                setLoading(true);
                setError(null);

                const url = `${GROUPS_URL}?category=${category}`;

                const res = await fetch(url, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                    signal: controller.signal,
                });

                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    console.error("Groups error:", res.status, text);
                    throw new Error(text || `Request failed with status ${res.status}`);
                }

                const json = (await res.json()) as ProductGroup[];
                setData(Array.isArray(json) ? json : []);
            } catch (e) {
                if (e instanceof DOMException && e.name === "AbortError") return;
                console.error("Groups fetch failed:", e);
                setError(e instanceof Error ? e.message : "Failed to fetch groups");
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGroups();
        return () => controller.abort();
    }, [category]);

    return { data, loading, error };
}
