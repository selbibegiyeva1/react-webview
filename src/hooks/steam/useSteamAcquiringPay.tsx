import { useCallback, useState } from "react";

const STEAM_ACQUIRING_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_STEAM_ACQUIRING_ENDPOINT}`;

type SteamAcquiringPayload = {
    steam_username: string;
    amount_tmt: number;
    email: string;
    bank: string;
};

type SteamAcquiringResponse = {
    status: boolean;
    payment_url?: string;
    comment?: string;
};

export function useSteamAcquiringPay() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPayment = useCallback(
        async (payload: SteamAcquiringPayload) => {
            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("session_token");
                if (!token) {
                    throw new Error("No session token. Create session first.");
                }

                const response = await fetch(STEAM_ACQUIRING_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!response.ok) {
                    const text = await response.text().catch(() => "");
                    console.error("Steam acquiring error:", response.status, text);
                    throw new Error(text || `Request failed with status ${response.status}`);
                }

                const data = (await response.json()) as SteamAcquiringResponse;

                if (!data.status || !data.payment_url) {
                    console.error("Unexpected acquiring response:", data);
                    throw new Error(data.comment || "No payment_url in response");
                }

                window.location.href = data.payment_url;
            } catch (err) {
                console.error("Failed to create acquiring payment:", err);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to create acquiring payment"
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { createPayment, loading, error };
}
