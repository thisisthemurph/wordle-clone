import "./Header.scss";
import { BarChartIcon, InfoIcon, SettingsIcon } from "../icons";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <section>
          <button className="iconButton aboutBtn">
            <InfoIcon />
          </button>
        </section>

        <h1 className="header__title">WORDLE</h1>

        <section>
          <button className="iconButton">
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
