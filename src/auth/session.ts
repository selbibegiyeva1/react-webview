function base64UrlDecode(input: string) {
    const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
    const pad = base64.length % 4 ? "=".repeat(4 - (base64.length % 4)) : "";
    const decoded = atob(base64 + pad);
    return decoded;
}

export function getTokenFromUrl(): string | null {
    const url = new URL(window.location.href);
    return url.searchParams.get("token");
}

export function removeTokenFromUrl() {
    const url = new URL(window.location.href);
    url.searchParams.delete("token");
    window.history.replaceState({}, "", url.toString());
}

export function isJwtExpired(token: string): boolean {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    try {
        const payloadJson = base64UrlDecode(parts[1]);
        const payload = JSON.parse(payloadJson);
        const exp = payload?.exp;

        if (typeof exp !== "number") return false;

        const nowSeconds = Math.floor(Date.now() / 1000);
        return nowSeconds >= exp;
    } catch {
        return false;
    }
}

export function saveSessionToken(token: string) {
    localStorage.setItem("session_token", token);
}

export function getSessionToken(): string | null {
    return localStorage.getItem("session_token");
}
