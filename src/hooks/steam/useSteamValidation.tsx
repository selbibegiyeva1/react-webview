import { useState } from "react";

export type ErrorsState = {
    login: boolean;
    email: boolean;
    bank: boolean;
    confirm: boolean;
};

const LOGIN_ID = "steam-login";
const EMAIL_ID = "steam-email";
const BANK_ID = "bank-select";
const CONFIRM_ID = "confirm-checkbox";

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
        setErrors((prev) => ({ ...prev, bank: false }));
    };

    const handleToggleConfirm = () => {
        const next = !isConfirmed;
        setIsConfirmed(next);
        if (next) {
            setErrors((prev) => ({ ...prev, confirm: false }));
        }
    };

    const scrollToFirstError = (nextErrors: ErrorsState) => {
        if (nextErrors.login) {
            const el = document.getElementById(LOGIN_ID) as
                | HTMLInputElement
                | null;
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            el?.focus();
            return;
        }

        if (nextErrors.email) {
            const el = document.getElementById(EMAIL_ID) as
                | HTMLInputElement
                | null;
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            el?.focus();
            return;
        }

        if (nextErrors.bank) {
            const el = document.getElementById(BANK_ID);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        if (nextErrors.confirm) {
            const el = document.getElementById(CONFIRM_ID);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handlePay = (): boolean => {
        const nextErrors: ErrorsState = {
            login: !login.trim(),
            email: !email.trim(),
            bank: !selectedBank,
            confirm: !isConfirmed,
        };

        setErrors(nextErrors);

        const hasError = Object.values(nextErrors).some(Boolean);
        if (hasError) {
            scrollToFirstError(nextErrors);
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
        handlePay,
    };
}
