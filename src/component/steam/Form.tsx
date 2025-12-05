function Form() {
    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl flex flex-col gap-4">
            <b className="text-[20px]">Пополнение аккаунта</b>
            <div className="flex flex-col">
                <span className="font-medium">Где искать</span>
                <input className="p-4 rounded-[10px] mt-3 border border-[#FFFFFF1A]" type="text" placeholder="Введите логин в Steam" />
            </div>
            <div className="flex flex-col">
                <span className="font-medium">Почта</span>
                <input className="p-4 rounded-[10px] mt-3 border border-[#FFFFFF1A]" type="email" placeholder="Введите свой e-mail" />
            </div>
        </div>
    )
}

export default Form