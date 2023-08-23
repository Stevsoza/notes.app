import { Outlet } from "react-router-dom";
import css from "./layout.module.scss";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import getUser from "../utils/getUser";

const RootLayout = () => {
    const [name, setName] = useState({ name: "" });
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname == "/react-app" || location.pathname == "/react-app/") {
            navigate("/react-app/login");
        }
        const nameFunction = async () => {
            let { username } = await getUser();
            // let { username } = user;
            if (!username) {
                navigate("/react-app/login");
            } else {
                setName(() => ({
                    name: username,
                }));
            }
        };
        nameFunction();
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
            <Navbar name={name?.name} isNav={showNav} />
            <div className={css.width} style={{ width: showNav ? "calc(100% - 200px)" : "100%" }}>
                <Outlet />
            </div>
        </div>
    );
};

// , height: showNav ? '100%' : 'calc(100% - 50px)'

export default RootLayout;
