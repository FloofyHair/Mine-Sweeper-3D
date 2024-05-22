width = 10;
height = 10;
initialMines = 0;

var gameState = 0;
// 0 -> setup
// 1 -> running
// 2 -> win
// 3 -> loss
document.addEventListener("DOMContentLoaded", () => {
    gameSetup(width, height);
});

function toggleMenu() {
    document.getElementById("menu").classList.toggle("toggled");
}

function getIntVal(elementName) {
    return parseInt(document.getElementById(elementName).value);
}

function formSubmit() {
    gameState = 0;
    widthInp = getIntVal("widthInput");
    heightInp = getIntVal("heightInput");
    minesInp = getIntVal("minesInput");


    if (isNaN(widthInp) || isNaN(heightInp) | isNaN(minesInp)) {
        return;
    }
    if (widthInp <= 0 || heightInp <= 0 || minesInp >= widthInp * heightInp) {
        return;
    }
    if (heightInp > widthInp) {
        [heightInp, widthInp] = [widthInp, heightInp];
    }

    toggleMenu();
    width = widthInp;
    height = heightInp;
    initialMines = minesInp;
    timerValue = 0;
    incrementTimer();
    gameSetup(width, height);
}

function updateMenu() {
    if (gameState == 2 || gameState == 3) {
        toggleMenu();
    }

    if (gameState == 2) {
        document.getElementById(
            "feedback-text"
        ).innerHTML = `You won in ${timerValue} seconds!`;
    }

    if (gameState == 3) {
        document.getElementById("feedback-text").innerHTML = "You Lose!";
    }
}
