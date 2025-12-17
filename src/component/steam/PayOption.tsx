import { useEffect, useState } from "react";

interface PayOptionProps {
    activeType: "deposit" | "voucher";
    onChangeType: (type: "deposit" | "voucher") => void;

    onChangeAmount: (amountTmt: number) => void;
    region: string;
    onChangeRegion: (region: string) => void;
}

function PayOption({
    activeType,
    onChangeType,
    onChangeAmount,
    region,
    onChangeRegion,
}: PayOptionProps) {
    const nominals = [20, 40, 100, 150, 200, 500, 1000];
    const [activeNominal, setActiveNominal] = useState<number>(nominals[0]);

    useEffect(() => {
        if (activeType !== "deposit") return;
        onChangeAmount(activeNominal);
    }, [activeNominal, activeType, onChangeAmount]);

    const handleNominalClick = (nominal: number) => {
        setActiveNominal(nominal);
    };

    const [toltip, setToltip] = useState(false);
    const toltipFunc = () => setToltip((prev) => !prev);

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[20px]">Выберите способ пополнения</b>

            <div className="mt-4 flex gap-3.5">
                <button
                    type="button"
                    onClick={() => onChangeType("deposit")}
                    className={`px-4 py-[10.5px] font-bold rounded-[10px] transition-all 
                        ${activeType === "deposit" ? "bg-[#79109D]" : "bg-[#2F2F36]"}`}
                >
                    Пополнение
                </button>

                <button
                    type="button"
                    onClick={() => onChangeType("voucher")}
                    className={`px-4 py-[10.5px] font-bold rounded-[10px] transition-all 
                        ${activeType === "voucher" ? "bg-[#79109D]" : "bg-[#2F2F36]"}`}
                >
                    Ваучер
                </button>
            </div>

            {activeType === "deposit" && (
                <div className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-4">
                        <b className="text-[20px]">Выберите регион</b>
                        <div className="relative">
                            <select
                                value={region}
                                onChange={(e) => {
                                    onChangeRegion(e.target.value);
                                    setToltip(false);
                                }}
                                className="px-4 py-3.5 cursor-pointer w-full border outline-0 bg-[#1D1D22] border-[#FFFFFF1A] rounded-[10px] appearance-none"
                            >
                                <option>СНГ</option>
                                <option>Россия</option>
                            </select>

                            <svg
                                className="absolute top-[50%] right-2.5 pointer-events-none translate-x-[-50%] translate-y-[-50%]"
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.33366 6.66699L10.0003 13.3337L16.667 6.66699"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>

                            {region === "СНГ" && (
                                <div className="absolute top-[50%] left-20 translate-x-[-50%] translate-y-[-50%]">
                                    <div className="relative">
                                        <svg
                                            onClick={toltipFunc}
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="cursor-pointer"
                                        >
                                            <rect width="20" height="20" rx="6" fill="#2F2F36" />
                                            <path
                                                d="M10 7.66667V7.95833M10 10V12.3333M10 15.25C12.8995 15.25 15.25 12.8995 15.25 10C15.25 7.1005 12.8995 4.75 10 4.75C7.1005 4.75 4.75 7.1005 4.75 10C4.75 12.8995 7.1005 15.25 10 15.25Z"
                                                stroke="white"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>

                                        <p
                                            className={`bg-[#2F2F36] text-[14px] font-medium p-4 rounded-2xl w-[300px] absolute top-[50px] -left-20 shadow-2xl ${toltip ? "block" : "hidden"
                                                }`}
                                        >
                                            Азербайджан, Армения, Беларусь, Казахстан, Киргизия,
                                            Молдова, Таджикистан, Туркменистан, Узбекистан
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <b className="text-[20px]">Выберите номинал</b>
                        <div className="flex flex-wrap gap-3">
                            {nominals.map((nominal) => (
                                <button
                                    key={nominal}
                                    type="button"
                                    onClick={() => handleNominalClick(nominal)}
                                    className={`py-[11.5px] px-6 cursor-pointer rounded-[10px] text-[14px] font-bold transition-colors 
                                        ${activeNominal === nominal ? "bg-[#A132C7]" : "bg-[#2E2E31]"}`}
                                >
                                    {nominal} TMT
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PayOption;
