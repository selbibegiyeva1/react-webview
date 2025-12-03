function Grid2() {
    return (
        <div className="pb-20">
            <div className="flex gap-2">
                <button className="flex items-center gap-1.5 font-bold px-4 py-[9px] bg-[#79109D] rounded-[10px]">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16667 6.41665C9.16667 7.93543 7.93545 9.16665 6.41667 9.16665C4.89788 9.16665 3.66667 7.93543 3.66667 6.41665C3.66667 4.89786 4.89788 3.66665 6.41667 3.66665C7.93545 3.66665 9.16667 4.89786 9.16667 6.41665Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12.8333 12.8333H18.3333V18.3333H12.8333V12.8333Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5.04167 14.2083L2.75 15.5833L5.04167 16.9583L6.41667 19.25L7.79167 16.9583L10.0833 15.5833L7.79167 14.2083L6.41667 11.9166L5.04167 14.2083Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15.5833 3.20831L19.25 9.16665H11.9167L15.5833 3.20831Z" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Игры</span>
                </button>
                <button className="flex items-center gap-1.5 font-bold px-4 py-[9px] bg-[#2F2F36] rounded-[10px]">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.08333 18.583H10.75M13.4167 18.583H10.75M10.75 18.583V15.958M10.75 15.958H16.75C17.8546 15.958 18.75 15.0626 18.75 13.958V6.58301C18.75 5.47844 17.8546 4.58301 16.75 4.58301H4.75C3.64543 4.58301 2.75 5.47844 2.75 6.58301V13.958C2.75 15.0626 3.64543 15.958 4.75 15.958H10.75Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span>Программы</span>
                </button>
            </div>
            <center>
                <div className="flex items-center text-[24px] font-bold bg-[#27272D] w-fit gap-2.5 mt-[60px] px-[39px] py-3 rounded-lg">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 3.99988V15.9999M16 27.9999V15.9999M16 15.9999H4M16 15.9999L28 15.9999M16 15.9999L24.4853 7.5146M16 15.9999L7.51482 7.5147M16 15.9999L7.51472 24.4852M16 15.9999L24.4854 24.4853" stroke="url(#paint0_linear_99_131)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                        <defs>
                            <linearGradient id="paint0_linear_99_131" x1="16" y1="3.99988" x2="16" y2="27.9999" gradientUnits="userSpaceOnUse">
                                <stop stop-color="#B23CDA" />
                                <stop offset="1" stop-color="#79109D" />
                            </linearGradient>
                        </defs>
                    </svg>
                    Скоро
                </div>
            </center>
        </div>
    )
}

export default Grid2