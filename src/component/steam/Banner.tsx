function Banner() {
    return (
        <div className="px-5 pt-8 pb-[60px] bg-[#1D1D22] rounded-4xl">
            <div className="gap-6 flex items-center">
                <img src="/steam/steam.png" className="max-w-[100px]" alt="img" />
                <b className="text-[20px] leading-7">Пополнение баланса Steam</b>
            </div>
            <div className="flex items-center gap-1 my-3.5 bg-[#27272D] rounded-lg p-2 w-fit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.7726 7.28611C14.2684 7.94044 13.6218 8.33353 12.9167 8.33353C11.3059 8.33353 10.0001 6.2815 10.0001 3.7502C10.0001 3.34314 10.0338 2.94848 10.0972 2.57275L10.0001 2.47559L5.61892 6.85672C3.19929 9.27635 3.19929 13.1994 5.61892 15.619C8.03856 18.0386 11.9616 18.0386 14.3812 15.619C16.6624 13.3378 16.7929 9.72022 14.7726 7.28611Z" stroke="url(#paint0_linear_22_347)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M8.33341 13.3335L10.0001 11.6669L11.6667 13.3335C12.5872 14.254 12.5872 15.7464 11.6667 16.6669C10.7463 17.5873 9.25389 17.5873 8.33342 16.6669C7.41294 15.7464 7.41294 14.254 8.33341 13.3335Z" stroke="url(#paint1_linear_22_347)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <defs>
                        <linearGradient id="paint0_linear_22_347" x1="10.0001" y1="2.47559" x2="10.0001" y2="17.4337" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#B53CDF" />
                            <stop offset="1" stop-color="#79109D" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_22_347" x1="10.0001" y1="2.47559" x2="10.0001" y2="17.4337" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#B53CDF" />
                            <stop offset="1" stop-color="#79109D" />
                        </linearGradient>
                    </defs>
                </svg>
                <b className="text-[12px]">Выгодное предложение</b>
            </div>
            <p className="text-[#FFFFFF99] text-[13px]">Аккаунты РФ и стран СНГ. Деньги поступят на аккаунт в течение 15 мин. В редких случаях — до 2 часов.</p>
        </div>
    )
}

export default Banner