import { useState } from "react";
import { EmailHeader } from "../cmps/EmailHeader";
import { EmailMainView } from "../cmps/EmailMainView";

export function EmailIndex() {
  const [isMainMenuCollapsed, setIsMainMenuCollapsed] = useState(false);

  return (
    <section className="email-index">
      <EmailHeader setIsMainMenuCollapsed={setIsMainMenuCollapsed}/>
      <EmailMainView isMainMenuCollapsed={isMainMenuCollapsed}/>
    </section>
  );
}
