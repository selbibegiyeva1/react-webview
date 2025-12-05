interface ModalProps {
    click: () => void;
    modal: boolean;
}

function Modal({ click, modal }: ModalProps) {
    return (
        <div
            className={`
                fixed inset-0 bg-[#00000059] z-20
                transition-opacity duration-300 ease-out
                ${modal ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
            `}
        >
            <div className="relative w-full h-full">
                <div
                    className={`
                        absolute bottom-0 left-0 w-full px-6 pt-6 pb-8 bg-[#2F2F36]
                        rounded-tl-4xl rounded-tr-4xl
                        transform transition-transform duration-300 ease-out
                        ${modal ? "translate-y-0" : "translate-y-full"}
                    `}
                >
                    <div className="flex items-center justify-between">
                        <p className="font-medium text-[20px]">Как найти свой логин в Steam?</p>
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

                    <ul className="mt-2 mb-6 flex flex-col gap-4 text-[14px] rounded-tl-4xl rounded-tr-4xl bg-transparent list-disc pl-5 font-light max-w-[334px] marker:text-[#8016A4]">
                        <li>Откройте клиент Steam. Нажмите на имя пользователя в правом углу главной страницы</li>
                        <li>В выпадающем меню выберите пункт “Об аккаунте”</li>
                    </ul>

                    <img src="/steam/vector.png" alt="img" className="w-full" />
                </div>
            </div>
        </div>
    );
}

export default Modal;
