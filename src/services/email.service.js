import { storageService } from "./async-storage.service.js";
import { utilService } from "./util.service.js";

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  getDefaultEmail,
  getDefaultFilter,
  getFilterFromParams,
  isEmailMatchingFilter,
  getUnreadCount,
};

const loggedInUser = {
  email: "user@appsus.com",
  fullname: "Mahatma Appsus",
};

const STORAGE_KEY = "emails";

_createEmails();

async function query(filterBy, folder) {
  let emails = await storageService.query(STORAGE_KEY);
  if (filterBy && folder) {
    emails = emails
      .filter((email) => isEmailMatchingFilter(email, folder, filterBy))
      .sort((a, b) => {
        if (filterBy.sortBy === "date") {
          return b.sentAt - a.sentAt;
        } else if (filterBy.sortBy === "subject") {
          return b.subject.toLowerCase().localeCompare(a.subject.toLowerCase());
        } else {
          return 0;
        }
      });
    if (filterBy.sortOrder === "asc") {
      emails.reverse();
    }
  }
  return emails;
}

async function getById(id) {
  return await storageService.get(STORAGE_KEY, id);
}

async function remove(id) {
  return await storageService.remove(STORAGE_KEY, id);
}

async function save(emailToSave) {
  if (emailToSave.id) {
    return await storageService.put(STORAGE_KEY, emailToSave);
  } else {
    return await storageService.post(STORAGE_KEY, emailToSave);
  }
}

function createEmail(subject, body, isRead = false, isStarred = false, sentAt = null, removedAt = null, from, to) {
  return {
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    removedAt,
    from,
    to,
  };
}

function getDefaultEmail() {
  return {
    subject: "",
    body: "",
    isRead: false,
    isStarred: false,
    sentAt: null, // Timestamp (e.g. Data.now())
    receivedAt: null, // Timestamp (e.g. Data.now())
    savedAt: null, // Timestamp (e.g. Data.now())
    removedAt: null, // Timestamp (e.g. Data.now())
    from: "",
    to: "",
  };
}

function getDefaultFilter() {
  return {
    folder: "inbox", // "inbox"/"starred"/"sent"/"drafts"/"trash"
    txt: "",
    isRead: null, // null/true/false
    sortBy: "date", // "date"/"subject"
    sortOrder: "desc", // "asc"/"desc"
  };
}

function getFilterFromParams(searchParams) {
  const defaultFilter = getDefaultFilter();
  const filterBy = {};
  for (const field in defaultFilter) {
    filterBy[field] = searchParams.get(field) || defaultFilter[field];

    // Convert parameters from string to boolean or null
    if (filterBy[field] === "true") {
      filterBy[field] = true;
    } else if (filterBy[field] === "false") {
      filterBy[field] = false;
    } else if (filterBy[field] === "null") {
      filterBy[field] = null;
    }
  }
  return filterBy;
}

function isEmailMatchingFilter(email, folder, filterBy) {
  const { txt, isRead } = filterBy;

  // Check if text matches
  if (
    !email.subject.toLowerCase().includes(txt.toLowerCase()) &&
    !email.body.toLowerCase().includes(txt.toLowerCase())
  ) {
    return false;
  }

  // Check if read status matches
  if (isRead !== null && email.isRead !== isRead) {
    return false;
  }

  // Check if folder matches
  if (folder === "inbox") {
    return !email.removedAt && email.receivedAt;
  } else if (folder === "starred") {
    return !email.removedAt && email.isStarred;
  } else if (folder === "sent") {
    return !email.removedAt && email.sentAt;
  } else if (folder === "draft") {
    return !email.removedAt && email.savedAt;
  } else {
    // folder is "trash"
    return !!email.removedAt;
  }
}

async function getUnreadCount() {
  const filterBy = getDefaultFilter();
  const emails = await query(filterBy);
  return emails.reduce((acc, email) => {
    if (!email.isRead) {
      return acc + 1;
    }
    return acc;
  }, 0);
}

function _createEmails(amount = 100) {
  let emails = utilService.loadFromStorage(STORAGE_KEY);
  if (!emails || !emails.length) {
    emails = [];
    for (let i = 0; i < amount; ++i) {
      const email = _generateRandomEmail();
      emails.push(email);
    }
    utilService.saveToStorage(STORAGE_KEY, emails);
  }
}

function _generateRandomEmail() {
  const loremIpsumSentences = [
    "Lorem ipsum dolor sit amet",
    "Consectetur adipiscing elit",
    "Sed do eiusmod tempor incididunt",
    "Ut labore et dolore magna aliqua",
    "Ut enim ad minim veniam",
    "Quis nostrud exercitation ullamco",
    "Duis aute irure dolor in reprehenderit",
    "Excepteur sint occaecat cupidatat non proident",
    "Sunt in culpa qui officia deserunt mollit anim",
    "Id est laborum et dolorum fuga",
  ];

  const loremIpsumParagraph = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `;

  const emojis = ["😀", "😎", "🌟", "💡", "📧", "💌", "📬", "📩", "📮", "✉️"];

  const now = Date.now();
  const threeYearsAgo = now - 3 * 365 * 24 * 60 * 60 * 1000; // Three years ago in milliseconds

  const isReceived = Math.random() < 0.5;
  const timestamp = threeYearsAgo + Math.random() * (now - threeYearsAgo); // Random timestamp between now and three years ago
  const id = utilService.makeId(6);
  const subject = `${loremIpsumSentences[Math.floor(Math.random() * loremIpsumSentences.length)]} ${
    Math.random() < 0.25 ? emojis[Math.floor(Math.random() * emojis.length)] : ""
  }`; // Include emoji 25% of the time
  const body = `${loremIpsumParagraph.trim().replace(/\n\s*/g, "\n")} ${
    Math.random() < 0.25 ? emojis[Math.floor(Math.random() * emojis.length)] : ""
  }`; // Include emoji 25% of the time

  const isRead = Math.random() < 0.5;
  const isStarred = Math.random() < 0.15;
  const sentAt = isReceived ? null : timestamp;
  const receivedAt = isReceived ? timestamp : null;
  const removedAtProbability = Math.random();
  const removedAt = removedAtProbability < 0.1 ? now + Math.floor(Math.random() * 10000) : null; // Set removedAt 10% of the time

  const email = {
    id,
    subject,
    body,
    isRead,
    isStarred,
    sentAt,
    receivedAt,
    savedAt: null,
    removedAt,
    from: sentAt ? loggedInUser.email : _generateRandomEmailAddress(), // Set from to loggedInUser.email if sent
    to: receivedAt ? loggedInUser.email : _generateRandomEmailAddress(), // Set to loggedInUser.email if received
  };

  return email;
}

function _generateRandomEmailAddress() {
  const usernames = [
    "YoGangsta69420",
    "Puki",
    "PokeLoke",
    "Baconator",
    "SassyPants",
    "FunkyMonkey",
    "SugarPlum",
    "NinjaTaco",
    "CrazyCatLady",
    "JellyBean",
    "BubbleWrapMaster",
    "PizzaPirate",
    "TacoSupreme",
    "CaptainCrunch",
    "CheeseburgerChamp",
    "SillyGoose",
    "SmoothieKing",
    "CookieMonster",
    "DancingQueen",
    "GigglyPuff",
  ];

  const domains = ["gmail", "yahoo", "hotmail", "outlook", "aol", "icloud", "protonmail", "mail", "yandex", "zoho"];

  const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];

  return `${randomUsername}@${randomDomain}.com`;
}
