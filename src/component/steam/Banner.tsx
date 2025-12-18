function Banner() {
    return (
        <div className="px-5 pt-8 pb-[60px] bg-[#1D1D22] rounded-4xl">
            <div className="gap-6 flex items-center">
                <img src="/steam/steam.png" className="max-w-[100px]" alt="img" />
                <b className="text-[20px] leading-7">Пополнение баланса Steam</b>
            </div>
            <div className="flex items-center gap-1 my-3.5 bg-[#27272D] rounded-lg p-2 w-fit">
                <img src="/steam/fire.png" className="w-5" alt="fire" />
                <b className="text-[12px]">Выгодное предложение</b>
            </div>
            <p className="text-[#FFFFFF99] text-[13px]">Аккаунты РФ и стран СНГ. Деньги поступят на аккаунт в течение 15 мин. В редких случаях — до 2 часов.</p>
        </div>
    )
}

export default Banner
