function ItemTotal() {
    return (
        <form
            className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-white"
        >
            <b className="text-[20px]">Оплата</b>

            <div className="mt-4">
                <div
                    id="bank-select"
                    className={`flex items-center justify-between px-3 py-4 rounded-[10px] bg-[#2E2E31] cursor-pointer border border-[#FFFFFF1A]`}
                >
                    <p>Выбрать банк</p>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 9L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L18 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>

            <div className="my-4">
                <div className={"flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-b border-[#FFFFFF1A]"}>
                    <p>Регион</p>
                    <p>Регион</p>
                </div>
                <div className={"flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-b border-[#FFFFFF1A]"}>
                    <p>Логин в Steam</p>
                    <p>Логин в Steam</p>
                </div>
                <div className={"flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-b border-[#FFFFFF1A]"}>
                    <p>Почта</p>
                    <p>Почта</p>
                </div>
                <div className={"flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-b border-[#FFFFFF1A]"}>
                    <p>К зачислению в Steam</p>
                    <p>К зачислению в Steam</p>
                </div>
                <div className={"flex justify-between py-4 text-[20px]"}>
                    <b>Итого</b>
                    <b>Итого TMT</b>
                </div>
            </div>

            <div className="mb-4 bg-[#2F2F36] flex items-center gap-2.5 px-4 py-3 rounded-[10px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16H12.01M12 8V12M9 4H15L20 9V15L15 20H9L4 15V9L9 4Z" stroke="#F50100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <p className="text-[14px] font-medium">
                    Товар возврату не подлежит
                </p>
            </div>

            <div className="text-center mb-4 text-[#FFFFFFCC] font-medium hidden">
                <p>К зачислению в Steam 20$</p>
            </div>

            <button
                id="confirm-checkbox"
                type="button"
                className={"mb-4 flex items-center gap-3 px-1 py-1 rounded-[10px] cursor-pointer"}
            >
                <div
                    className='min-h-6 min-w-6 rounded-sm border-2 flex items-center justify-center transition-colors bg-[#A132C7] border-[#A132C7]'>
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"block"}
                    >
                        <path
                            d="M5 13L9 17L19 7"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>

                <p className="text-[14px] font-medium leading-[19px] text-left">
                    Я подтверждаю, что правильно указал все данные
                </p>
            </button>

            <button
                type="submit"
                className="w-full py-4 rounded-[10px] bg-[#A132C7] font-bold disabled:opacity-60"
            >
                Оплатить 20 TMT
            </button>


            <div className="mt-4 text-center">
                <p className="text-[#FFFFFF99] text-[12px] font-medium leading-4.5 max-w-[278px] mx-auto">
                    Баланс Steam будет пополнен в течение 15 минут после успешной оплаты.
                </p>
            </div>
        </form>
    )
}

export default ItemTotal