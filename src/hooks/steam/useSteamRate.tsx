import { useEffect, useState } from "react";

const STEAM_RATE_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_STEAM_RATE_ENDPOINT}`;

type SteamRateResponse = {
    amount_tmt: number;
    topup_amount_usd: number;
};

export function useSteamRate(amountTmt: number | null) {
    const [usdAmount, setUsdAmount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("session_token");

        if (!amountTmt || !token) {
            setUsdAmount(null);
            return;
        }

        const controller = new AbortController();

        const fetchRate = async () => {
            try {
                setLoading(true);
                setError(null);

                const queryAmount = amountTmt;

                const url = `${STEAM_RATE_URL}?amount_tmt=${queryAmount}`;

                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    signal: controller.signal,
                });

                if (!response.ok) {
                    const text = await response.text().catch(() => "");
                    console.error("Steam rate error:", response.status, text);
                    setError("Failed to fetch Steam rate");
                    setUsdAmount(null);
                    return;
                }

                const data = (await response.json()) as SteamRateResponse;

                setUsdAmount(data.topup_amount_usd ?? null);
            } catch (err) {
                if (err instanceof DOMException && err.name === "AbortError") return;
                console.error("Steam rate fetch failed:", err);
                setError("Failed to fetch Steam rate");
                setUsdAmount(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRate();

        return () => controller.abort();
    }, [amountTmt]);

    return { usdAmount, loading, error };
}
