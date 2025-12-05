import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const USER_INFO_URL = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_USER_INFO_ENDPOINT}`;

type UserInfoResponse = {
    company?: {
        logo?: string;
    };
};

function Navbar() {
    const [companyLogo, setCompanyLogo] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("session_token");
        if (!token) return;

        (async () => {
            try {
                const res = await fetch(USER_INFO_URL, {
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) {
                    console.warn("Bad response:", res.status);
                    return;
                }

                const data = (await res.json()) as UserInfoResponse;
                setCompanyLogo(data.company?.logo ?? null);
            } catch (e) {
                console.error("userinfo error:", e);
            }
        })();
    }, []);

    return (
        <div className="navbar">
            <div className="flex items-center justify-between w-full md:w-3xl md:m-auto px-4">
                <div className="flex items-center gap-2">
                    <Link to="/">
                        <img src="/logo.png" className="w-[63px]" />
                    </Link>

                    <svg width="16" height="16" viewBox="0 0 16 16">
                        <path
                            d="M5 5L11 11M11 5L5 11"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    {companyLogo && <img src={companyLogo} className="w-8 h-8" />}
                </div>

                <select className="outline-none text-white bg-[#22222899] text-[15px] font-medium">
                    <option value="RU">RU</option>
                    <option value="TKM">TKM</option>
                </select>
            </div>
        </div>
    );
}

export default Navbar;
