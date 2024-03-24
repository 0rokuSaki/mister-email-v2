
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
    capitalizeString,
}

function makeId(length = 5) {
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