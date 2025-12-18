import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Search from "../component/home/Search";
import ItemBanner from "../component/item/ItemBanner";
import ItemForm from "../component/item/ItemForm";
import ItemPayOption from "../component/item/ItemPayOption";
import type { TotalPayload } from "../component/item/ItemForm";
import ItemTotal from "../component/item/ItemTotal";

import Banks from "../component/steam/Banks";
import Faq from "../component/steam/Faq";
import Footer from "../component/layout/Footer";
import UpButton from "../component/UpButton"

import { useGroupItem } from "../hooks/items/useGroupItem";
import { useStickyScroll } from "../hooks/steam/useStickyScroll";
import { useItemValidation } from "../hooks/items/useItemValidation";
import { useItemAcquiringPay } from "../hooks/items/useItemAcquiringPay";

function Item() {
    const { groupName } = useParams();
    const { status, data, error } = useGroupItem(groupName ?? "");

    const [activeType, setActiveType] = useState<"deposit" | "voucher">("deposit");
    const isSticky = useStickyScroll(0.4);

    const hasDeposit = (data?.forms?.topup_fields?.length ?? 0) > 0;
    const hasVoucher = (data?.forms?.voucher_fields?.length ?? 0) > 0;

    const showDeposit = status === "success" ? hasDeposit : true;
    const showVoucher = status === "success" ? hasVoucher : true;

    const forcedType = useMemo<"deposit" | "voucher">(() => {
        if (status !== "success") return activeType;

        if (hasDeposit && !hasVoucher) return "deposit";
        if (!hasDeposit && hasVoucher) return "voucher";
        if (!hasDeposit && !hasVoucher) return "deposit";

        return activeType;
    }, [status, hasDeposit, hasVoucher, activeType]);

    useEffect(() => {
        if (forcedType !== activeType) setActiveType(forcedType);
    }, [forcedType, activeType]);

    const [totalPayload, setTotalPayload] = useState<TotalPayload>({
        lines: [],
        totalPrice: null,
    });

    const {
        selectedBank,
        isConfirmed,
        errors,
        handleSelectBank,
        handleToggleConfirm,
        handlePay: validatePay,
    } = useItemValidation(totalPayload);

    const [banksModal, setBanksModal] = useState(false);
    const toggleBanks = () => setBanksModal((prev) => !prev);

    const [formValues, setFormValues] = useState<Record<string, string>>({});

    const { createTopupPayment, createVoucherPayment, loading: acquiringLoading, error: acquiringError } = useItemAcquiringPay();

    const handlePay = () => {
        const isValid = validatePay();
        if (!isValid) return;

        if (!selectedBank) return;

        if (forcedType === "voucher") {
            createVoucherPayment({
                product_id: formValues.product_id,
                email: (formValues.email || "").trim(),
                bank: selectedBank,
            });
            return;
        }

        const topupPayload: Record<string, unknown> = {};
        Object.entries(formValues).forEach(([k, v]) => {
            topupPayload[k] = typeof v === "string" ? v.trim() : v;
        });
        topupPayload.bank = selectedBank;

        createTopupPayment(topupPayload);
    };

    return (
        <div className="h-full relative pt-[72px]">
            <div className="text-white md:w-3xl md:m-auto">
                <div className="px-4">
                    <Search />
                </div>

                <div className="flex items-center gap-2.5 mb-4 px-4 font-medium text-[#969FA8]">
                    <Link to='/' className="flex items-center gap-2.5">
                        <img src="/steam/menu.png" alt="menu" className="w-6" />
                        <span>Главная</span>
                    </Link>
                    <img src="/steam/arrow.png" alt="arrow" className="w-6" />
                    <span className="text-white">Продукт</span>
                </div>

                <div className="px-4">
                    <ItemBanner status={status} data={data} error={error} />
                </div>

                <div className="my-4 px-4">
                    <ItemPayOption
                        activeType={activeType}
                        onChange={setActiveType}
                        showDeposit={showDeposit}
                        showVoucher={showVoucher}
                        canInteract={status === "success"}
                    />
                </div>

                <div className="my-4 px-4">
                    <ItemForm
                        activeType={forcedType}
                        status={status}
                        data={data}
                        error={error}
                        onTotalChange={setTotalPayload}
                        fieldErrors={errors.fields}
                        onValuesChange={setFormValues}
                    />
                </div>

                <div className={`my-4 ${isSticky ? "sticky bottom-0" : "px-4"}`}>
                    <ItemTotal
                        isSticky={isSticky}
                        lines={totalPayload.lines}
                        totalPrice={totalPayload.totalPrice}
                        selectedBank={selectedBank}
                        onOpenBanks={toggleBanks}
                        isConfirmed={isConfirmed}
                        onToggleConfirm={handleToggleConfirm}
                        errors={{ bank: errors.bank, confirm: errors.confirm }}
                        onPay={handlePay}
                        payLoading={acquiringLoading}
                        payError={acquiringError}
                    />
                </div>

                <div className="my-4 px-4">
                    <Faq />
                </div>

                <Banks
                    click={toggleBanks}
                    modal={banksModal}
                    value={selectedBank}
                    onChange={handleSelectBank}
                />
            </div>

            <Footer />
            <UpButton />
        </div>
    );
}

export default Item;
