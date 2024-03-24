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
    targetInputContainer.insertAdjacentHTML('beforeend', HTMLString);
}

/**
 * 
 * @param {*} e 
 * @returns NA
 * calculates total calories
 */
function calculateCalories(e) {

    //prevent default reload of page
    e.preventDefault();
    //reset global error to false
    isError = false;

    //assign vars to value of user entries
    const breakfastNumberInputs = document.querySelectorAll('#breakfast input[type=number]');
    const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
    const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
    const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
    const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');

    //assign vars to calorie amounts
    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
    const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    //end function if there is an error
    if (isError) {
        return;
    }

    //calculate values
    const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories;
    const remainingCalories = budgetCalories - consumedCalories + exerciseCalories;
    const surplusOrDeficit = remainingCalories < 0 ? 'Surplus' : 'Deficit';

    //create template literal
    output.innerHTML = `
    <span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>
    `;

    //make output visible
    output.classList.remove('hide');
}
/**
 * 
 * @param {*} list 
 * @returns 
 */
function getCaloriesFromInputs(list) {
    let calories = 0;

    //calculate total calories
    for (const item of list) {
        const currVal = cleanInputString(item.value);
        const invalidInputMatch = isInvalidInput(currVal);

        if (invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }
        calories += Number(currVal);
    }
    return calories;
}
/**
 * clears all entries
 */
function clearForm() {
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));

    for (const container of inputContainers) {
        container.innerHTML = '';
    }

    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add('hide');
}

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);

addEntryButton.addEventListener("click", addEntry);
calorieCounter.addEventListener("submit", calculateCalories);

