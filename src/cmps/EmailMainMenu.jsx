import { Link, NavLink } from "react-router-dom";

import { EmailFolderList } from "./EmailFolderList";

import { utilService } from "../services/util.service";

export function EmailMainMenu({ isCollapsed }) {
  const folders = ["inbox", "starred", "sent", "drafts", "trash"];
  const dynClass = isCollapsed ? "collapsed" : "";
  return (
    <section className={`email-main-menu flex column ${dynClass}`}>
      <button className="compose-btn flex align-center space-around m-l8 m-t8">
        <img src="https://www.gstatic.com/images/icons/material/system_gm/1x/create_black_24dp.png" alt="Pencil Image" />
        <span className="m-r8">Compose</span>
      </button>
      <nav className="flex column">
        {folders.map((folderName) => (
          <NavLink key={folderName} to={`/email/${folderName}`}>
            {utilService.capitalizeString(folderName)}
          </NavLink>
        ))}
      </nav>
    </section>
  );
}
