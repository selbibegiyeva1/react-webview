import { useParams } from "react-router-dom";
import { useGroupItem } from "../../hooks/items/useGroupItem";

export default function ItemBanner() {
    const { groupName } = useParams();
    const { status, data, error } = useGroupItem(groupName ?? "");

    if (status === "loading" || status === "idle") {
        return (
            <div className="px-5 pt-8 pb-[60px] bg-[#1D1D22] rounded-4xl text-white">
                Loading…
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="px-5 pt-8 pb-[60px] bg-[#1D1D22] rounded-4xl text-red-400">
                {error || "Error"}
            </div>
        );
    }

    if (!data) {
        return (
            <div className="px-5 pt-8 pb-[60px] bg-[#1D1D22] rounded-4xl text-white">
                No data
            </div>
        );
    }

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl">
            <div className="gap-6 flex items-center">
                {data.icon && <img src={data.icon} className="max-w-[100px] rounded-3xl" alt="icon" />}
                <b className="text-[20px] leading-7">Пополнение баланса {data.group}</b>
            </div>

            {data.short_info && (
                <p className="text-[#FFFFFF99] text-[13px] mt-[18px]">{data.short_info}</p>
            )}
        </div>
    );
}
