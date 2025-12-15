import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useCreateSession } from "../hooks/useCreateSession";

function isExpired(): boolean {
    const expRaw = localStorage.getItem("session_token_exp");
    if (!expRaw) return true;
    const exp = Number(expRaw);
    if (!Number.isFinite(exp)) return true;

    return Date.now() > exp - 30_000;
}

export default function SessionBootstrap() {
    const { createSession } = useCreateSession();
    const [searchParams, setSearchParams] = useSearchParams();
    const ran = useRef(false);

    useEffect(() => {
        if (ran.current) return;
        ran.current = true;

        const accessToken =
            searchParams.get("access_token") ||
            searchParams.get("accessToken") ||
            searchParams.get("token");

        if (accessToken) {
            localStorage.setItem("access_token", accessToken);

            const next = new URLSearchParams(searchParams);
            next.delete("access_token");
            next.delete("accessToken");
            next.delete("token");
            setSearchParams(next, { replace: true });
        }

        const existingSession = localStorage.getItem("session_token");

        if (existingSession && !isExpired()) return;

        localStorage.removeItem("session_token");
        localStorage.removeItem("session_token_exp");

        void createSession();
    }, [createSession, searchParams, setSearchParams]);

    return null;
}
