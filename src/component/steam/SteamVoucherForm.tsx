import { useEffect, useMemo, useState } from "react";

export type VoucherOption = {
    value: string | number;
    name?: string;
    product?: string;
    name_prefix?: string;
    price?: number;
    region?: string;
    [k: string]: unknown;
};

export type VoucherField = {
    name: string;
    type: string;
    label: string;
    required?: boolean;
    options?: VoucherOption[] | null;
    [k: string]: unknown;
};

export type TotalLine = {
    key: string;
    label: string;
    value: string;
};

export type TotalPayload = {
    lines: TotalLine[];
    totalPrice: number | null;
};

type FormValues = Record<string, string>;

type Props = {
    fields: VoucherField[];
    fieldErrors?: Record<string, boolean>;
    onValuesChange?: (values: FormValues) => void;
    onTotalChange?: (payload: TotalPayload) => void;
    onClearFieldError?: (fieldName: string) => void;
};

function getTextInputType(fieldName: string) {
    const n = (fieldName || "").toLowerCase();
    if (n.includes("email")) return "email";
    if (n.includes("phone")) return "tel";
    return "text";
}

function getOptionDisplay(option?: VoucherOption | null) {
    if (!option) return "";
    return (
        (typeof option.name === "string" && option.name.trim() && option.name) ||
        (typeof option.product === "string" && option.product.trim() && option.product) ||
        (typeof option.name_prefix === "string" && option.name_prefix.trim() && option.name_prefix) ||
        String(option.value ?? "")
    );
}

function getProductTitle(o: VoucherOption) {
    return (
        (typeof o.product === "string" && o.product.trim() && o.product) ||
        (typeof o.name_prefix === "string" && o.name_prefix.trim() && o.name_prefix) ||
        (typeof o.name === "string" && o.name.trim() && o.name) ||
        String(o.value ?? "")
    );
}

function SteamVoucherForm({ fields, fieldErrors, onValuesChange, onTotalChange, onClearFieldError }: Props) {
    const [values, setValues] = useState<FormValues>({});

    useEffect(() => {
        setValues({});
    }, [fields]);

    useEffect(() => {
        onValuesChange?.(values);
    }, [values, onValuesChange]);

    const regionField = useMemo(() => {
        return fields.find((f) => f?.name === "region" && f?.type === "options");
    }, [fields]);

    const regionOptions = useMemo(() => {
        const opts = regionField?.options;
        return Array.isArray(opts) ? (opts as VoucherOption[]) : [];
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

    const productLabel = productField?.label ?? "Ваучеры";

    const allProductOptions = useMemo(() => {
        const opts = productField?.options;
        return Array.isArray(opts) ? (opts as VoucherOption[]) : [];
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
                    label: f.label || "Ваучер",
                    value: selectedProduct ? getProductTitle(selectedProduct) : "",
                };
            }

            if (f.type === "options") {
                if (f.name === "region") {
                    return { key: f.name, label: f.label || f.name, value: selectedRegionName };
                }

                const raw = values[f.name] ?? "";
                const opts = Array.isArray(f.options) ? (f.options as VoucherOption[]) : [];
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

    const setFieldValue = (name: string, next: string) => {
        setValues((prev) => ({ ...prev, [name]: next }));
        onClearFieldError?.(name);
    };

    return (
        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl flex flex-col gap-4">
            <b className="text-[20px]">Ваучер</b>

            {fields.length === 0 ? (
                <p className="text-[#FFFFFF99] text-[13px]">Нет полей для ваучера</p>
            ) : (
                fields.map((field) => {
                    const currentValue = values[field.name] ?? "";
                    const showError = !!fieldErrors?.[field.name];

                    if (field.name === "product_id" && field.type === "options") {
                        return (
                            <div key={field.name} id={field.name} className="flex flex-col gap-4">
                                <span className="font-medium">{productLabel}</span>

                                {hasProductRegions && regionField && !selectedRegionValue ? (
                                    <p className="text-[#FFFFFF99] text-[13px]">Выберите регион, чтобы увидеть ваучеры</p>
                                ) : filteredProductOptions.length === 0 ? (
                                    <p className="text-[#FFFFFF99] text-[13px]">Нет ваучеров для выбранного региона</p>
                                ) : (
                                    <div
                                        className={`flex flex-wrap gap-3 rounded-[10px] ${showError ? "border border-[#F50100] p-2" : ""}`}
                                    >
                                        {filteredProductOptions.map((p, idx) => {
                                            const id = String(p?.value ?? "");
                                            const isActive = id !== "" && id === activeProductId;

                                            return (
                                                <button
                                                    key={`${id}-${idx}`}
                                                    type="button"
                                                    onClick={() => setFieldValue("product_id", id)}
                                                    className={`py-[11.5px] px-6 cursor-pointer rounded-[10px] text-[14px] font-bold transition-colors ${isActive ? "bg-[#A132C7]" : "bg-[#2E2E31]"
                                                        }`}
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

                    if (field.type === "options") {
                        const options = Array.isArray(field.options) ? (field.options as VoucherOption[]) : [];

                        return (
                            <div key={field.name} className="flex flex-col">
                                <span className="font-medium">{field.label}</span>

                                <div className="mt-4 relative">
                                    <select
                                        id={field.name}
                                        value={currentValue}
                                        onChange={(e) => setFieldValue(field.name, e.target.value)}
                                        className={`outline-none p-4 w-full appearance-none rounded-[10px] border text-white bg-[#1D1D22] ${showError ? "border-[#F50100]" : "border-[#FFFFFF1A]"}`}
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
                                    <img
                                        src="/steam/arrow_down.png"
                                        alt="arrow_down"
                                        className="absolute w-5 top-[50%] right-0 translate-x-[-50%] translate-y-[-50%]"
                                    />
                                </div>

                                {showError && <p className="mt-2 text-[12px] text-[#F50100]">Обязательное поле</p>}
                            </div>
                        );
                    }

                    return (
                        <div key={field.name} className="flex flex-col">
                            <span className="font-medium">{field.label}</span>
                            <input
                                id={field.name}
                                className={`outline-none p-4 rounded-[10px] mt-4 border bg-transparent text-white placeholder:text-[#7E848B] ${showError ? "border-[#F50100]" : "border-[#FFFFFF1A]"}`}
                                type={getTextInputType(field.name)}
                                placeholder={`Введите ${field.label}`}
                                value={currentValue}
                                onChange={(e) => setFieldValue(field.name, e.target.value)}
                            />
                            {showError && <p className="mt-2 text-[12px] text-[#F50100]">Обязательное поле</p>}
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default SteamVoucherForm;
