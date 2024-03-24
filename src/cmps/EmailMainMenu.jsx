import { useSearchParams, Link, NavLink } from "react-router-dom";

import { EmailFolderList } from "./EmailFolderList";

import { utilService } from "../services/util.service";

export function EmailMainMenu({ isCollapsed = false }) {
  const [searchParams, setSearchParams] = useSearchParams();

  function onComposeClick() {
    setSearchParams({ compose: "new" });
  }

  console.log(searchParams);

  const folders = ["inbox", "starred", "sent", "drafts", "trash"];
  const dynClass = isCollapsed ? "collapsed" : "";
  const composeParam = searchParams.get('compose');
  return (
    <section className={`email-main-menu flex column ${dynClass}`}>
      <button className={`compose-btn flex align-center space-around m-l8 m-t8 ${dynClass}`} onClick={onComposeClick}>
        <img
          src="https://www.gstatic.com/images/icons/material/system_gm/1x/create_black_24dp.png"
          alt="Pencil Image"
        />
        {!isCollapsed && <span className="m-r8">Compose</span>}
      </button>
      <nav className="flex column m-t16">
        {folders.map((folderName) => (
          <NavLink
            key={folderName}
            to={{ pathname: `/email/${folderName}`, search: composeParam ? `?compose=${composeParam}` : ''}}
            className={`${folderName} ${dynClass} flex align-center m0`}
          >
            {!isCollapsed && <span>{utilService.capitalizeString(folderName)}</span>}
          </NavLink>
        ))}
      </nav>
    </section>
  );
}
