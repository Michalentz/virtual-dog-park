"use strict";

// Round 2: adoption and care. Saving and growth are added in Round 3.
const BREED_IMAGES = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};
const adoptionPanel = document.getElementById("adoption-panel");
const petPanel = document.getElementById("pet-panel");
const adoptionForm = document.getElementById("adoption-form");
const nameInput = document.getElementById("dog-name");
const nameError = document.getElementById("name-error");
const petMessage = document.getElementById("pet-message");
let dog = null;

function render() {
  adoptionPanel.hidden = Boolean(dog);
  petPanel.hidden = !dog;
  if (!dog) return;
  document.getElementById("pet-name").textContent = dog.name;
  document.getElementById("pet-breed").textContent = dog.breed;
  document.getElementById("pet-day").textContent = String(dog.day);
  document.getElementById("pet-stage").textContent = "Puppy";
  document.getElementById("pet-happiness").textContent = `${dog.happiness}/100`;
  const image = document.getElementById("pet-image");
  image.src = BREED_IMAGES[dog.breed];
  image.alt = `Illustration of your adopted ${dog.breed}`;
  document.getElementById("happiness-track").setAttribute("aria-valuenow", String(dog.happiness));
  document.getElementById("happiness-fill").style.width = `${dog.happiness}%`;
}

adoptionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name || name.length > 20) {
    nameError.textContent = "Please enter a dog name between 1 and 20 characters.";
    nameInput.focus();
    return;
  }
  nameError.textContent = "";
  dog = { name, breed: document.getElementById("breed-select").value, day: 1, happiness: 50 };
  petMessage.textContent = `Welcome to the park, ${dog.name}!`;
  render();
});

function care(action) {
  if (!dog) return;
  dog.happiness = Math.min(100, dog.happiness + 10);
  petMessage.textContent = action === "Feed" ? `${dog.name} enjoyed a tasty meal!` : `${dog.name} had fun playing!`;
  render();
}
document.getElementById("feed-button").addEventListener("click", () => care("Feed"));
document.getElementById("play-button").addEventListener("click", () => care("Play"));
render();
