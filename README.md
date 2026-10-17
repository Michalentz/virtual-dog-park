# Virtual Dog Park

A beginner-friendly dog encyclopedia and virtual pet website created for AIE1101 Week 5 Lab 2 with HTML, CSS and vanilla JavaScript.

## Features

- **Dog Encyclopedia:** Beagle, Golden Retriever, and Poodle, each with a short size, personality and care description and an original local SVG illustration.
- **Adopt a dog:** Choose a breed and enter a non-empty name of up to 20 characters. Leading and trailing spaces are removed; spaces inside the name are allowed.
- **Feed and Play:** Each action increases happiness by 10, up to a maximum of 100.
- **Next Day:** Advances the day by 1 and reduces happiness by 5, never below 0.
- **Growth:** Day 1 is Puppy, Days 2–3 are Young Dog, and Day 4 onward is Adult Dog. The pet's visible growth bar and portrait size change with its stage.
- **Save and reset:** The latest pet state is saved in browser `localStorage` and restored after refreshing the page. Start Over asks for confirmation; Cancel keeps the pet, while Confirm removes the saved pet.
- **Responsive design:** Readable on laptops and phones.

A newly adopted dog starts on **Day 1, Puppy stage, and 50 happiness**. The site holds **one virtual dog at a time**.

## Preview the website

1. Open this project folder in VS Code.
2. Install the **Live Server** extension by Ritwick Dey, if needed.
3. Right-click `index.html` and select **Open with Live Server**.
4. Test refresh and storage using the **same browser and local address** each time.

No backend, framework, API, external photographs, or package manager is required. The SVG dog pictures are **project-created illustrations, not real dog photographs**.

## How the JavaScript works

- `adopt()` validates the name, creates one pet and saves it.
- `render()` displays the pet using text rather than interpreting its name as HTML.
- `increaseHappiness()` handles Feed and Play, clamping happiness to 100.
- `nextDay()` advances the day, reduces happiness by 5, and updates the stage.
- `stageFor()` chooses Puppy, Young Dog or Adult Dog based on the day.
- `saveDog()` and `restoreDog()` save and load the pet from local browser storage with key `virtualDogParkPetV1`.
- `startOver()` asks for confirmation before deleting the saved pet.

**Storage note:** Your virtual dog's data lives in the current browser on the current device. It is **not an online account**, is **not stored on GitHub**, and does not sync between computers.

## Manual browser testing checklist

Mark an item complete only after testing it in your own browser.

- [ ] The Beagle, Golden Retriever and Poodle cards show their care notes and local images.
- [ ] The page stays readable in a narrow/mobile-sized window without horizontal scrolling.
- [ ] A blank or whitespace-only name is rejected with a helpful message.
- [ ] Names are trimmed, limited to 20 characters, and names with `<` or `>` display safely as plain text.
- [ ] Adopting Buddy the Beagle displays Day 1, Puppy, happiness 50.
- [ ] Feed and Play each add 10 happiness and stop at 100.
- [ ] Next Day subtracts 5 happiness and never goes below 0.
- [ ] Day 2 and Day 3 show Young Dog; Day 4 shows Adult Dog; the growth display changes visibly.
- [ ] Refresh after adoption, Feed, Play and Next Day preserves name, breed, day and happiness.
- [ ] Start Over + Cancel keeps the current dog.
- [ ] Start Over + Confirm clears the dog; refreshing does not restore it.

These are manual test instructions, not a claim that an AI performed browser tests.
