interface ModalProps {
    click: () => void;
}

function Total({ click }: ModalProps) {
    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <b className="text-[20px]">Оплата</b>

            <div className="my-4">
                <div className="flex justify-between py-4 text-[14px] text-[#FFFFFFCC] border-[#FFFFFF1A] border-b">
                    <p>К зачислению в Steam</p>
                    <p>~5 $</p>
                </div>
                <div className="flex justify-between py-4 text-[20px]">
                    <b>Итого</b>
                    <b>105 TMT</b>
                </div>
            </div>

            <button onClick={click} className="bg-[#A132C7] p-[11.5px] w-full rounded-[10px] text-[14px] font-bold">Оплатить</button>
        </div>
    )
}

export default Total