"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const findBtn = document.getElementById("find-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");

const keyPets = "pets";
const petArr = JSON.parse(getFromStorage(keyPets, "[]"));
const breedArr = JSON.parse(getFromStorage("breeds", "[]"));

function renderBreedFind() {
  // Mảng tạm
  const arr = [];
  for (let i = 0; i < breedArr.length; i++) {
    // push el vào arr, khi trùng sẽ không add - trường hợp 'Mixed Breed' của cả Dog và Cat
    if (!arr.includes(breedArr[i].name)) {
      arr.push(breedArr[i].name);
      const option = document.createElement("option");
      option.innerHTML = `${breedArr[i].name}`;
      breedInput.appendChild(option);
    }
  }
}
renderBreedFind();

findBtn.addEventListener("click", function () {
  const findPets = petArr.filter(
    (findArr) =>
      // !== -1: chỉ cần một ký tự khớp => true
      findArr.id.toLowerCase().search(idInput.value.toLowerCase()) !== -1 &&
      findArr.name.toLowerCase().search(nameInput.value.toLowerCase()) !== -1 &&
      // "Select Type": option mặc định => bỏ qua
      (typeInput.value === "Select Type" ||
        findArr.type.search(typeInput.value) !== -1) &&
      (breedInput.value === "Select Breed" ||
        findArr.breed.search(breedInput.value) !== -1) &&
      // vaccinatedInput.checked === false: trường này sẽ được bỏ qua nếu không check, chỉ search khi có check
      (vaccinatedInput.checked === false ||
        findArr.vaccinated === vaccinatedInput.checked) &&
      (dewormedInput.checked === false ||
        findArr.dewormed === dewormedInput.checked) &&
      (sterilizedInput.checked === false ||
        findArr.sterilized === sterilizedInput.checked)
  );
  renderTableData(findPets);
});

// Render data
function renderTableData(petArr) {
  tbody.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <th scope="row">${petArr[i].id}</th>
                    <td>${petArr[i].name}</td>
                    <td>${petArr[i].age}</td>
                    <td>${petArr[i].type}</td>
                    <td>${petArr[i].weight} kg</td>
                    <td>${petArr[i].length} cm</td>
                    <td>${petArr[i].breed}</td>
                    <td>
                      <i class="bi bi-square-fill" style="color: ${
                        petArr[i].color
                      }"></i>
                    </td>
                    <td><i class="bi bi-${
                      petArr[i].vaccinated === true ? "check" : "x"
                    }-circle-fill"></i></td>
                    <td><i class="bi bi-${
                      petArr[i].dewormed === true ? "check" : "x"
                    }-circle-fill"></i></td>
                    <td><i class="bi bi-${
                      petArr[i].sterilized === true ? "check" : "x"
                    }-circle-fill"></i></td>
                    <td>${petArr[i].date}</td>`;
    tbody.appendChild(row);
  }
}
renderTableData(petArr);

sidebarTitleEl.addEventListener("click", function (e) {
  e.preventDefault();
  sidebarEl.classList.toggle("active");
});
