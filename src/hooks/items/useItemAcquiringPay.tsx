import { useCallback, useState } from "react";

type AcquiringResponse = {
    status: boolean;
    payment_url?: string;
    comment?: string;
};

function joinUrl(base: string, path: string) {
    const b = base ?? "";
    const p = path ?? "";
    if (!b) return p;
    if (!p) return b;
    if (b.endsWith("/") && p.startsWith("/")) return b.slice(0, -1) + p;
    if (!b.endsWith("/") && !p.startsWith("/")) return b + "/" + p;
    return b + p;
}

async function readErrorMessage(res: Response): Promise<string> {
    const text = await res.text().catch(() => "");
    if (!text) return `Request failed with status ${res.status}`;

    try {
        const json = JSON.parse(text) as { comment?: string; message?: string };
        return json.comment || json.message || text;
    } catch {
        return text;
    }
}

export function useItemAcquiringPay() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createTopupPayment = useCallback(
        async (payload: Record<string, unknown>, opts?: { redirect?: boolean }) => {
            const redirect = opts?.redirect ?? true;

            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("session_token");
                if (!token) throw new Error("No session token. Create session first.");

                const url = joinUrl(
                    import.meta.env.VITE_API_BASE_URL,
                    import.meta.env.VITE_TOPUP_ACQUIRING_ENDPOINT
                );

                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error(await readErrorMessage(res));

                const data = (await res.json()) as AcquiringResponse;

                if (!data.status || !data.payment_url) {
                    throw new Error(data.comment || "No payment_url in response");
                }

                if (redirect) window.location.href = data.payment_url;
                return data.payment_url;
            } catch (e) {
                console.error("TOPUP acquiring pay failed:", e);
                setError(e instanceof Error ? e.message : "Failed to create acquiring payment");
                return undefined;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const createVoucherPayment = useCallback(
        async (payload: { product_id: string | number; email: string; bank: string }, opts?: { redirect?: boolean }) => {
            const redirect = opts?.redirect ?? true;

            try {
                setLoading(true);
                setError(null);

                const token = localStorage.getItem("session_token");
                if (!token) throw new Error("No session token. Create session first.");

                const url = joinUrl(
                    import.meta.env.VITE_API_BASE_URL,
                    import.meta.env.VITE_VOUCHER_ACQUIRING_ENDPOINT
                );

                const res = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error(await readErrorMessage(res));

                const data = (await res.json()) as AcquiringResponse;

                if (!data.status || !data.payment_url) {
                    throw new Error(data.comment || "No payment_url in response");
                }

                if (redirect) window.location.href = data.payment_url;
                return data.payment_url;
            } catch (e) {
                console.error("VOUCHER acquiring pay failed:", e);
                setError(e instanceof Error ? e.message : "Failed to create acquiring payment");
                return undefined;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    return { createTopupPayment, createVoucherPayment, loading, error };
}
