import { useEffect } from "react";

interface VoucherTipModalProps {
    click: () => void;
    modal: boolean;
}

function VoucherTipModal({ click, modal }: VoucherTipModalProps) {
    // optional: lock body scroll while open
    useEffect(() => {
        if (!modal) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [modal]);

    return (
        <div
            className={`
        fixed inset-0 bg-[#00000059] z-60
        transition-opacity duration-300 ease-out
        ${modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
            onClick={click} // blank space closes
        >
            <div className="relative w-full h-full">
                <div
                    className={`
            absolute bottom-0 left-0 w-full px-6 pt-6 pb-8 bg-[#2F2F36]
            rounded-tl-4xl rounded-tr-4xl
            transform transition-transform duration-300 ease-out
            ${modal ? "translate-y-0" : "translate-y-full"}
          `}
                    onClick={(e) => e.stopPropagation()} // inside doesn't close
                >
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-[20px]">Что такое ваучер?</p>
                        <img
                            src="/steam/cross.png"
                            alt="cross"
                            className="w-8 cursor-pointer"
                            onClick={click}
                        />
                    </div>

                    <p className="mt-3 text-[14px] font-medium text-white/90">
                        Ваучер — уникальная комбинация из цифр и букв. У ваучера есть денежный номинал,
                        который зачисляется на игровой кошелёк при активации.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VoucherTipModal;
