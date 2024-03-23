import { NavLink } from "react-router-dom";

export function EmailFolderList() {
  const folders = ["inbox", "starred", "sent", "drafts", "spam"];
  return (
    <nav className="email-folder-list">
      {folders.map((folderName) => (
        <NavLink key={folderName} to={`/email/${folderName}`}>
          {folderName}
        </NavLink>
      ))}
    </nav>
  );
}
