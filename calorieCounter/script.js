//assigns const calorieCounter to form with id calorie-counter from html
const calorieCounter = document.getElementById('calorie-counter');
const budgetNumberInput = document.getElementById('budget');
const entryDropdown = document.getElementById('entry-dropdown');
const addEntryButton = document.getElementById('add-entry');
const clearButton = document.getElementById('clear');
const output = document.getElementById('output');

let isError = false; //boolean have 'is' or 'has'

/**
 * Takes in input string and returns without regex
 * @param {*} str 
 * @returns string without regex space, +, -
 */
function cleanInputString(str) {
    const regex = /[+-\s]/g; //const set to a set of values (in //)
    //g flag  searches whole string
    //[] for char class
    return str.replace(regex, '');
}

/**
 * Takes in input string and returns valid chars (numbers 0-9)
 * @param {*} str 
 * @returns array of values that match regex
 */
function isInvalidInput(str) {
    const regex = /\d+e\d+/i; //i for ignore case 
    //d for numbers 0-9
    //+ for match one or more
    return str.match(regex);
}

/**
 * Add calories with selected meal type
 */
function addEntry() {
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input
      type="number"
      min="0"
      id="${entryDropdown.value}-${entryNumber}-calories"
      placeholder="Calories"
    />`;
    targetInputContainer.innerHTML += HTMLString;
}

