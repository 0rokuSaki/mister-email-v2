import { useState } from "react";
import { EmailHeader } from "../cmps/EmailHeader";

export function EmailIndex() {
  const [mainMenuViewState, setMainMenuViewState] = useState("open");

  return (
    <section className="email-index">
      <EmailHeader setMainMenuViewState={setMainMenuViewState}/>
    </section>
  );
}
