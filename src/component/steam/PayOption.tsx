import { useState } from "react";

function PayOption() {
    const [activeType, setActiveType] = useState<"deposit" | "voucher">("deposit");
    const [activeNominal, setActiveNominal] = useState<number | null>(null);

    const nominals = [1, 2, 5, 10, 15, 20, 25, 50, 100];

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[20px]">Выберите способо пополнения</b>

            <div className="mt-4 flex gap-3.5">
                <button
                    onClick={() => setActiveType("deposit")}
                    className={`px-4 py-[10.5px] font-bold rounded-[10px] transition-all 
                    ${activeType === "deposit"
                            ? "bg-[#79109D]"
                            : "bg-[#2F2F36]"
                        }`}
                >
                    Пополнение
                </button>

                <button
                    disabled
                    className="px-4 py-[10.5px] font-bold rounded-[10px] bg-[#79109D] opacity-50"
                >
                    Ваучер (скоро)
                </button>
            </div>

            <div className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                    <b className="text-[20px]">Выберите регион</b>
                    <div className="relative">
                        <select className="px-4 py-3.5 w-full border outline-0 bg-[#1D1D22] border-[#FFFFFF1A] rounded-[10px] appearance-none">
                            <option>СНГ</option>
                            <option>Европа</option>
                            <option>Азия</option>
                        </select>
                        <svg
                            className="absolute top-[50%] right-2.5 pointer-events-none translate-x-[-50%] translate-y-[-50%]"
                            width="20" height="20" viewBox="0 0 20 20"
                            fill="none" xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3.33366 6.66699L10.0003 13.3337L16.667 6.66699"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>

                {/* Nominals */}
                <div className="flex flex-col gap-4">
                    <b className="text-[20px]">Выберите номинал</b>
                    <div className="flex flex-wrap gap-3">

                        {nominals.map((value) => (
                            <button
                                key={value}
                                onClick={() => setActiveNominal(value)}
                                className={`px-6 py-[11.5px] font-bold rounded-[10px] transition-all
                                ${activeNominal === value
                                        ? "bg-[#79109D] text-white"
                                        : "bg-[#2F2F36] text-white/80"
                                    }`}
                            >
                                {value}$
                            </button>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PayOption;
