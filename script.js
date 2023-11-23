"use strict";

const sidebarTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const keyPets = "pets";
const petArr = JSON.parse(getFromStorage(keyPets, "[]"));
// Danh sách Breed được lưu ở storage trong file breed.js
const breedArr = JSON.parse(getFromStorage("breeds", "[]"));

// Validate dữ liệu hợp lệ
const validateData = function (data) {
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }

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
                    <td>${petArr[i].date}</td>
                    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
                      petArr[i].id
                    }')">Delete</button>
                    </td>`;
    tbody.appendChild(row);
  }
}
renderTableData(petArr);

// Xóa dữ liệu trong form
const clearInput = () => {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Nút Submit
submitBtn.addEventListener("click", function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    // bmi: "?",
    date: new Date().toLocaleDateString(),
  };
  const validate = validateData(data);
  // console.log(`validate: ${validate}`);
  if (validate) {
    petArr.push(data);
    saveToStorage(keyPets, JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
  // console.log(petArr);
  // console.log(getFromStorage(keyPets));
  // console.log(JSON.parse(keyPets));
});

// Xóa khi click vào nút Delete, onclick() gắn vào nút
const deletePet = (petId) => {
  if (confirm("Are you sure?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === petId) {
        petArr.splice(i, 1);
        saveToStorage(keyPets, JSON.stringify(petArr));
        renderTableData(petArr);
      }
    }
  }
};

// Hiển thị pet healthy
let healthyCheck = false;
let healthyPetArr = [];
const healthyBtn = document.getElementById("healthy-btn");
healthyBtn.addEventListener("click", function () {
  if (!healthyCheck) {
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
    healthyPetArr = petArr.filter(
      (checked) =>
        checked.vaccinated === true &&
        checked.dewormed === true &&
        checked.sterilized === true
    );
    renderTableData(healthyPetArr);
  } else {
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
    renderTableData(petArr);
  }
});

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  const arrDog = breedArr.filter((breed) => breed.type === "Dog");
  const arrCat = breedArr.filter((breed) => breed.type === "Cat");

  if (typeInput.value === "Dog") {
    for (let i = 0; i < arrDog.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `${arrDog[i].name}`;
      breedInput.appendChild(option);
    }
  } else if (typeInput.value === "Cat") {
    for (let i = 0; i < arrCat.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = `${arrCat[i].name}`;
      breedInput.appendChild(option);
    }
  }
}

sidebarTitleEl.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest("#sidebar");
  if (!clicked) return;
  clicked.classList.toggle("active");
});
