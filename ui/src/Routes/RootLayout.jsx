import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import css from "./layout.module.scss";

const RootLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname == "/react-app" || location.pathname == "/react-app/") {
            navigate("/react-app/login");
        }
    }, []);

    const documentHeight = () => {
        const doc = document.documentElement;
        doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", documentHeight);
    documentHeight();

    const location = useLocation();
    const showNav = location.pathname === "/react-app/login" || location.pathname === "/react-app/signup" ? false : true;

    var title = location.pathname.split("/")[2];

    title = title ? title.charAt(0).toUpperCase() + title.slice(1) : undefined;
    document.title = title;

    return (
        <div id="top-div" className={css["flex"]}>
            <Navbar isNav={showNav} />
            <div id="prueba-container" className={css.width} style={{ width: showNav ? "calc(100% - 200px)" : "100%", overflow: "auto" }}>
                <Outlet />
            </div>
        </div>
    );
};

// , height: showNav ? '100%' : 'calc(100% - 50px)'

export default RootLayout;
