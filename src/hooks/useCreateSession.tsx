import { useCallback } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PARTNER_SESSION_ENDPOINT}`;
const PARTNER_BEARER = import.meta.env.VITE_PARTNER_BEARER;

type SessionResponse = {
    token?: string;
    webview_url?: string;
    session_url?: string;
};

function getJwtExpMs(token: string): number | null {
    try {
        const [, payloadB64] = token.split(".");
        if (!payloadB64) return null;
        const payloadJson = atob(payloadB64.replace(/-/g, "+").replace(/_/g, "/"));
        const payload = JSON.parse(payloadJson);
        if (typeof payload.exp !== "number") return null;
        return payload.exp * 1000;
    } catch {
        return null;
    }
}

export function useCreateSession() {
    const createSession = useCallback(async () => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${PARTNER_BEARER}`,
                },
                body: JSON.stringify({
                    external_user_id: "test12415",
                    locale: "ru",
                    phone: "+99362395737",
                }),
            });

            if (!response.ok) {
                const text = await response.text().catch(() => "");
                console.error("Backend error:", response.status, text);
                return null;
            }

            const data = (await response.json()) as SessionResponse;

            let token: string | undefined = data.token;

            if (!token && data.session_url) {
                try {
                    token = new URL(data.session_url).searchParams.get("token") ?? undefined;
                } catch { }
            }
            if (!token && data.webview_url) {
                try {
                    token = new URL(data.webview_url).searchParams.get("token") ?? undefined;
                } catch { }
            }

            if (!token) {
                console.error("No token found:", data);
                return null;
            }

            const expMs = getJwtExpMs(token) ?? (Date.now() + 55 * 60 * 1000); // fallback
            localStorage.setItem("session_token", token);
            localStorage.setItem("session_token_exp", String(expMs));

            return token;
        } catch (err) {
            console.error("Failed to create session:", err);
            return null;
        }
    }, []);

    return { createSession };
}
