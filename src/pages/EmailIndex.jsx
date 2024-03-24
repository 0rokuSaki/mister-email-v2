// React
import { useState, useEffect } from "react";
import { useParams, useSearchParams, useLocation } from "react-router-dom";

// Services
import { emailService } from "../services/email.service.js";

// Components
import { EmailHeader } from "../cmps/EmailHeader";
import { EmailMainView } from "../cmps/EmailMainView";

export function EmailIndex() {
  const [emails, setEmails] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterBy, setFilterBy] = useState(emailService.getFilterFromParams(searchParams));
  const [isMainMenuCollapsed, setIsMainMenuCollapsed] = useState(false);

  const { folderName } = useParams();

  // When filter changes, set search params and re-load emails
  useEffect(() => {
    // Sanitize filter object
    let params = {};
    for (const field in filterBy) {
      if (filterBy[field] != "") {
        params[field] = filterBy[field];
      }
    }
    setSearchParams(params);
    loadEmails();
  }, [filterBy]);

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy, folderName);
      setEmails(emails);
    } catch (err) {
      console.log("Error in loadEmails", err);
    }
  }

  async function onRemoveEmail(email) {
    // Remove from DB if email is in trash
    if (email.removedAt) {
      try {
        await emailService.remove(email.id);
        setEmails((prevEmails) => {
          return prevEmails.filter((currEmail) => currEmail.id !== email.id);
        });
      } catch (err) {
        console.log("Error in onRemoveEmail", err);
      }
    } else {
      // Move to trash
      try {
        await emailService.save({ ...email, removedAt: Date.now() });
        setEmails((prevEmails) => prevEmails.filter((currEmail) => currEmail.id !== email.id));
      } catch (err) {
        console.log("Error in onMoveToTrash", err);
      }
    }
  }

  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email);
      setEmails((prevEmails) =>
        prevEmails.map((currEmail) => (currEmail.id === updatedEmail.id ? updatedEmail : currEmail))
      );
    } catch (err) {
      console.log("Error in onUpdateEmail", err);
    }
  }

  async function onAddEmail(email) {
    try {
      const savedEmail = await emailService.save(email);
      if (emailService.isEmailMatchingFilter(email, filterBy)) {
        setEmails((prevEmails) => [...prevEmails, savedEmail]);
      }
      return savedEmail;
    } catch (err) {
      console.log("Had issues adding email", err);
    }
  }

  if (!emails) return <div>Loading Emails...</div>;

  console.log(emails);

  return (
    <section className="email-index">
      <EmailHeader setIsMainMenuCollapsed={setIsMainMenuCollapsed} />
      <EmailMainView isMainMenuCollapsed={isMainMenuCollapsed} emails={emails} folderName={folderName} />
    </section>
  );
}
