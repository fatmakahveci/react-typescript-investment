import Image from 'next/image';
import logo from '../../../assets/investment-calculator-logo.png';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Image src={logo} alt="Investment calculator logo" priority />
            <h1>Investment Calculator</h1>
        </header>
    )
}
export default Header;
