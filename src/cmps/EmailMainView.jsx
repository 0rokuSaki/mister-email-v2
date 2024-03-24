import { EmailList } from "./EmailList";
import { EmailMainMenu } from "./EmailMainMenu";

export function EmailMainView({ isMainMenuCollapsed = false, emails = [], folderName = "" }) {
  return (
    <section className="email-main-view">
      <EmailMainMenu isCollapsed={isMainMenuCollapsed} />
      <EmailList emails={emails} />
    </section>
  );
}
