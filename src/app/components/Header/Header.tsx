import Image from 'next/image';
import logo from '../../../assets/investment-calculator-logo.png';
import { Language, translations } from '@/shared/i18n';
import './Header.css';

interface Props {
    language: Language;
    onLanguageChange: (language: Language) => void;
}

const Header = ({ language, onLanguageChange }: Props) => {
    const text = translations[language];

    return (
        <header className="header">
            <Image src={logo} alt="Investment calculator logo" priority />
            <div>
                <p className="header__eyebrow">{text.eyebrow}</p>
                <h1>{text.title}</h1>
                <p className="header__description">{text.subtitle}</p>
            </div>
            <div className="language-switch" role="group" aria-label="Language / Dil">
                <button type="button" aria-pressed={language === 'en'} onClick={() => onLanguageChange('en')}>EN</button>
                <button type="button" aria-pressed={language === 'tr'} onClick={() => onLanguageChange('tr')}>TR</button>
            </div>
        </header>
    );
};
export default Header;
