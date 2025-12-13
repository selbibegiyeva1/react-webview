import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useCreateSession } from "../hooks/useCreateSession";

export default function SessionBootstrap() {
    const { createSession } = useCreateSession();
    const [searchParams, setSearchParams] = useSearchParams();
    const ran = useRef(false);

    useEffect(() => {
        if (ran.current) return;
        ran.current = true;

        // 1) Grab access token from your generated link (adjust key names if needed)
        const accessToken =
            searchParams.get("access_token") ||
            searchParams.get("accessToken") ||
            searchParams.get("token");

        if (accessToken) {
            localStorage.setItem("access_token", accessToken);

            // remove token from URL (don’t keep secrets in the address bar)
            const next = new URLSearchParams(searchParams);
            next.delete("access_token");
            next.delete("accessToken");
            next.delete("token");
            setSearchParams(next, { replace: true });
        }

        // 2) If we already have a session token, don’t call again
        const existingSession = localStorage.getItem("session_token");
        if (existingSession) return;

        // 3) Create session once on initial mount
        void createSession();
    }, [createSession, searchParams, setSearchParams]);

    return null;
}
