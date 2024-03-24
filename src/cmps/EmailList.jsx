import { EmailPreview } from "./EmailPreview";
import { Link } from "react-router-dom";

export function EmailList({ emails = [], folderName = "" }) {
  return (
    <section className="email-list m-b16 m-r16">
      {emails.map((email) => {
        const to =
          folderName === "draft" ? `/email/${folderName}?compose=${email.id}` : `/email/${folderName}/${email.id}`;
        return (
          <Link key={email.id} to={to}>
            <EmailPreview email={email} folderName={folderName} />
          </Link>
        );
      })}
    </section>
  );
}
