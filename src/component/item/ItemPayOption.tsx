import { useState } from "react";

function ItemPayOption() {
    const [activeType, setActiveType] = useState<"deposit" | "voucher">("deposit");

    const nominals = [20, 40, 100, 150, 200, 500, 1000];
    const [activeNominal, setActiveNominal] = useState<number>(nominals[0]);

    const handleNominalClick = (nominal: number) => {
        setActiveNominal(nominal);
    };

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[20px]">Выберите способо пополнения</b>

            <div className="mt-4 flex gap-3.5">
                <button
                    onClick={() => setActiveType("deposit")}
                    className={`px-4 py-[10.5px] font-bold rounded-[10px] transition-all 
                        ${activeType === "deposit" ? "bg-[#79109D]" : "bg-[#2F2F36]"}`}
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
                    <b className="text-[20px]">Выберите номинал</b>
                    <div className="flex flex-wrap gap-3">
                        {nominals.map((nominal) => (
                            <button
                                key={nominal}
                                type="button"
                                onClick={() => handleNominalClick(nominal)}
                                className={`py-[11.5px] px-6 cursor-pointer rounded-[10px] text-[14px] font-bold transition-colors 
                                        ${activeNominal === nominal
                                        ? "bg-[#A132C7]"
                                        : "bg-[#2E2E31]"
                                    }`}
                            >
                                {nominal} TMT
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemPayOption