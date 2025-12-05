import { useState } from "react";

interface ModalProps {
    click: () => void;
    modal: boolean;
}

const BANKS = ["Rysgal", "Другие банки", "Senagat", "TDDYIB"];

function Banks({ click, modal }: ModalProps) {
    const [selected, setSelected] = useState<string>("Rysgal");

    return (
        <div
            className={`
                fixed inset-0 bg-[#00000059] z-20
                transition-opacity duration-300 ease-out
                flex items-center justify-center w-full p-4
                ${modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div className="px-6 pt-6 pb-8 bg-[#2F2F36] rounded-2xl w-full max-w-md">
                <div className="flex items-center justify-between border-b border-[#FFFFFF26] pb-4">
                    <p className="font-medium text-[20px]">Выберите ваш банк</p>

                    <svg
                        onClick={click}
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="cursor-pointer"
                    >
                        <rect width="32" height="32" rx="8" fill="#5B5B66" />
                        <path
                            d="M10 10L22 22M22 10L10 22"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <div className="flex flex-col gap-5 mt-4">
                    {BANKS.map((bank) => {
                        const active = selected === bank;
                        const disabled = bank !== "Rysgal";

                        return (
                            <div
                                key={bank}
                                // Only Rysgal can be clicked
                                onClick={() => !disabled && setSelected(bank)}
                                className={`
                                    flex items-center justify-between
                                    rounded-xl cursor-pointer
                                    transition-colors

                                    ${disabled
                                        ? "opacity-40 cursor-not-allowed"
                                        : "hover:bg-[#3A3A43]"
                                    }
                                `}
                            >
                                <span className="text-[16px]">{bank}</span>

                                <div
                                    className={`
                                        h-5 w-5 rounded-full border
                                        flex items-center justify-center
                                        ${active ? "border-[#9B75FF]" : "border-[#6C6C75]"}
                                    `}
                                >
                                    {active && (
                                        <div className="h-3 w-3 rounded-full bg-[#9B75FF]" />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Banks;
