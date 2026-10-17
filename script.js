"use strict";

// All dog progress is stored in this browser, not on GitHub.
const STORAGE_KEY = "virtualDogParkPetV1";
const BREED_IMAGES = {
  "Beagle": "assets/beagle.svg",
  "Golden Retriever": "assets/golden-retriever.svg",
  "Poodle": "assets/poodle.svg"
};

const adoptionPanel = document.getElementById("adoption-panel");
const petPanel = document.getElementById("pet-panel");
const adoptionForm = document.getElementById("adoption-form");
const nameInput = document.getElementById("dog-name");
const breedSelect = document.getElementById("breed-select");
const nameError = document.getElementById("name-error");
const petMessage = document.getElementById("pet-message");
let dog = null;

// One shared rule ensures that the stage matches the day everywhere.
function stageFor(day) {
  if (day === 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

function saveDog() {
  if (dog) localStorage.setItem(STORAGE_KEY, JSON.stringify(dog));
}

function render() {
  adoptionPanel.hidden = Boolean(dog);
  petPanel.hidden = !dog;
  if (!dog) return;

  // textContent shows the name as text, never as executable HTML.
  document.getElementById("pet-name").textContent = dog.name;
  document.getElementById("pet-breed").textContent = dog.breed;
  document.getElementById("pet-day").textContent = String(dog.day);
  document.getElementById("pet-stage").textContent = stageFor(dog.day);
  document.getElementById("pet-happiness").textContent = `${dog.happiness}/100`;

  const image = document.getElementById("pet-image");
  image.src = BREED_IMAGES[dog.breed];
  image.alt = `Illustration of your adopted ${dog.breed}`;

  const happinessTrack = document.getElementById("happiness-track");
  happinessTrack.setAttribute("aria-valuenow", String(dog.happiness));
  document.getElementById("happiness-fill").style.width = `${dog.happiness}%`;

  const stage = stageFor(dog.day);
  const portrait = document.querySelector(".pet-portrait");
  portrait.classList.remove("stage-puppy", "stage-young", "stage-adult");
  const stageClass = stage === "Puppy" ? "stage-puppy" : stage === "Young Dog" ? "stage-young" : "stage-adult";
  portrait.classList.add(stageClass);
  document.getElementById("growth-fill").style.width = stage === "Puppy" ? "33.333%" : stage === "Young Dog" ? "66.666%" : "100%";
  document.getElementById("growth-caption").textContent = `${stage} · Day ${dog.day}`;
}

function adopt(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  if (!name || name.length > 20) {
    nameError.textContent = "Please enter a dog name between 1 and 20 characters.";
    nameInput.focus();
    return;
  }
  nameError.textContent = "";
  dog = { name, breed: breedSelect.value, day: 1, happiness: 50 };
  petMessage.textContent = `Welcome to the park, ${dog.name}!`;
  saveDog();
  render();
}

function increaseHappiness(action) {
  if (!dog) return;
  dog.happiness = Math.min(100, dog.happiness + 10);
  petMessage.textContent = action === "Feed" ? `${dog.name} enjoyed a tasty meal!` : `${dog.name} had fun playing!`;
  saveDog();
  render();
}

function nextDay() {
  if (!dog) return;
  dog.day += 1;
  dog.happiness = Math.max(0, dog.happiness - 5);
  petMessage.textContent = `It's Day ${dog.day}! ${dog.name} is now a ${stageFor(dog.day)}.`;
  saveDog();
  render();
}

function startOver() {
  if (!dog) return;
  // Cancel must keep both the dog and the saved data unchanged.
  if (!window.confirm("Start over? This will permanently delete your current dog's progress.")) return;
  localStorage.removeItem(STORAGE_KEY);
  dog = null;
  petMessage.textContent = "";
  nameError.textContent = "";
  adoptionForm.reset();
  render();
}

function restoreDog() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    const candidate = JSON.parse(saved);
    const valid = candidate && typeof candidate.name === "string" && candidate.name.trim().length > 0 && candidate.name.length <= 20 && Object.hasOwn(BREED_IMAGES, candidate.breed) && Number.isSafeInteger(candidate.day) && candidate.day >= 1 && Number.isInteger(candidate.happiness) && candidate.happiness >= 0 && candidate.happiness <= 100;
    if (valid) dog = candidate;
  } catch (error) {
    console.warn("Saved dog progress could not be loaded.", error);
  }
}

adoptionForm.addEventListener("submit", adopt);
document.getElementById("feed-button").addEventListener("click", () => increaseHappiness("Feed"));
document.getElementById("play-button").addEventListener("click", () => increaseHappiness("Play"));
document.getElementById("next-day-button").addEventListener("click", nextDay);
document.getElementById("start-over-button").addEventListener("click", startOver);
restoreDog();
render();
