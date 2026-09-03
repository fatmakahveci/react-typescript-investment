import Image from 'next/image';
import logo from '../../../assets/investment-calculator-logo.png';
import { Language, translations } from '@/shared/i18n';
import './Header.css';

interface Props {
    language: Language;
}

const Header = ({ language }: Props) => {
    const text = translations[language];

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
