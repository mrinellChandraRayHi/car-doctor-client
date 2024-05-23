import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer";
import Navbar from "../Shared/Navbar";

const Layout = () => {
    return (
        <div>
            <div><Navbar/></div>
            <div><Outlet/></div>
            <div><Footer/></div>
        </div>
    );
};

export default Layout;