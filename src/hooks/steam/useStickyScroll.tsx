import { useEffect, useState } from "react";

export function useStickyScroll(thresholdRatio: number = 0.7) {
    const [isSticky, setIsSticky] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const viewportHeight =
                window.innerHeight || document.documentElement.clientHeight;

            const thresholdPx = viewportHeight * thresholdRatio;
            const shouldStick = scrollY < thresholdPx;

            setIsSticky(shouldStick);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [thresholdRatio]);

    return isSticky;
}
