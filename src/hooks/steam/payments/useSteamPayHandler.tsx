import { useCallback } from "react";
import { useSteamAcquiringPay } from "./useSteamAcquiringPay";

type SteamPayType = "deposit" | "voucher";

type Params = {
    activeType: SteamPayType;
    selectedBank: string | null;
    login: string;
    email: string;
    amountTmt: number;
    voucherValues: Record<string, string>;
    isValid: () => boolean;
};

export function useSteamPayHandler({
    activeType,
    selectedBank,
    login,
    email,
    amountTmt,
    voucherValues,
    isValid,
}: Params) {
    const { createTopupPayment, createVoucherPayment, loading, error } =
        useSteamAcquiringPay();

    const pay = useCallback(() => {
        if (!isValid()) return;
        if (!selectedBank) return;

        if (activeType === "voucher") {
            const payload: Record<string, unknown> = { bank: selectedBank };
            for (const [k, v] of Object.entries(voucherValues)) payload[k] = v.trim();
            createVoucherPayment(payload);
            return;
        }

        createTopupPayment({
            steam_username: login.trim(),
            amount_tmt: amountTmt,
            email: email.trim(),
            bank: selectedBank,
        });
    }, [
        activeType,
        selectedBank,
        login,
        email,
        amountTmt,
        voucherValues,
        isValid,
        createTopupPayment,
        createVoucherPayment,
    ]);

    return { pay, loading, error };
}
