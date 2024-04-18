const button = document.getElementById("check-btn");

const input = document.getElementById("text-input");

const validateInput = () => {
    if (input !== null && input.value === "") {
        alert("Please input a value");
    }
}

button.addEventListener("click", validateInput);​