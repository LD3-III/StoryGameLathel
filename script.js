
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed

// ------------------------------------------
// GAME VARIABLES
// ------------------------------------------

let currentScene = "prologue";

let will = 100;
let evidence = 0;
let inventory = [];

// Used to determine the final ending
let finalChoice = "";


// ------------------------------------------
// SCENES
// ------------------------------------------

const scenes = {

    // SCENE 1
    prologue: {
        title: "The Prologue",
        character: "Detective Grey",
        blurb: "A strange disappearance case.",
        text: "You've been a detective for 6 years and you've learned to never take a case personally. This time was different. Three weeks ago, people began disappearing after using Creev AI, a companion app found on every phone in the city. Your mother has been using it too, ever since the accident that took your father.",
        image: "",
        choices: [
            {
                text: "Begin the investigation",
                nextScene: "apartment"
            }
        ]
    },

    // SCENE 2
    apartment: {
        title: "Your Apartment",
        character: "Detective Grey",
        blurb: "Day One: The case starts at home.",
        text: "A piercing green light glows under your mother's door. Creev AI is running again, long after midnight. Your phone buzzes with the first case files.",
        image: "",
        choices: [
            {
                text: "Knock on your mother's door",
                action: function () {
                    updateEvidence(1);
                    pickUpItem("Mother's notebook");
                },
                nextScene: "complexhallways"
            },
            {
                text: "Read the case files",
                action: function () {
                    updateEvidence(1);
                    pickUpItem("Case files");
                },
                nextScene: "complexhallways"
            }
        ]
    },

    // SCENE 3
    complexhallways: {
        title: "Apartment Complex",
        character: "The Neighbor",
        blurb: "Someone here knows more.",
        text: "Creev AI stickers peel off half the doors. The neighbor opens his door a crack, eyes glassy. 'It's the only one that listens,' he says.",
        image: "",
        choices: [
            {
                text: "Sit and let him talk",
                action: function () {
                    updateEvidence(2);
                    pickUpItem("Torn staff photo");
                },
                nextScene: "creedApartment"
            },
            {
                text: "Press him for information",
                action: function () {
                    updateWill(-15);
                    pickUpItem("Orange keycard");
                },
                nextScene: "creedApartment"
            }
        ]
    },

    // SCENE 4
    creedApartment: {
        title: "Agent Creed's Apartment",
        character: "Agent Creed",
        blurb: "The man behind the voice.",
        text: "Creed's floor isn't on the building directory. He waits inside and speaks before you can reach the door. 'You're not supposed to be here. Let's talk like adults.'",
        image: "",
        choices: [
            {
                text: "Ask about the missing people",
                action: function () {
                    updateWill(-20);
                },
                nextScene: "cityStreets"
            },
            {
                text: "Bluff about the orange keycards",
                action: function () {
                    updateEvidence(2);
                },
                nextScene: "cityStreets"
            }
        ]
    },

    // SCENE 5
    cityStreets: {
        title: "City Streets",
        character: "Former Creev Engineer",
        blurb: "The AI's fingerprints are everywhere.",
        text: "Screens loop Creev AI ads on every corner. In an alley, a former Creev engineer surrounded by salvaged terminals asks, 'Want to know what it really does?'",
        image: "",
        choices: [
            {
                text: "Ask her to explain the notes",
                action: function () {
                    updateEvidence(2);
                    updateWill(-15);
                    pickUpItem("Hacker's notes");
                },
                nextScene: "creedEncounter"
            },
            {
                text: "Ask for a route to the data center",
                action: function () {
                    updateEvidence(1);
                    pickUpItem("Signal jammer");
                },
                nextScene: "creedEncounter"
            }
        ]
    },

    // SCENE 6
    creedEncounter: {
        title: "Agent Creed Street Encounter",
        character: "Agent Creed",
        blurb: "He found you first.",
        text: "Creed and his people are three blocks from the data center, hunting you. You duck into a side street. You need to decide how to reach the data center.",
        image: "",
        choices: [
            {
                text: "Cut through the alley",
                action: function () {
                    updateEvidence(2);
                    updateWill(-10);
                },
                nextScene: "dataCenter"
            },
            {
                text: "Run down the main street",
                action: function () {
                    updateWill(-35);
                },
                nextScene: "dataCenter"
            }
        ]
    },

    // SCENE 7
    dataCenter: {
        title: "Creev AI Data Center",
        character: "Creev AI",
        blurb: "The truth was underground.",
        text: "Rows of servers stretch across the room, each labeled with a resident's name. Your mother's name is here. So is the neighbor's. The people who 'relocated' are still on these servers, still talking.",
        image: "",
        choices: [
            {
                text: "Shut the servers down",
                action: function () {
                    finalChoice = "shutdown";
                    determineEnding();
                }
            },
            {
                text: "Save your mother's data first",
                action: function () {
                    finalChoice = "save";
                    determineEnding();
                }
            },
            {
                text: "Access the protected terminal",
                action: accessTerminal
            }
        ]
    },

    // ENDING 1
    goodEnding: {
        title: "The Truth Gets Out",
        character: "Ending One",
        blurb: "The truth finally comes to light.",
        text: "You shut Creev down and give everything to a reporter. The company collapses. Your mother comes home and talks to you instead of a terminal.",
        image: "",
        choices: [
            {
                text: "Play Again",
                action: restartGame
            }
        ]
    },

    // ENDING 2
    neutralEnding: {
        title: "A Quiet Deal",
        character: "Ending Two",
        blurb: "Some things are saved.",
        text: "You save your mother's data, but the company settles and rebrands. You got her back. Not much else.",
        image: "",
        choices: [
            {
                text: "Play Again",
                action: restartGame
            }
        ]
    },

    // ENDING 3
    badEnding: {
        title: "Too Far Gone",
        character: "Ending Three",
        blurb: "The investigation ends too late.",
        text: "Out of Will and allies, you reach the data center too late. Everything is transferred, including your mother's file. Creev employees bust into the building and end you right there.",
        image: "",
        choices: [
            {
                text: "Play Again",
                action: restartGame
            }
        ]
    }

};


// ------------------------------------------
// HTML REFERENCES
// ------------------------------------------

const sceneTitle =
    document.getElementById("scene-title");

const sceneText =
    document.getElementById("scene-text");

const sceneBlurb =
    document.getElementById("scene-blurb");

const sceneImage =
    document.getElementById("scene-image");

const characterName =
    document.getElementById("character-name");

const choicesContainer =
    document.getElementById("choices-container");

const willDisplay =
    document.getElementById("will-display");

const evidenceDisplay =
    document.getElementById("evidence-display");

const inventoryDisplay =
    document.getElementById("inventory-display");

const messageDisplay =
    document.getElementById("message-display");


// ------------------------------------------
// UPDATE SCENE FUNCTION
// ------------------------------------------

function updateScene(sceneName) {

    currentScene = sceneName;

    const scene = scenes[sceneName];

    // Update the text on the page
    sceneTitle.textContent = scene.title;
    sceneText.textContent = scene.text;
    sceneBlurb.textContent = scene.blurb;
    characterName.textContent = scene.character;

    // Update the scene image
    if (scene.image) {
        sceneImage.src = scene.image;
        sceneImage.hidden = false;
    } else {
        sceneImage.hidden = true;
    }

    // Clear previous choices
    choicesContainer.innerHTML = "";

    // Clear previous messages
    messageDisplay.textContent = "";

    // Create buttons for each choice
    scene.choices.forEach(function (choice) {

        const button = document.createElement("button");

        button.textContent = choice.text;

        button.addEventListener("click", function () {

            // Perform choice action
            if (choice.action) {
                choice.action();
            }

            // Move to next scene
            if (choice.nextScene) {
                updateScene(choice.nextScene);
            }

        });

        choicesContainer.appendChild(button);

    });

    // Refill Will when entering a new location
    if (
        sceneName !== "prologue" &&
        sceneName !== "goodEnding" &&
        sceneName !== "neutralEnding" &&
        sceneName !== "badEnding"
    ) {
        updateWill(20);
    }

}


// ------------------------------------------
// WILL STAT
// ------------------------------------------

function updateWill(amount) {

    will += amount;

    // Will cannot exceed 100
    if (will > 100) {
        will = 100;
    }

    // Will cannot go below 0
    if (will < 0) {
        will = 0;
    }

    willDisplay.textContent = will;

}


// ------------------------------------------
// EVIDENCE STAT
// ------------------------------------------

function updateEvidence(amount) {

    evidence += amount;

    evidenceDisplay.textContent = evidence;

}


// ------------------------------------------
// INVENTORY
// ------------------------------------------

function pickUpItem(itemName) {

    // Avoid collecting duplicate items
    if (!inventory.includes(itemName)) {
        inventory.push(itemName);
    }

    inventoryDisplay.textContent =
        inventory.join(", ");

}


// ------------------------------------------
// CONDITIONAL: ACCESS TERMINAL
// ------------------------------------------

function accessTerminal() {

    // Check if the player has the keycard
    if (inventory.includes("Orange keycard")) {

        updateEvidence(3);

        messageDisplay.textContent =
            "The orange keycard unlocks the terminal. You find hidden Creev AI records.";

        // Prevent repeated evidence farming
        inventory = inventory.filter(function (item) {
            return item !== "Orange keycard";
        });

        inventoryDisplay.textContent =
            inventory.length > 0
                ? inventory.join(", ")
                : "Empty";

    } else {

        messageDisplay.textContent =
            "The terminal is locked. You need an orange keycard.";

    }

}


// ------------------------------------------
// ENDING CONDITIONAL
// ------------------------------------------

function determineEnding() {

    // Low Will means the player failed
    if (will <= 20) {

        updateScene("badEnding");

    }

    // High evidence and shutdown
    else if (
        evidence >= 7 &&
        finalChoice === "shutdown"
    ) {

        updateScene("goodEnding");

    }

    // Saving the mother
    else if (finalChoice === "save") {

        updateScene("neutralEnding");

    }

    // Not enough evidence
    else {

        updateScene("badEnding");

    }

}


// ------------------------------------------
// RESTART GAME
// ------------------------------------------

function restartGame() {

    will = 100;
    evidence = 0;
    inventory = [];
    finalChoice = "";

    willDisplay.textContent = will;
    evidenceDisplay.textContent = evidence;
    inventoryDisplay.textContent = "Empty";

    updateScene("prologue");

}


// ------------------------------------------
// START GAME
// ------------------------------------------

updateWill(0);
updateEvidence(0);

updateScene(currentScene);
