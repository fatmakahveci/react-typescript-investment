"use client";

import Image from "next/image";
import logo from "../../../assets/investment-calculator-logo.png";

const Header: () => JSX.Element = () => {
    return (
        <header className="header">
            <Image src={logo} alt="logo" />
            <h1>Investment Calculator</h1>
        </header>
    )
}
export default Header;