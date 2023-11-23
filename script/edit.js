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
const breedArr = JSON.parse(getFromStorage("breeds", "[]"));
const editForm = document.getElementById("container-form");

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
                    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
                      petArr[i].id
                    }')">Edit</button>
                    </td>`;
    tbody.appendChild(row);
  }
}
renderTableData(petArr);

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

// Edit form
const startEditPet = (petId) => {
  editForm.classList.remove("hide");
  // const currentPet = petArr.find((pet) => pet.id === petId);
  const currentPet = petArr.filter((pet) => pet.id === petId)[0];

  idInput.value = currentPet.id;
  nameInput.value = currentPet.name;
  ageInput.value = currentPet.age;
  typeInput.value = currentPet.type;
  // renderBreed phải được gọi sau typeInput và trước breedInput vì breedInput select dựa vào typeInput
  renderBreed();

  weightInput.value = currentPet.weight;
  lengthInput.value = currentPet.length;
  colorInput.value = currentPet.color;
  breedInput.value = currentPet.breed;
  vaccinatedInput.checked = currentPet.vaccinated;
  dewormedInput.checked = currentPet.dewormed;
  sterilizedInput.checked = currentPet.sterilized;
};

// Validate dữ liệu hợp lệ
const validateData = function (data) {
  // id đã bị disable không thể thay đổi nên không cần check id unique
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
  if (validate) {
    petArr.forEach((pet) => {
      if (pet.id === idInput.value) {
        pet.name = nameInput.value;
        pet.age = ageInput.value;
        pet.type = typeInput.value;
        pet.weight = weightInput.value;
        pet.length = lengthInput.value;
        pet.color = colorInput.value;
        pet.breed = breedInput.value;
        pet.vaccinated = vaccinatedInput.checked;
        pet.dewormed = dewormedInput.checked;
        pet.sterilized = sterilizedInput.checked;
      }
    });
    saveToStorage(keyPets, JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
    editForm.classList.add("hide");
  }
});

sidebarTitleEl.addEventListener("click", function (e) {
  e.preventDefault();
  sidebarEl.classList.toggle("active");
});
