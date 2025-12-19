import { useEffect, useState, type MouseEvent } from "react";

import VoucherTipModal from "../steam/VoucherTipModal";
import CisTipModal from "../steam/CisTipModal";

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

    const [voucherTip, setVoucherTip] = useState(false);
    const [cisTip, setCisTip] = useState(false);
    const [activeNominal, setActiveNominal] = useState<number>(nominals[0]);

    const handleNominalClick = (nominal: number) => {
        setActiveNominal(nominal);
    };

    // Push selected nominal to parent only when "deposit"
    useEffect(() => {
        if (activeType !== "deposit") return;
        onChangeAmount(activeNominal);
    }, [activeNominal, activeType, onChangeAmount]);

    // Close tips when switching modes
    useEffect(() => {
        if (activeType !== "voucher") setVoucherTip(false);
        if (activeType !== "deposit") setCisTip(false);
    }, [activeType]);

    // Close СНГ tip when region changes away
    useEffect(() => {
        if (region !== "СНГ") setCisTip(false);
    }, [region]);

    const openVoucherTip = (e: MouseEvent) => {
        e.stopPropagation(); // prevents clicking the parent "voucher" button
        setVoucherTip(true);
    };

    const closeVoucherTip = () => setVoucherTip(false);

    const openCisTip = (e: MouseEvent) => {
        e.stopPropagation();
        setCisTip(true);
    };

    const closeCisTip = () => setCisTip(false);

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
                    className={`px-4 py-[10.5px] flex items-center gap-2.5 font-bold rounded-[10px] transition-all 
            ${activeType === "voucher" ? "bg-[#79109D]" : "bg-[#2F2F36]"}`}
                >
                    <span>Ваучер</span>

                    <div className="relative">
                        <img
                            src="/steam/help2.png"
                            onClick={openVoucherTip}
                            className="w-5"
                            alt="help"
                        />
                    </div>
                </button>

                <VoucherTipModal click={closeVoucherTip} modal={voucherTip} />
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
                                    setCisTip(false);
                                }}
                                className="px-4 py-3.5 cursor-pointer w-full border outline-0 bg-[#1D1D22] border-[#FFFFFF1A] rounded-[10px] appearance-none"
                            >
                                <option>СНГ</option>
                                <option>Россия</option>
                            </select>

                            <img
                                src="/steam/arrow_down.png"
                                className="absolute w-5 top-[50%] right-2.5 pointer-events-none translate-x-[-50%] translate-y-[-50%]"
                                alt="arrow_down"
                            />

                            {region === "СНГ" && (
                                <div className="absolute top-[50%] left-20 translate-x-[-50%] translate-y-[-50%]">
                                    <img
                                        src="/steam/help.png"
                                        className="cursor-pointer w-5"
                                        alt="help"
                                        onClick={openCisTip}
                                    />
                                </div>
                            )}

                            <CisTipModal click={closeCisTip} modal={cisTip} />
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
