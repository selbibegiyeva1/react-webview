import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Search from "../component/home/Search";
import Modal from "../component/steam/Modal";
import Banks from "../component/steam/Banks";
import UpButton from "../component/UpButton";

import Banner from "../component/steam/Banner";
import PayOption from "../component/steam/PayOption";
import Form from "../component/steam/Form";
import SteamVoucherForm, { type TotalPayload as VoucherTotalPayload } from "../component/steam/SteamVoucherForm";
import Total from "../component/steam/Total";
import Faq from "../component/steam/Faq";
import Footer from "../component/layout/Footer";

import { useStickyScroll } from "../hooks/steam/useStickyScroll";
import { useSteamValidation } from "../hooks/steam/useSteamValidation";
import { useSteamRate } from "../hooks/steam/useSteamRate";
import { useSteamPayHandler } from "../hooks/steam/payments/useSteamPayHandler";
import { useSteamVoucherFields } from "../hooks/steam/useSteamVoucherFields";

type SteamPayType = "deposit" | "voucher";

function Steam() {
    const [modal, setModal] = useState(false);
    const [banks, setBanks] = useState(false);

    const [activeType, setActiveType] = useState<SteamPayType>("deposit");
    const [amountTmt, setAmountTmt] = useState<number>(20);
    const [region, setRegion] = useState<string>("СНГ");
    const [voucherValues, setVoucherValues] = useState<Record<string, string>>({});
    const [voucherTotal, setVoucherTotal] = useState<VoucherTotalPayload>({ lines: [], totalPrice: null });

    const { usdAmount, loading: steamRateLoading } = useSteamRate(amountTmt);
    const { fields: voucherFields, loading: voucherLoading, error: voucherError } = useSteamVoucherFields(activeType === "voucher");
    const {
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
        handlePay: validatePay,
    } = useSteamValidation();

    const voucherFieldMeta = useMemo(
        () => voucherFields.map((f) => ({ name: f.name, required: f.required })),
        [voucherFields]
    );

    const { pay, loading: acquiringLoading, error: acquiringError } = useSteamPayHandler({
        activeType,
        selectedBank,
        login,
        email,
        amountTmt,
        voucherValues,
        isValid: () =>
            activeType === "voucher"
                ? validatePay({ type: "voucher", voucherFields: voucherFieldMeta, voucherValues })
                : validatePay({ type: "deposit" }),
    });

    const isSticky = useStickyScroll(0.7);
    const modalFunc = () => setModal((prev) => !prev);
    const bankFunc = () => setBanks((prev) => !prev);

    const commonTotalProps = {
        click: bankFunc,
        selectedBank,
        isConfirmed,
        onToggleConfirm: handleToggleConfirm,
        errors: { bank: errors.bank, confirm: errors.confirm },
        onPay: pay,
        isSticky,
        acquiringError,
        acquiringLoading,
    } as const;

    const modeTotalProps = activeType === "deposit" ? ({
        mode: "deposit",
        steamAmountUsd: usdAmount,
        isSteamRateLoading: steamRateLoading,
        region,
        login,
        email,
        amountTmt,
    } as const) : ({
        mode: "voucher",
        lines: voucherTotal.lines,
        totalPrice: voucherTotal.totalPrice,
    } as const);

    return (
        <div className="h-full relative pt-[72px]">
            <div className="text-white md:w-3xl md:m-auto">
                <div className="px-4">
                    <Search />
                </div>

                <div className="flex items-center gap-2.5 px-4 mb-4 font-medium text-[#969FA8]">
                    <Link to='/' className="flex items-center gap-2.5">
                        <img src="/steam/menu.png" alt="menu" className="w-6" />
                        <span>Главная</span>
                    </Link>
                    <img src="/steam/arrow.png" alt="arrow" className="w-6" />
                    <span className="text-white">Steam</span>
                </div>

                <div className="px-4">
                    <Banner />
                </div>

                <div className="my-4 px-4">
                    <PayOption
                        activeType={activeType}
                        onChangeType={setActiveType}
                        onChangeAmount={setAmountTmt}
                        region={region}
                        onChangeRegion={setRegion}
                    />
                </div>

                <div className="my-4 px-4">
                    {activeType === "deposit" ? (
                        <Form
                            click={modalFunc}
                            login={login}
                            email={email}
                            onChangeLogin={handleLoginChange}
                            onChangeEmail={handleEmailChange}
                            errors={{ login: errors.login, email: errors.email }}
                        />
                    ) : voucherLoading ? (
                        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-white">Loading…</div>
                    ) : voucherError ? (
                        <div className="px-5 py-8 bg-[#1D1D22] rounded-4xl text-red-400">{voucherError}</div>
                    ) : (
                        <SteamVoucherForm
                            fields={voucherFields}
                            fieldErrors={errors.fields}
                            onClearFieldError={clearVoucherFieldError}
                            onValuesChange={setVoucherValues}
                            onTotalChange={setVoucherTotal}
                        />
                    )}
                </div>

                <div className={`my-4 z-30 ${isSticky ? "sticky bottom-0" : "px-4"}`}>
                    <Total {...commonTotalProps} {...modeTotalProps} />
                </div>

                <div className="my-4 px-4">
                    <Faq />
                </div>

                <Modal click={modalFunc} modal={modal} />
                <Banks
                    click={bankFunc}
                    modal={banks}
                    value={selectedBank}
                    onChange={handleSelectBank}
                />
            </div>

            <Footer />
            <UpButton />
        </div>
    );
}

export default Steam;
