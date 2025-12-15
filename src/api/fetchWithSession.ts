import { getSessionToken } from "../auth/session";

export async function fetchWithSession(input: RequestInfo, init: RequestInit = {}) {
    const token = getSessionToken();

    const headers = new Headers(init.headers || {});
    if (token) headers.set("Authorization", `Bearer ${token}`);

    return fetch(input, { ...init, headers });
}
