import { Link } from "react-router-dom";
import { SearchBar } from "./SearchBar";
import { EmailHeaderNavBar } from "./EmailHeaderNavBar";

export function EmailHeader({ setMainMenuViewState }) {
  function onMainMenuClick() {
    setMainMenuViewState((prevState) =>
      prevState === "open" ? "collapsed" : "open"
    );
  }

  return (
    <header className="email-header">
      <div className="logo flex align-center">
        <button className="main-menu-button">
          <svg focusable="false" viewBox="0 0 24 24">
            <path
              d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
              fill="#5F6368"
            ></path>
          </svg>
        </button>
        <Link to="/email">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r5.png"
            alt="Gmail Logo"
          />
        </Link>
      </div>
      <div className="flex align-center">
        <SearchBar />
        <EmailHeaderNavBar />
      </div>
    </header>
  );
}
