import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProductGroups, type ProductGroup } from "../../hooks/home/useProductGroups";

function Search() {
    const navigate = useNavigate();
    const { data, loading, error } = useProductGroups();

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const onPointerDown = (e: PointerEvent) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target as Node)) setOpen(false);
        };

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };

        window.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        const list = Array.isArray(data) ? data : [];

        if (!q) return list.slice(0, 12);

        return list
            .filter((g) => (g.group_name || "").toLowerCase().includes(q))
            .slice(0, 20);
    }, [data, query]);

    const handleSelect = (g: ProductGroup) => {
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();

        const name = (g.group_name || "").trim().toLowerCase();

        if (name === "steam") {
            navigate("/steam");
            return;
        }

        navigate(`/item/${encodeURIComponent(g.group_name)}`);
    };

    const shouldShowDropdown = open && (loading || !!error || query.trim().length > 0 || results.length > 0);

    return (
        <div ref={rootRef} className="my-4 relative">
            <form
                className="flex items-center gap-2 bg-[#27272D] px-[22px] py-2 rounded-[10px]"
                onSubmit={(e) => e.preventDefault()}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M13.3891 13.3891L19 19M9.5 15C12.5376 15 15 12.5376 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15Z"
                        stroke="white"
                        strokeOpacity="0.5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>

                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    placeholder="Поиск"
                    className="flex-1 bg-transparent text-[16px] font-medium outline-0 text-white placeholder:text-white/50"
                    onFocus={() => setOpen(true)}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setOpen(true);
                    }}
                />
            </form>

            {shouldShowDropdown && (
                <div className="absolute left-0 right-0 top-full mt-2 z-10 bg-[#1D1D22] border border-white/5 rounded-[14px] overflow-hidden shadow-lg">
                    {loading ? (
                        <div className="px-4 py-4 text-white/60 text-[14px]">Loading…</div>
                    ) : error ? (
                        <div className="px-4 py-4 text-red-400 text-[14px]">{error}</div>
                    ) : results.length === 0 ? (
                        <div className="px-4 py-4 text-white/60 text-[14px]">Ничего не найдено</div>
                    ) : (
                        <ul className="max-h-80 overflow-auto">
                            {results.map((g) => (
                                <li key={`${g.category}-${g.group_name}`}>
                                    <button
                                        type="button"
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/5"
                                        onClick={() => handleSelect(g)}
                                    >
                                        <GroupIcon src={g.icon_url} alt={g.group_name} />
                                        <div className="min-w-0">
                                            <div className="text-[15px] font-medium text-white truncate">
                                                {g.group_name}
                                            </div>
                                            <div className="text-[12px] text-white/40 capitalize">
                                                {g.category}
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

function GroupIcon({ src, alt }: { src: string; alt: string }) {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return (
            <div className="w-8 h-8 rounded-[10px] bg-white/10 flex items-center justify-center text-[11px] text-white/40 shrink-0">
                ?
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className="w-8 h-8 rounded-[10px] object-cover shrink-0"
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

export default Search;
