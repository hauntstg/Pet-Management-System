"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const btnSubmit = document.getElementById("submit-btn");
const nameInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const keyBreeds = "breeds";
const breedArr = JSON.parse(getFromStorage(keyBreeds, "[]"));

btnSubmit.addEventListener("click", function () {
  const data = {
    name: nameInput.value,
    type: typeInput.value,
  };
  const validate = validateData(data);
  // console.log(data);
  if (validate) {
    breedArr.push(data);
    saveToStorage(keyBreeds, JSON.stringify(breedArr));
    clearBreedInput();
    renderBreedTable(breedArr);
  }
});

const validateData = function (data) {
  if (data.name === "" || data.type === "Select Type") {
    alert("Please fill the blank!");
    return false;
  } else return true;
};

const renderBreedTable = function (breedArr) {
  tbody.innerHTML = "";

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${i + 1}</td>
    <td>${breedArr[i].name}</td>
    <td>${breedArr[i].type}</td>
    <td>
      <button type="button" class="btn btn-danger" onclick="deleteBreeds('${i}')">Delete</button>
    </td>
    `;

    tbody.appendChild(row);
  }
};
renderBreedTable(breedArr);

const deleteBreeds = (index) => {
  alert("Are you sure?");
  breedArr.splice(index, 1);
  saveToStorage(keyBreeds, JSON.stringify(breedArr));
  renderBreedTable(breedArr);
};

const clearBreedInput = () => {
  nameInput.value = "";
  typeInput.value = "Select Type";
};

sidebarTitleEl.addEventListener("click", function (e) {
  e.preventDefault();
  sidebarEl.classList.toggle("active");
});
