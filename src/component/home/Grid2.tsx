import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useProductGroups } from "../../hooks/home/useProductGroups";

function Grid2() {
    const [category, setCategory] = useState<"games" | "business">("games");
    const { data, loading, error } = useProductGroups();

    const filtered = useMemo(
        () => data.filter((g) => g.category === category),
        [data, category]
    );

    return (
        <div>
            <div className="flex gap-2">
                <button
                    onClick={() => setCategory("games")}
                    className={`flex items-center gap-1.5 font-bold px-4 py-[9px] rounded-[10px]
                        ${category === "games" ? "bg-[#79109D]" : "bg-[#2F2F36]"}`}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M9.16667 6.41665C9.16667 7.93543 7.93545 9.16665 6.41667 9.16665C4.89788 9.16665 3.66667 7.93543 3.66667 6.41665C3.66667 4.89786 4.89788 3.66665 6.41667 3.66665C7.93545 3.66665 9.16667 4.89786 9.16667 6.41665Z" stroke="white" strokeWidth="1.8" />
                        <path d="M12.8333 12.8333H18.3333V18.3333H12.8333V12.8333Z" stroke="white" strokeWidth="1.8" />
                        <path d="M5.04167 14.2083L2.75 15.5833L5.04167 16.9583L6.41667 19.25L7.79167 16.9583L10.0833 15.5833L7.79167 14.2083L6.41667 11.9166L5.04167 14.2083Z" stroke="white" strokeWidth="1.8" />
                        <path d="M15.5833 3.20831L19.25 9.16665H11.9167L15.5833 3.20831Z" stroke="white" strokeWidth="1.8" />
                    </svg>
                    <span>Игры</span>
                </button>

                <button
                    onClick={() => setCategory("business")}
                    className={`flex items-center gap-1.5 font-bold px-4 py-[9px] rounded-[10px]
                        ${category === "business" ? "bg-[#79109D]" : "bg-[#2F2F36]"}`}
                >
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M8.08333 18.583H10.75M13.4167 18.583H10.75M10.75 18.583V15.958M10.75 15.958H16.75C17.8546 15.958 18.75 15.0626 18.75 13.958V6.58301C18.75 5.47844 17.8546 4.58301 16.75 4.58301H4.75C3.64543 4.58301 2.75 5.47844 2.75 6.58301V13.958C2.75 15.0626 3.64543 15.958 4.75 15.958H10.75Z"
                            stroke="white" strokeWidth="2" />
                    </svg>
                    <span>Программы</span>
                </button>
            </div>

            <div className="pt-6">
                {loading ? (
                    <div className="text-white">Loading…</div>
                ) : error ? (
                    <div className="text-red-400">{error}</div>
                ) : (
                    <div className="grid grid-cols-2 gap-5">
                        {filtered.map((group) => (
                            <div key={group.group_name}>
                                <Link to={`/item/${encodeURIComponent(group.group_name)}`}>
                                    <div className="overflow-hidden rounded-3xl h-[185px] md:h-[200px] bg-[#222228] flex items-center justify-center">
                                        <img
                                            src={group.icon_url}
                                            alt={group.group_name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <center>
                                        <b className="mt-2.5 block">{group.group_name}</b>
                                    </center>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Grid2;
