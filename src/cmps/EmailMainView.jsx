import { EmailMainMenu } from "./EmailMainMenu";

export function EmailMainView({ isMainMenuCollapsed }) {
  return (
    <section className="email-main-view">
      <EmailMainMenu isCollapsed={isMainMenuCollapsed}/>
    </section>
  );
}
