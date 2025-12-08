import { useState } from "react";

import Search from "../component/home/Search";
import Modal from "../component/steam/Modal";
import Banks from "../component/steam/Banks";

import Banner from "../component/steam/Banner";
import PayOption from "../component/steam/PayOption";
import Form from "../component/steam/Form";
import Total from "../component/steam/Total";
import Faq from "../component/steam/Faq";
import Footer from "../component/layout/Footer";

import { useStickyScroll } from "../hooks/steam/useStickyScroll";
import { useSteamValidation } from "../hooks/steam/useSteamValidation";
import { useSteamRate } from "../hooks/steam/useSteamRate";

function Steam() {
    const [steam] = useState(true);
    const [modal, setModal] = useState(false);
    const [banks, setBanks] = useState(false);

    const [amountTmt, setAmountTmt] = useState<number>(20);

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
        handlePay,
    } = useSteamValidation();

    const isSticky = useStickyScroll(0.7);

    const modalFunc = () => setModal((prev) => !prev);
    const bankFunc = () => setBanks((prev) => !prev);

    const { usdAmount, loading: steamRateLoading } = useSteamRate(amountTmt);

    return (
        <div className="h-full relative">
            <div className="text-white px-4 md:w-3xl md:m-auto">
                <Search />

                <div className="flex items-center gap-2.5 mb-4 font-medium text-[#969FA8]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_196_3268" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <path d="M24 0H0V24H24V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_196_3268)">
                            <mask id="mask1_196_3268" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask1_196_3268)">
                                <path d="M4.65386 4.65581C4.14317 5.1665 4.10531 5.67529 4.02958 6.69287C4.00994 6.95665 3.99805 7.22875 3.99805 7.50085C3.99805 7.77296 4.00994 8.04506 4.02958 8.30884C4.10531 9.32642 4.14317 9.83521 4.65386 10.3459C5.16455 10.8566 5.67334 10.8944 6.69091 10.9702C6.95469 10.9898 7.2268 11.0017 7.4989 11.0017C7.771 11.0017 8.04311 10.9898 8.30689 10.9702C9.32447 10.8944 9.83326 10.8566 10.3439 10.3459C10.8546 9.83521 10.8925 9.32642 10.9682 8.30884C10.9879 8.04506 10.9998 7.77296 10.9998 7.50085C10.9998 7.22875 10.9879 6.95665 10.9682 6.69287C10.8925 5.67529 10.8546 5.1665 10.3439 4.65581C9.83326 4.14513 9.32447 4.10726 8.30689 4.03153C8.04311 4.0119 7.771 4 7.4989 4C7.2268 4 6.95469 4.0119 6.69091 4.03153C5.67334 4.10726 5.16455 4.14513 4.65386 4.65581Z" fill="#969FA8" />
                                <path d="M13.6558 4.65581C13.1451 5.1665 13.1073 5.67529 13.0315 6.69287C13.0119 6.95665 13 7.22875 13 7.50085C13 7.77296 13.0119 8.04506 13.0315 8.30884C13.1073 9.32642 13.1451 9.83521 13.6558 10.3459C14.1665 10.8566 14.6753 10.8944 15.6929 10.9702C15.9566 10.9898 16.2288 11.0017 16.5009 11.0017C16.773 11.0017 17.0451 10.9898 17.3088 10.9702C18.3264 10.8944 18.8352 10.8566 19.3459 10.3459C19.8566 9.83521 19.8944 9.32642 19.9702 8.30884C19.9898 8.04506 20.0017 7.77296 20.0017 7.50085C20.0017 7.22875 19.9898 6.95665 19.9702 6.69287C19.8944 5.67529 19.8566 5.1665 19.3459 4.65581C18.8352 4.14513 18.3264 4.10726 17.3088 4.03153C17.0451 4.0119 16.773 4 16.5009 4C16.2288 4 15.9566 4.0119 15.6929 4.03153C14.6753 4.10726 14.1665 4.14513 13.6558 4.65581Z" fill="#969FA8" />
                                <path d="M13.0315 15.6922C13.1072 14.6749 13.1451 14.1662 13.6557 13.6557C14.1662 13.1451 14.6749 13.1072 15.6922 13.0315C15.9559 13.0119 16.228 13 16.5 13C16.772 13 17.0441 13.0119 17.3078 13.0315C18.3251 13.1072 18.8338 13.1451 19.3443 13.6557C19.8549 14.1662 19.8928 14.6749 19.9685 15.6922C19.9881 15.9559 20 16.228 20 16.5C20 16.772 19.9881 17.0441 19.9685 17.3078C19.8928 18.3251 19.8549 18.8338 19.3443 19.3443C18.8338 19.8549 18.3251 19.8928 17.3078 19.9685C17.0441 19.9881 16.772 20 16.5 20C16.228 20 15.9559 19.9881 15.6922 19.9685C14.6749 19.8928 14.1662 19.8549 13.6557 19.3443C13.1451 18.8338 13.1072 18.3251 13.0315 17.3078C13.0119 17.0441 13 16.772 13 16.5C13 16.228 13.0119 15.9559 13.0315 15.6922Z" fill="#969FA8" />
                                <path d="M4.65568 13.6557C4.1451 14.1663 4.10724 14.6749 4.03152 15.6923C4.01189 15.956 4 16.2281 4 16.5001C4 16.7722 4.01189 17.0442 4.03152 17.3079C4.10724 18.3253 4.1451 18.834 4.65568 19.3446C5.16626 19.8551 5.67494 19.893 6.6923 19.9687C6.95603 19.9883 7.22808 20.0002 7.50012 20.0002C7.77217 20.0002 8.04422 19.9883 8.30794 19.9687C9.32531 19.893 9.83399 19.8551 10.3446 19.3446C10.8551 18.834 10.893 18.3253 10.9687 17.3079C10.9884 17.0442 11.0002 16.7722 11.0002 16.5001C11.0002 16.2281 10.9884 15.956 10.9687 15.6923C10.893 14.6749 10.8551 14.1663 10.3446 13.6557C9.83399 13.1451 9.32531 13.1072 8.30794 13.0315C8.04422 13.0119 7.77217 13 7.50012 13C7.22808 13 6.95603 13.0119 6.6923 13.0315C5.67494 13.1072 5.16626 13.1451 4.65568 13.6557Z" fill="#969FA8" />
                            </g>
                        </g>
                    </svg>
                    <span>Главная</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_196_3284" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <path d="M24 0H0V24H24V0Z" fill="white" />
                        </mask>
                        <g mask="url(#mask0_196_3284)">
                            <mask id="mask1_196_3284" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                <path d="M24 0H0V24H24V0Z" fill="white" />
                            </mask>
                            <g mask="url(#mask1_196_3284)">
                                <path d="M9 5.01246C9 4.11226 10.0766 3.66144 10.7062 4.29798L13.8016 7.4273C15.9339 9.58289 17 10.6607 17 12C17 13.3393 15.9339 14.4171 13.8016 16.5727L10.7062 19.702C10.0766 20.3386 9 19.8877 9 18.9875C9 18.7196 9.1053 18.4625 9.29274 18.2731L12.3882 15.1437C13.4942 14.0255 14.1786 13.3276 14.6112 12.7544C15.0016 12.2371 15.0012 12.0565 15.001 12.0028V12V11.9973C15.0012 11.9435 15.0016 11.7629 14.6112 11.2456C14.1786 10.6724 13.4942 9.97446 12.3882 8.85627L9.29274 5.72695C9.1053 5.53745 9 5.28044 9 5.01246Z" fill="#969FA8" />
                            </g>
                        </g>
                    </svg>
                    <span className="text-white">Steam</span>
                </div>

                <Banner />

                <div className="my-4">
                    <PayOption onChangeAmount={setAmountTmt} />
                </div>

                <div className="my-4">
                    <Form
                        click={modalFunc}
                        login={login}
                        email={email}
                        onChangeLogin={handleLoginChange}
                        onChangeEmail={handleEmailChange}
                        errors={{ login: errors.login, email: errors.email }}
                    />
                </div>

                <div className={`my-4 ${isSticky ? "sticky bottom-0" : ""}`}>
                    <Total
                        click={bankFunc}
                        selectedBank={selectedBank}
                        isConfirmed={isConfirmed}
                        onToggleConfirm={handleToggleConfirm}
                        errors={{ bank: errors.bank, confirm: errors.confirm }}
                        onPay={handlePay}
                        isSticky={isSticky}
                        steamAmountUsd={usdAmount}
                        isSteamRateLoading={steamRateLoading}
                    />
                </div>

                <div className="my-4">
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

            <Footer widget={steam} />

            <a href="#">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fixed bottom-0 right-0 m-[19px]"
                >
                    <rect width="40" height="40" rx="8" fill="#5B5B66" />
                    <path d="M28 24L20 16L12 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </a>
        </div>
    );
}

export default Steam;
