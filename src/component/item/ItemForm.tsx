import { useEffect, useMemo, useState } from "react";
import type { GroupItemResponse } from "../../hooks/items/useGroupItem";

type Status = "idle" | "loading" | "success" | "error";

type Props = {
    activeType: "deposit" | "voucher";
    status: Status;
    data: GroupItemResponse | null;
    error: string | null;
};

type GroupItemOption = {
    value: string | number;
    name?: string;
    product?: string;
    name_prefix?: string;
    price?: number;
    [k: string]: unknown;
};

type GroupItemField = {
    name: string;
    type: string;
    label: string;
    options?: GroupItemOption[] | null;
    [k: string]: unknown;
};

type FormValues = Record<string, string>;

function getTextInputType(fieldName: string) {
    const n = fieldName.toLowerCase();
    if (n.includes("email")) return "email";
    return "text";
}

function getProductTitle(o: GroupItemOption) {
    return (
        (typeof o.product === "string" && o.product.trim() && o.product) ||
        (typeof o.name_prefix === "string" && o.name_prefix.trim() && o.name_prefix) ||
        (typeof o.name === "string" && o.name.trim() && o.name) ||
        String(o.value ?? "")
    );
}

function getOptionLabel(option: GroupItemOption) {
    if (typeof option?.name === "string" && option.name.trim()) return option.name;

    const base =
        (typeof option?.product === "string" && option.product.trim() && option.product) ||
        (typeof option?.name_prefix === "string" && option.name_prefix.trim() && option.name_prefix) ||
        String(option?.value ?? "");

    return typeof option?.price === "number" ? `${base} — ${option.price}` : base;
}

function ItemForm({ activeType, status, data, error }: Props) {
    const [values, setValues] = useState<FormValues>({});

    useEffect(() => {
        setValues({});
    }, [activeType]);

    const fields = useMemo<GroupItemField[]>(() => {
        const forms = (data?.forms ?? {}) as any;
        const arr = activeType === "voucher" ? forms?.voucher_fields : forms?.topup_fields;
        return Array.isArray(arr) ? (arr as GroupItemField[]) : [];
    }, [data, activeType]);

    const title = activeType === "voucher" ? "Ваучер" : "Пополнение аккаунта";

    const productField = useMemo(() => {
        return fields.find((f) => f?.name === "product_id" && f?.type === "options");
    }, [fields]);

    const productLabel = productField?.label ?? "Товары";
    const productOptions = (Array.isArray(productField?.options) ? productField?.options : []) as GroupItemOption[];
    const activeProductId = values["product_id"] ?? "";

    useEffect(() => {
        if (!productOptions.length) return;

        const current = values["product_id"];
        const isValid =
            typeof current === "string" && productOptions.some((o) => String(o.value) === current);

        if (!isValid) {
            setValues((prev) => ({ ...prev, product_id: String(productOptions[0].value) }));
        }
    }, [productOptions]);

    if (status === "loading" || status === "idle") {
        return <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-white">Loading…</div>;
    }

    if (status === "error") {
        return (
            <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-red-400">
                {error || "Error"}
            </div>
        );
    }

    if (!data) {
        return <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-white">No data</div>;
    }

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl flex flex-col gap-4">
            <b className="text-[20px]">{title}</b>

            {fields.length === 0 ? (
                <p className="text-[#FFFFFF99] text-[13px]">Нет полей для этого типа</p>
            ) : (
                fields
                    .filter((f) => !(f.name === "product_id" && f.type === "options"))
                    .map((field) => {
                        const currentValue = values[field.name] ?? "";

                        if (field.type === "options") {
                            const options = Array.isArray(field.options) ? (field.options as GroupItemOption[]) : [];

                            return (
                                <div key={field.name} className="flex flex-col">
                                    <span className="font-medium">{field.label}</span>

                                    <div className="mt-3 relative">
                                        <select
                                            id={field.name}
                                            value={currentValue}
                                            onChange={(e) =>
                                                setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                                            }
                                            className={`outline-none p-4 w-full appearance-none rounded-[10px] border bg-transparent border-[#FFFFFF1A]
                        ${currentValue ? "text-white" : "text-[#7E848B]"}`}
                                        >
                                            <option value="" disabled>
                                                Выберите
                                            </option>
                                            {options.map((option, idx) => (
                                                <option
                                                    key={`${field.name}-${String(option?.value ?? idx)}-${idx}`}
                                                    value={String(option?.value ?? "")}
                                                >
                                                    {getOptionLabel(option)}
                                                </option>
                                            ))}
                                        </select>

                                        <svg
                                            className="absolute top-[50%] right-0 translate-x-[-50%] translate-y-[-50%]"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M6 9L11.2929 14.2929C11.6834 14.6834 12.3166 14.6834 12.7071 14.2929L18 9"
                                                stroke="white"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={field.name} className="flex flex-col">
                                <span className="font-medium">{field.label}</span>
                                <input
                                    id={field.name}
                                    className="outline-none p-4 rounded-[10px] mt-3 border bg-transparent text-white placeholder:text-[#7E848B] border-[#FFFFFF1A]"
                                    type={getTextInputType(field.name)}
                                    placeholder={`Введите ${field.label}`}
                                    value={currentValue}
                                    onChange={(e) =>
                                        setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                                    }
                                />
                            </div>
                        );
                    })

            )}

            {productOptions.length > 0 && (
                <div className="flex flex-col gap-4">
                    <span className="font-medium">{productLabel}</span>

                    <div className="flex flex-wrap gap-3">
                        {productOptions.map((p, idx) => {
                            const id = String(p?.value ?? "");
                            const isActive = id !== "" && id === activeProductId;

                            return (
                                <button
                                    key={`${id}-${idx}`}
                                    type="button"
                                    onClick={() => setValues((prev) => ({ ...prev, product_id: id }))}
                                    className={`py-[11.5px] px-6 cursor-pointer rounded-[10px] text-[14px] font-bold transition-colors
                    ${isActive ? "bg-[#A132C7]" : "bg-[#2E2E31]"}`}
                                >
                                    <div className="flex flex-col items-start text-left">
                                        <span className="leading-5">{getProductTitle(p)}</span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ItemForm;
