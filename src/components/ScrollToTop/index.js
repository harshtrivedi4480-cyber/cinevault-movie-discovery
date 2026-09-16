import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls the window to the top whenever the route changes,
// so navigating pages / pagination always starts from the top.
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
};

export default ScrollToTop;
