import { useEffect, useState, type ReactNode } from "react";
import AccessDenied from "../component/layout/AccessDenied";
import {
    getTokenFromUrl,
    isJwtExpired,
    removeTokenFromUrl,
    saveSessionToken,
} from "../auth/session";

type Status = "loading" | "ok" | "error";

export default function SessionGuard({ children }: { children: ReactNode }) {
    const [status, setStatus] = useState<Status>("loading");
    const [message, setMessage] = useState("Checking session…");

    useEffect(() => {
        const urlToken = getTokenFromUrl();
        const storedToken = localStorage.getItem("session_token");
        const token = urlToken || storedToken;

        if (!token) {
            setStatus("error");
            setMessage("Попробуйте обновить страницу или вернуться позднее");
            return;
        }

        if (isJwtExpired(token)) {
            localStorage.removeItem("session_token");
            setStatus("error");
            setMessage("Session expired. Request a new session link.");
            return;
        }

        if (urlToken && urlToken !== storedToken) {
            saveSessionToken(urlToken);
            removeTokenFromUrl();
        }

        setStatus("ok");
    }, []);

    if (status === "loading") {
        return <div className="p-6 text-white">Checking session…</div>;
    }

    if (status === "error") {
        return <AccessDenied message={message} />;
    }

    return children;
}
