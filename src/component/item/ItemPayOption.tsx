import { useEffect, useState } from "react";
import VoucherTipModal from "../steam/VoucherTipModal";

type Props = {
    activeType: "deposit" | "voucher";
    onChange: (type: "deposit" | "voucher") => void;
    showDeposit: boolean;
    showVoucher: boolean;
    canInteract?: boolean;
};

function ItemPayOption({
    activeType,
    onChange,
    showDeposit,
    showVoucher,
    canInteract = true,
}: Props) {
    const visibleCount = Number(showDeposit) + Number(showVoucher);

    const [voucherTip, setVoucherTip] = useState(false);

    useEffect(() => {
        if (!canInteract) return;
        if (showDeposit && !showVoucher && activeType !== "deposit") onChange("deposit");
        if (!showDeposit && showVoucher && activeType !== "voucher") onChange("voucher");
    }, [showDeposit, showVoucher, activeType, onChange, canInteract]);

    useEffect(() => {
        if (activeType !== "voucher") setVoucherTip(false);
    }, [activeType]);

    const openVoucherTip = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!canInteract) return;
        setVoucherTip(true);
    };

    const closeVoucherTip = () => setVoucherTip(false);

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[20px]">Выберите способ пополнения</b>

            {visibleCount === 0 ? (
                <p className="text-[#FFFFFF99] text-[13px] mt-3">Нет доступных способов</p>
            ) : (
                <div className="mt-4 flex gap-2">
                    {showDeposit && (
                        <button
                            type="button"
                            disabled={!canInteract}
                            onClick={() => onChange("deposit")}
                            className={`flex items-center gap-1.5 font-bold px-4 py-[9px] rounded-[10px]
                ${activeType === "deposit" ? "bg-[#79109D]" : "bg-[#2F2F36]"}
                ${!canInteract ? "opacity-60" : ""}`}
                        >
                            <span>Пополнение</span>
                        </button>
                    )}

                    {showVoucher && (
                        <button
                            type="button"
                            disabled={!canInteract}
                            onClick={() => onChange("voucher")}
                            className={`flex items-center gap-1.5 font-bold px-4 py-[9px] rounded-[10px]
                ${activeType === "voucher" ? "bg-[#79109D]" : "bg-[#2F2F36]"}
                ${!canInteract ? "opacity-60" : ""}`}
                        >
                            <span>Ваучер</span>

                            <img
                                src="/steam/help2.png"
                                onClick={openVoucherTip}
                                className="w-5"
                                alt="help"
                            />
                        </button>
                    )}

                    <VoucherTipModal click={closeVoucherTip} modal={voucherTip} />
                </div>
            )}
        </div>
    );
}

export default ItemPayOption;
