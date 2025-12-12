import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_PARTNER_SESSION_ENDPOINT}`;
const PARTNER_BEARER = import.meta.env.VITE_PARTNER_BEARER;

type SessionResponse = {
    token?: string;
    webview_url?: string;
    session_url?: string;
};

type CreateSessionOptions = {
    redirectTo?: string;
    replace?: boolean;
};

export function useCreateSession() {
    const navigate = useNavigate();

    const createSession = useCallback(
        async (opts: CreateSessionOptions = {}) => {
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

                localStorage.setItem("session_token", token);

                if (opts.redirectTo) {
                    navigate(opts.redirectTo, { replace: opts.replace ?? true });
                }

                return token;
            } catch (err) {
                console.error("Failed to create session:", err);
                return null;
            }
        },
        [navigate]
    );

    return { createSession };
}
