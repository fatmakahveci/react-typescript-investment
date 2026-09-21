import Image from 'next/image';
import logo from '../../../assets/investment-calculator-logo.png';
import { text } from '@/shared/copy';
import './Header.css';

const Header = () => (
    <header className="header">
        <a className="skip-link" href="#main-content">Skip to calculator</a>
        <div className="header__brand">
            <Image src={logo} alt="" priority />
            <span>THE INVESTMENT LAB</span>
        </div>
        <div className="header__intro">
            <div><p className="header__eyebrow">{text.eyebrow}</p><h1>{text.title}</h1><p className="header__description">{text.subtitle}</p></div>
            <span className="header__badge"><i aria-hidden="true" />Your future, in focus</span>
        </div>
    </header>
);
export default Header;
