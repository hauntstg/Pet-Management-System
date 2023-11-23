"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key, defaultValue) {
  return localStorage.getItem(key) ?? defaultValue;
}
