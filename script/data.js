"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const keyPets = "pets";
const petArr = JSON.parse(getFromStorage(keyPets, "[]"));
const breedArr = JSON.parse(getFromStorage("breeds", "[]"));

function exportData() {
  const saveData = new Blob([getFromStorage(keyPets)], {
    type: "application/json",
  });
  saveAs(saveData, "Data.json");
}

const inputFile = document.querySelector("#input-file");
const btnImport = document.querySelector("#import-btn");
// Import data
btnImport.addEventListener("click", function () {
  if (inputFile.files.length === 0) {
    alert("Please select file !");
  } else {
    const file = inputFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = function (evt) {
        const dataImport = evt.target.result;
        // file rỗng thì return, nếu không thì parse sẽ bị lỗi
        if (dataImport.trim().length === 0) return;
        const dataToStorage = JSON.parse(dataImport);

        dataToStorage.forEach((el, i) => {
          if (validateData(el)) {
            const index = petArr.findIndex((pet) => pet.id === el.id);
            if (index < 0) petArr.push(el);
            else petArr[index] = el;

            // Nếu breed trong file import chưa có thì add breed đó vào Breed Storage
            let breedName = breedArr
              .filter((breed) => breed.type === el.type)
              .findIndex((breed) => breed.name === el.breed);
            if (breedName < 0) {
              breedArr.push({
                name: el.breed,
                type: el.type,
              });
            }
          }
        });
        alert("Import successful!");
        saveToStorage(keyPets, JSON.stringify(petArr));
        saveToStorage("breeds", JSON.stringify(breedArr));
      };
    }
  }
});

// Validate dữ liệu hợp lệ
const validateData = function (data) {
  if (
    data.id === "" ||
    data.name === "" ||
    isNaN(data.age) ||
    isNaN(data.weight) ||
    isNaN(data.length)
  ) {
    alert("Please fill the blank!");
    return false;
  } else if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  } else if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  } else if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  } else if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  } else if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  } else {
    return true;
  }
};

sidebarTitleEl.addEventListener("click", function (e) {
  e.preventDefault();
  sidebarEl.classList.toggle("active");
});
