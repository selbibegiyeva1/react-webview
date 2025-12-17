import { useMemo, useState } from "react";

export type SteamPayType = "deposit" | "voucher";

export type VoucherFieldMeta = {
    name: string;
    required?: boolean;
};

export type ErrorsState = {
    login: boolean;
    email: boolean;
    bank: boolean;
    confirm: boolean;
    fields: Record<string, boolean>; // dynamic fields (voucher)
};

const LOGIN_ID = "steam-login";
const EMAIL_ID = "steam-email";
const BANK_ID = "bank-select";
const CONFIRM_ID = "confirm-checkbox";

function focusById(id: string) {
    const el = document.getElementById(id) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLElement
        | null;
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    if ("focus" in (el as any)) (el as any)?.focus?.();
}

export function useSteamValidation() {
    const [login, setLogin] = useState("");
    const [email, setEmail] = useState("");
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [errors, setErrors] = useState<ErrorsState>({
        login: false,
        email: false,
        bank: false,
        confirm: false,
        fields: {},
    });

    const handleLoginChange = (value: string) => {
        setLogin(value);
        if (errors.login && value.trim()) {
            setErrors((prev) => ({ ...prev, login: false }));
        }
    };

    const handleEmailChange = (value: string) => {
        setEmail(value);
        if (errors.email && value.trim()) {
            setErrors((prev) => ({ ...prev, email: false }));
        }
    };

    const handleSelectBank = (bank: string) => {
        setSelectedBank(bank);
        if (errors.bank) setErrors((prev) => ({ ...prev, bank: false }));
    };

    const handleToggleConfirm = () => {
        const next = !isConfirmed;
        setIsConfirmed(next);
        if (next && errors.confirm) {
            setErrors((prev) => ({ ...prev, confirm: false }));
        }
    };

    const clearVoucherFieldError = (fieldName: string) => {
        if (!fieldName) return;
        if (!errors.fields?.[fieldName]) return;
        setErrors((prev) => ({
            ...prev,
            fields: { ...(prev.fields ?? {}), [fieldName]: false },
        }));
    };

    const scrollToFirstError = useMemo(() => {
        return (nextErrors: ErrorsState, type: SteamPayType, orderedVoucherFieldNames: string[]) => {
            if (type === "deposit") {
                if (nextErrors.login) return focusById(LOGIN_ID);
                if (nextErrors.email) return focusById(EMAIL_ID);
            }

            if (type === "voucher") {
                const firstBad = orderedVoucherFieldNames.find((n) => nextErrors.fields?.[n]);
                if (firstBad) return focusById(firstBad);
            }

            if (nextErrors.bank) return focusById(BANK_ID);
            if (nextErrors.confirm) return focusById(CONFIRM_ID);
        };
    }, []);

    const handlePay = (args?: {
        type?: SteamPayType;
        voucherFields?: VoucherFieldMeta[];
        voucherValues?: Record<string, string>;
    }): boolean => {
        const type: SteamPayType = args?.type ?? "deposit";

        const voucherFields = Array.isArray(args?.voucherFields) ? args!.voucherFields! : [];
        const voucherValues = args?.voucherValues ?? {};

        const orderedVoucherFieldNames = voucherFields
            .filter((f) => (f?.required ?? true) && typeof f?.name === "string" && f.name.trim())
            .map((f) => f.name);

        const nextFieldErrors: Record<string, boolean> = {};

        if (type === "voucher") {
            for (const name of orderedVoucherFieldNames) {
                nextFieldErrors[name] = !(voucherValues[name] ?? "").trim();
            }
        }

        const nextErrors: ErrorsState = {
            login: type === "deposit" ? !login.trim() : false,
            email: type === "deposit" ? !email.trim() : false,
            bank: !selectedBank,
            confirm: !isConfirmed,
            fields: type === "voucher" ? nextFieldErrors : {},
        };

        setErrors(nextErrors);

        const hasVoucherFieldError = type === "voucher" && Object.values(nextFieldErrors).some(Boolean);
        const hasError =
            nextErrors.login ||
            nextErrors.email ||
            nextErrors.bank ||
            nextErrors.confirm ||
            hasVoucherFieldError;

        if (hasError) {
            scrollToFirstError(nextErrors, type, orderedVoucherFieldNames);
            return false;
        }

        return true;
    };

    return {
        login,
        email,
        selectedBank,
        isConfirmed,
        errors,
        handleLoginChange,
        handleEmailChange,
        handleSelectBank,
        handleToggleConfirm,
        clearVoucherFieldError,
        handlePay,
    };
}
