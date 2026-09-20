import Image from 'next/image';
import logo from '../../../assets/investment-calculator-logo.png';
import { text } from '@/shared/copy';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <Image src={logo} alt="Investment calculator logo" priority />
            <div>
                <p className="header__eyebrow">{text.eyebrow}</p>
                <h1>{text.title}</h1>
                <p className="header__description">{text.subtitle}</p>
            </div>
        </header>
    );
};
export default Header;
