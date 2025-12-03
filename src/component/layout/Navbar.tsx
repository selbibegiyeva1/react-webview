function Navbar() {
    return (
        <div className="navbar">
            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="img" className="w-[63px]" />
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 5L11 11M11 5L5 11" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <select className="outline-none text-white bg-[#22222899] text-[15px] font-medium">
                <option value="RU">RU</option>
                <option value="TKM">TKM</option>
            </select>
        </div>
    )
}

export default Navbar