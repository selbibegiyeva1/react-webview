interface FormProps {
    click: () => void;
    login: string;
    email: string;
    onChangeLogin: (value: string) => void;
    onChangeEmail: (value: string) => void;
    errors: {
        login: boolean;
        email: boolean;
    };
}

function Form({
    click,
    login,
    email,
    onChangeLogin,
    onChangeEmail,
    errors,
}: FormProps) {
    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl flex flex-col gap-4">
            <b className="text-[20px]">Пополнение аккаунта</b>

            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Где искать</span>
                    <svg onClick={click} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="20" rx="6" fill="#2F2F36" />
                        <path d="M10 7.66667V7.95833M10 10V12.3333M10 15.25C12.8995 15.25 15.25 12.8995 15.25 10C15.25 7.1005 12.8995 4.75 10 4.75C7.1005 4.75 4.75 7.1005 4.75 10C4.75 12.8995 7.1005 15.25 10 15.25Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <input
                    id="steam-login"
                    className={`outline-none p-4 rounded-[10px] mt-3 border bg-transparent text-white placeholder:text-[#7E848B] ${errors.login ? "border-[#F50100]" : "border-[#FFFFFF1A]"
                        }`}
                    type="text"
                    placeholder="Введите логин в Steam"
                    value={login}
                    onChange={(e) => onChangeLogin(e.target.value)}
                />
                {errors.login && (
                    <p className="mt-2 text-[12px] text-[#F50100]">Обязательное поле</p>
                )}
            </div>

            <div className="flex flex-col">
                <span className="font-medium">Почта</span>
                <input
                    id="steam-email"
                    className={`outline-none p-4 rounded-[10px] mt-3 border bg-transparent text-white placeholder:text-[#7E848B] ${errors.email ? "border-[#F50100]" : "border-[#FFFFFF1A]"
                        }`}
                    type="email"
                    placeholder="Введите свой e-mail"
                    value={email}
                    onChange={(e) => onChangeEmail(e.target.value)}
                />
                {errors.email && (
                    <p className="mt-2 text-[12px] text-[#F50100]">Обязательное поле</p>
                )}
            </div>
        </div>
    );
}

export default Form;
