
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    capitalizeString,
    formatTimestamp,
}

function makeId(length = 10) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function saveToStorage(key, value) {
    localStorage[key] = JSON.stringify(value);
}

function loadFromStorage(key, defaultValue = null) {
    var value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

function capitalizeString(str) {
  // Check if the input string is empty
  if (!str) return '';

  // Convert the first character to uppercase and the rest to lowercase
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();

  // Check if the timestamp is from today
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    // Return just the hour and minute
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${hour}:${minute}`;
  } else if (date.getFullYear() === now.getFullYear()) { // Check if the timestamp is from this year
    // Return month name (short) and day
    const day = date.getDate();
    return `${date.toLocaleString("default", { month: "short" })} ${day}`;
  } else {
    // Return "dd/mm/yyyy"
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
