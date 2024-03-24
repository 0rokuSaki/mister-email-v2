import { utilService } from "../services/util.service";
//import { eventBusService } from "../services/event-bus.service";

const eventBusService = {
  emit: (x = "", y = "", z = "") => {},
};

export function EmailPreview({ email = {}, folderName = "" }) {
  function onButtonClick(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    switch (ev.target.className) {
      case "delete-btn":
        eventBusService.emit("onRemoveEmail", email);
        break;
      case "star-toggle-btn":
        eventBusService.emit("onUpdateEmail", {
          ...email,
          isStarred: !email.isStarred,
        });
        break;
      case "read-status-toggle-btn":
        eventBusService.emit("onUpdateEmail", {
          ...email,
          isRead: !email.isRead,
        });
        break;
    }
  }

  // Image URLs
  const starBtnImgUrl = email.isStarred
    ? "https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_fill_googyellow500_20dp.png"
    : "https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/star_baseline_nv700_20dp.png";
  const markBtnImgUrl = email.isRead
    ? "https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/mark_email_unread_baseline_nv700_20dp.png"
    : "https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/drafts_baseline_nv700_20dp.png";
  const trashBtnImgUrl = "https://ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png";

  const dynClass = email.isRead || folderName === "draft" ? "" : "unread";
  const timestamp = folderName === "draft" ? email.savedAt : email.sentAt || email.receivedAt;
  return (
    <article className={`email-preview ${dynClass}`}>
      <input type="checkbox" name="" id="" />
      {!email.removedAt && (
        <button className="star-toggle-btn" onClick={onButtonClick}>
          <img src={starBtnImgUrl} alt="Star" />
        </button>
      )}
      <span className="from-wrapper">{utilService.capitalizeString(email.from.split("@")[0])}</span>
      <span className="subject-wrapper">{email.subject}</span>
      <span className="date-wrapper">{utilService.formatTimestamp(timestamp)}</span>
      <span className="action-buttons-wrapper">
        <button className="delete-btn" onClick={onButtonClick}>
          <img src={trashBtnImgUrl} alt="Trash" />
        </button>
        {folderName !== "draft" && (
          <button className="read-status-toggle-btn" onClick={onButtonClick}>
            <img src={markBtnImgUrl} alt="Mark" />
          </button>
        )}
      </span>
    </article>
  );
}
