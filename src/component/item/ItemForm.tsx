import { useEffect, useMemo, useState } from "react";
import type { GroupItemResponse } from "../../hooks/items/useGroupItem";

type Status = "idle" | "loading" | "success" | "error";

export type TotalLine = {
    key: string;
    label: string;
    value: string;
};

export type TotalPayload = {
    lines: TotalLine[];
    totalPrice: number | null;
};

type Props = {
    activeType: "deposit" | "voucher";
    status: Status;
    data: GroupItemResponse | null;
    error: string | null;
    onTotalChange?: (payload: TotalPayload) => void;
    fieldErrors?: Record<string, boolean>;

    onValuesChange?: (values: Record<string, string>) => void;
};

type GroupItemOption = {
    value: string | number;
    name?: string;
    product?: string;
    name_prefix?: string;
    price?: number;
    region?: string;
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

function getOptionDisplay(option?: GroupItemOption | null) {
    if (!option) return "";
    return (
        (typeof option.name === "string" && option.name.trim() && option.name) ||
        (typeof option.product === "string" && option.product.trim() && option.product) ||
        (typeof option.name_prefix === "string" && option.name_prefix.trim() && option.name_prefix) ||
        String(option.value ?? "")
    );
}

function ItemForm({ activeType, status, data, error, onTotalChange, fieldErrors, onValuesChange }: Props) {
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

    const regionField = useMemo(() => {
        return fields.find((f) => f?.name === "region" && f?.type === "options");
    }, [fields]);

    const regionOptions = useMemo(() => {
        const opts = regionField?.options;
        return Array.isArray(opts) ? (opts as GroupItemOption[]) : [];
    }, [regionField]);

    const selectedRegionValue = values["region"] ?? "";

    const selectedRegionName = useMemo(() => {
        if (!selectedRegionValue) return "";
        const match = regionOptions.find((o) => String(o.value) === String(selectedRegionValue));
        return (match?.name ?? "").trim() || String(selectedRegionValue);
    }, [selectedRegionValue, regionOptions]);

    const productField = useMemo(() => {
        return fields.find((f) => f?.name === "product_id" && f?.type === "options");
    }, [fields]);

    const productLabel = productField?.label ?? "Товары";

    const allProductOptions = useMemo(() => {
        const opts = productField?.options;
        return Array.isArray(opts) ? (opts as GroupItemOption[]) : [];
    }, [productField]);

    const hasProductRegions = useMemo(() => {
        return allProductOptions.some((p) => typeof p.region === "string" && p.region.trim());
    }, [allProductOptions]);

    const filteredProductOptions = useMemo(() => {
        if (!allProductOptions.length) return [];
        if (!hasProductRegions || !regionField) return allProductOptions;
        if (!selectedRegionValue) return [];
        return allProductOptions.filter((p) => {
            const pr = String(p.region ?? "").trim();
            if (!pr) return false;
            return pr === selectedRegionName || pr === String(selectedRegionValue);
        });
    }, [allProductOptions, hasProductRegions, regionField, selectedRegionValue, selectedRegionName]);

    const activeProductId = values["product_id"] ?? "";

    useEffect(() => {
        if (!productField) return;

        if (hasProductRegions && regionField && !selectedRegionValue) {
            if (values["product_id"]) setValues((prev) => ({ ...prev, product_id: "" }));
            return;
        }

        if (filteredProductOptions.length === 0) {
            if (values["product_id"]) setValues((prev) => ({ ...prev, product_id: "" }));
            return;
        }

        const current = values["product_id"];
        const isValid =
            typeof current === "string" &&
            filteredProductOptions.some((o) => String(o.value) === String(current));

        if (!isValid) {
            setValues((prev) => ({ ...prev, product_id: String(filteredProductOptions[0].value) }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredProductOptions, selectedRegionValue, productField]);

    const selectedProduct = useMemo(() => {
        if (!activeProductId) return null;
        return filteredProductOptions.find((p) => String(p.value) === String(activeProductId)) ?? null;
    }, [filteredProductOptions, activeProductId]);

    const totalPrice = useMemo(() => {
        if (selectedProduct && typeof selectedProduct.price === "number") return selectedProduct.price;
        return null;
    }, [selectedProduct]);

    const totalLines = useMemo<TotalLine[]>(() => {
        if (!fields.length) return [];

        return fields.map((f) => {
            if (f.name === "product_id" && f.type === "options") {
                return {
                    key: "product_id",
                    label: "К зачислению",
                    value: selectedProduct ? getProductTitle(selectedProduct) : "",
                };
            }

            if (f.type === "options") {
                if (f.name === "region") {
                    return { key: f.name, label: f.label || f.name, value: selectedRegionName };
                }

                const raw = values[f.name] ?? "";
                const opts = Array.isArray(f.options) ? (f.options as GroupItemOption[]) : [];
                const selected = opts.find((o) => String(o.value) === String(raw)) ?? null;

                return {
                    key: f.name,
                    label: f.label || f.name,
                    value: getOptionDisplay(selected) || raw,
                };
            }

            return {
                key: f.name,
                label: f.label || f.name,
                value: values[f.name] ?? "",
            };
        });
    }, [fields, values, selectedRegionName, selectedProduct]);

    useEffect(() => {
        onTotalChange?.({
            lines: totalLines,
            totalPrice,
        });
    }, [onTotalChange, totalLines, totalPrice]);

    useEffect(() => {
        onValuesChange?.(values);
    }, [values, onValuesChange]);

    if (status === "loading" || status === "idle") {
        return <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-white">Loading…</div>;
    }

    if (status === "error") {
        return (
            <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-red-400">{error || "Error"}</div>
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
                fields.map((field) => {
                    const currentValue = values[field.name] ?? "";
                    const showError = !!fieldErrors?.[field.name];

                    // product_id as purple buttons
                    if (field.name === "product_id" && field.type === "options") {
                        return (
                            <div key={field.name} id={field.name} className="flex flex-col gap-4">
                                <span className="font-medium">{productLabel}</span>

                                {hasProductRegions && regionField && !selectedRegionValue ? (
                                    <p className="text-[#FFFFFF99] text-[13px]">Выберите регион, чтобы увидеть товары</p>
                                ) : filteredProductOptions.length === 0 ? (
                                    <p className="text-[#FFFFFF99] text-[13px]">Нет товаров для выбранного региона</p>
                                ) : (
                                    <div
                                        className={`flex flex-wrap gap-3 rounded-[10px] ${showError ? "border border-[#F50100] p-2" : ""
                                            }`}
                                    >
                                        {filteredProductOptions.map((p, idx) => {
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
                                )}

                                {showError && <p className="text-[12px] text-[#F50100]">Обязательное поле</p>}
                            </div>
                        );
                    }

                    // options -> select
                    if (field.type === "options") {
                        const options = Array.isArray(field.options) ? (field.options as GroupItemOption[]) : [];

                        return (
                            <div key={field.name} className="flex flex-col">
                                <span className="font-medium">{field.label}</span>

                                <div className="mt-4 relative">
                                    <select
                                        id={field.name}
                                        value={currentValue}
                                        onChange={(e) =>
                                            setValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                                        }
                                        className={`outline-none p-4 w-full appearance-none rounded-[10px] border text-white bg-[#1D1D22]
                      ${showError ? "border-[#F50100]" : "border-[#FFFFFF1A]"}`}
                                    >
                                        <option value="" disabled>
                                            Выберите
                                        </option>
                                        {options.map((option, idx) => (
                                            <option
                                                key={`${field.name}-${String(option?.value ?? idx)}-${idx}`}
                                                value={String(option?.value ?? "")}
                                            >
                                                {getOptionDisplay(option)}
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

                                {showError && <p className="mt-2 text-[12px] text-[#F50100]">Обязательное поле</p>}
                            </div>
                        );
                    }

                    // text -> input
                    return (
                        <div key={field.name} className="flex flex-col">
                            <span className="font-medium">{field.label}</span>
                            <input
                                id={field.name}
                                className={`outline-none p-4 rounded-[10px] mt-4 border bg-transparent text-white placeholder:text-[#7E848B]
                  ${showError ? "border-[#F50100]" : "border-[#FFFFFF1A]"}`}
                                type={getTextInputType(field.name)}
                                placeholder={`Введите ${field.label}`}
                                value={currentValue}
                                onChange={(e) => setValues((prev) => ({ ...prev, [field.name]: e.target.value }))}
                            />
                            {showError && <p className="mt-2 text-[12px] text-[#F50100]">Обязательное поле</p>}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default ItemForm;
