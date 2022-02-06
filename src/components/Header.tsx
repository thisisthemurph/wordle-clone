import "./Header.scss";
import { BarChartIcon, InfoIcon, SettingsIcon } from "../icons";

interface HeaderProps {
  toggleAbout: () => void;
  toggleStats: () => void;
}

export const Header = ({ toggleAbout, toggleStats }: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__container">
        <section>
          <button className="iconButton aboutBtn" onClick={toggleAbout}>
            <InfoIcon />
          </button>
        </section>

        <h1 className="header__title">WORDLE</h1>

        <section>
          <button className="iconButton" onClick={toggleStats}>
            <BarChartIcon />
          </button>
          <button className="iconButton">
            <SettingsIcon />
          </button>
        </section>
      </div>
    </header>
  );
};
