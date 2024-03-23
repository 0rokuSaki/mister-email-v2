import { useState } from "react";
import { Link } from "react-router-dom";
import { EmailFolderList } from "./EmailFolderList";

export function EmailAside() {
  const [viewState, setViewState] = useState("open");

  function onMainMenuClick() {
    setViewState(prevViewState => prevViewState === 'open' ? 'collapsed' : 'open');
  }

  return (
    <section className="email-main-menu">
      <header className="flex align-center">
        <button onClick={onMainMenuClick}>Main Menu</button>
        <Link to="/email">
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r4.png"
            alt=""
          />
        </Link>
      </header>
      <main className={`${viewState}`}>
        <button className="compose-button">Compose</button>
        <EmailFolderList />
      </main>
    </section>
  );
}
