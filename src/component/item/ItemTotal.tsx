import type { FormEvent } from "react";
import type { TotalLine } from "./ItemForm";

type Props = {
    isSticky: boolean;
    lines: TotalLine[];
    totalPrice: number | null;
};

function formatTmt(n: number) {
    return new Intl.NumberFormat("ru-RU").format(n);
}

function ItemTotal({ isSticky, lines, totalPrice }: Props) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const totalText = totalPrice != null ? `${formatTmt(totalPrice)} TMT` : "—";
    const payText = totalPrice != null ? `Оплатить ${formatTmt(totalPrice)} TMT` : "Оплатить";

    return (
        <form
            onSubmit={handleSubmit}
            className={
                isSticky
                    ? "px-5 pt-4 pb-8 bg-[#1D1D22] rounded-tl-4xl rounded-tr-4xl text-white"
                    : "px-5 py-8 bg-[#1D1D22] rounded-4xl text-white"
            }
        >
            <b className={isSticky ? "hidden" : "text-[20px]"}>Оплата</b>

            <div className={isSticky ? "hidden" : "mt-4"}>
                <div
                    id="bank-select"
                    className="flex items-center justify-between px-3 py-4 rounded-[10px] bg-[#2E2E31] cursor-pointer border border-[#FFFFFF1A]"
                >
                    <p>Выбрать банк</p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 9L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L18 9"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            {/* FULL (non-sticky) details */}
            <div className={isSticky ? "hidden" : "my-4"}>
                {lines.map((line) => (
                    <div
                        key={line.key}
                        className="flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-b border-[#FFFFFF1A]"
                    >
                        <p>{line.label}</p>
                        <p className="text-right max-w-[55%] truncate">{line.value || "—"}</p>
                    </div>
                ))}

                <div className="flex justify-between py-4 text-[20px]">
                    <b>Итого</b>
                    <b>{totalText}</b>
                </div>
            </div>

            <div className={isSticky ? "hidden" : "mb-4 bg-[#2F2F36] flex items-center gap-2.5 px-4 py-3 rounded-[10px]"}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M12 16H12.01M12 8V12M9 4H15L20 9V15L15 20H9L4 15V9L9 4Z"
                        stroke="#F50100"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="text-[14px] font-medium">Товар возврату не подлежит</p>
            </div>

            <button
                id="confirm-checkbox"
                type="button"
                className={isSticky ? "hidden" : "mb-4 flex items-center gap-3 px-1 py-1 rounded-[10px] cursor-pointer"}
            >
                <div
                    className={`min-h-6 min-w-6 rounded-sm border-2 flex items-center justify-center transition-colors bg-[#A132C7] border-[#A132C7]`}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5 13L9 17L19 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <p className="text-[14px] font-medium leading-[19px] text-left">
                    Я подтверждаю, что правильно указал все данные
                </p>
            </button>

            <button type="submit" className="w-full py-4 rounded-[10px] bg-[#A132C7] font-bold disabled:opacity-60">
                {payText}
            </button>

            <div className="mt-4 text-center">
                <p className="text-[#FFFFFF99] text-[12px] font-medium leading-4.5 max-w-[278px] mx-auto">
                    Баланс будет пополнен в течение 15 минут после успешной оплаты.
                </p>
            </div>
        </form>
    );
}

export default ItemTotal;
