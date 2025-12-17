import { useEffect, useState } from "react";
import type { TotalPayload } from "../../component/item/ItemForm";

export type ItemErrorsState = {
    fields: Record<string, boolean>; // key = field.name (region, account, email, product_id, etc)
    bank: boolean;
    confirm: boolean;
};

const BANK_ID = "bank-select";
const CONFIRM_ID = "confirm-checkbox";

function scrollToEl(id: string, focus?: boolean) {
    const el = document.getElementById(id) as
        | (HTMLInputElement | HTMLSelectElement | HTMLDivElement)
        | null;

    el?.scrollIntoView({ behavior: "smooth", block: "center" });

    if (focus && el && "focus" in el) {
        (el as HTMLInputElement | HTMLSelectElement).focus();
    }
}

export function useItemValidation(payload: TotalPayload) {
    const [selectedBank, setSelectedBank] = useState<string | null>(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const [errors, setErrors] = useState<ItemErrorsState>({
        fields: {},
        bank: false,
        confirm: false,
    });

    // Clear field errors as user fills values (based on payload from ItemForm)
    useEffect(() => {
        if (!payload?.lines?.length) return;

        setErrors((prev) => {
            let changed = false;
            const nextFields = { ...prev.fields };

            for (const line of payload.lines) {
                if (nextFields[line.key] && line.value.trim()) {
                    delete nextFields[line.key];
                    changed = true;
                }
            }

            return changed ? { ...prev, fields: nextFields } : prev;
        });
    }, [payload.lines]);

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

    const scrollToFirstError = (nextErrors: ItemErrorsState) => {
        // 1) first missing form field (in the same order ItemTotal shows)
        for (const line of payload.lines) {
            if (nextErrors.fields[line.key]) {
                // product_id uses buttons; we still give container id="product_id"
                scrollToEl(line.key, line.key !== "product_id");
                return;
            }
        }

        // 2) bank
        if (nextErrors.bank) {
            scrollToEl(BANK_ID);
            return;
        }

        // 3) confirm
        if (nextErrors.confirm) {
            scrollToEl(CONFIRM_ID);
        }
    };

    const handlePay = (): boolean => {
        const fieldErrors: Record<string, boolean> = {};

        for (const line of payload.lines) {
            fieldErrors[line.key] = !line.value.trim();
        }

        // price must exist (normally tied to product selection)
        if (payload.totalPrice == null) {
            if (payload.lines.some((l) => l.key === "product_id")) {
                fieldErrors["product_id"] = true;
            }
        }

        const nextErrors: ItemErrorsState = {
            fields: fieldErrors,
            bank: !selectedBank,
            confirm: !isConfirmed,
        };

        setErrors(nextErrors);

        const hasFieldError = Object.values(nextErrors.fields).some(Boolean);
        const hasError = hasFieldError || nextErrors.bank || nextErrors.confirm;

        if (hasError) {
            scrollToFirstError(nextErrors);
            return false;
        }

        return true;
    };

    return {
        selectedBank,
        isConfirmed,
        errors,
        handleSelectBank,
        handleToggleConfirm,
        handlePay,
        setSelectedBank,
        setIsConfirmed,
    };
}
