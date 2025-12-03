function Search() {
    return (
        <div className="my-4">
            <form className="flex items-center gap-2 bg-[#27272D] px-[22px] py-2 rounded-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.3891 13.3891L19 19M9.5 15C12.5376 15 15 12.5376 15 9.5C15 6.46243 12.5376 4 9.5 4C6.46243 4 4 6.46243 4 9.5C4 12.5376 6.46243 15 9.5 15Z" stroke="white" stroke-opacity="0.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input type="text" placeholder="Поиск" className="text-[16px] font-medium outline-0" />
            </form>
        </div>
    )
}

export default Search