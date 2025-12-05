import { useState } from "react";

interface ModalProps {
    click: () => void;
}

function Total({ click }: ModalProps) {
    const [isConfirmed, setIsConfirmed] = useState(false);

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[20px]">Оплата</b>

            {/* Hide this one */}
            <div onClick={click} className="mt-4 flex items-center justify-between bg-[#2E2E31] px-3 py-4 rounded-[10px]">
                <p>Выбрать банк</p>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>

            <div className="my-4">

                {/* Hide this one */}
                <div className="flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-[#FFFFFF1A] border-b">
                    <p>Регион</p>
                    <p>СНГ</p>
                </div>

                {/* Hide this one */}
                <div className="flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-[#FFFFFF1A] border-b">
                    <p>Логин в Steam</p>
                    <p>ВТФкиллер</p>
                </div>

                {/* Hide this one */}
                <div className="flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-[#FFFFFF1A] border-b">
                    <p>Почта</p>
                    <p>ВТФкиллер@gmail.com</p>
                </div>

                <div className="flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-[#FFFFFF1A] border-b">
                    <p>К зачислению в Steam</p>
                    <p>~5 $</p>
                </div>
                <div className="flex justify-between py-4 text-[20px]">
                    <b>Итого</b>
                    <b>105 TMT</b>
                </div>
            </div>

            <div className="mb-4 bg-[#2F2F36] flex items-center gap-2.5 px-4 py-3 rounded-[10px]">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 16H12.01M12 8V12M9 4H15L20 9V15L15 20H9L4 15V9L9 4Z"
                        stroke="#F50100"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <p className="text-[14px] font-medium">
                    Товар возврату не подлежит
                </p>
            </div>

            {/* Hide this one */}
            <div
                onClick={() => setIsConfirmed((prev) => !prev)}
                className="mb-4 flex items-center gap-3 px-1 py-1 rounded-[10px] cursor-pointer"
            >
                <div
                    className={`
                        min-h-6 min-w-6 rounded-sm border-2
                        transition-colors
                        ${isConfirmed ? "bg-[#A132C7] border-[#A132C7]" : "bg-transparent border-[#A132C7]"}
                    `}
                />

                <p className="text-[14px] font-medium text-white leading-[19px]">
                    Я подтверждаю, что правильно указал все данные
                </p>
            </div>

            <button
                className="bg-[#A132C7] p-[14.5px] w-full rounded-[10px] text-[14px] font-bold"
            >
                Оплатить
            </button>

            <center>
                <p className="text-[#FFFFFF99] mt-4 text-[12px] font-medium leading-4.5 max-w-[278px]">
                    Баланс Steam будет пополнен в течение 15 минут после успешной
                    оплаты.
                </p>
            </center>
        </div>
    );
}

export default Total;
