interface BanksProps {
    click: () => void;
    modal: boolean;
    value: string | null;
    onChange: (bank: string) => void;
}

const BANKS = ["Rysgal", "Senagat", "Другие банки", "TDDYIB"];

function Banks({ click, modal, value, onChange }: BanksProps) {
    if (!modal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-2xl bg-[#2F2F36] px-6 pt-6 pb-8">
                <div className="flex items-center justify-between border-b border-[#FFFFFF26] pb-4">
                    <p className="font-medium text-[20px]">Выберите ваш банк</p>
                    <svg className="cursor-pointer" onClick={click} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="8" fill="#5B5B66" />
                        <path d="M10 10L22 22M22 10L10 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>

                <div className="mt-4 flex flex-col gap-5">
                    {BANKS.map((bank) => {
                        const active = value === bank;

                        const enabledBanks = ["Rysgal", "Senagat"];
                        const disabled = !enabledBanks.includes(bank);

                        return (
                            <button
                                key={bank}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                    if (!disabled) {
                                        onChange(bank);
                                        click();
                                    }
                                }}
                                className={`
        flex items-center justify-between rounded-xl text-left transition-colors
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
                            >
                                <span>{bank}</span>

                                <span
                                    className={`h-5 w-5 rounded-full border flex items-center justify-center ${active ? "border-[#9B75FF]" : "border-[#6C6C75]"
                                        }`}
                                >
                                    {active && <span className="h-3 w-3 rounded-full bg-[#9B75FF]" />}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Banks;
