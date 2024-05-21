width = 10;
height = 10;
initialMines = 0;

var gameState = 0;
// 0 -> setup
// 1 -> running
// 2 -> win
// 3 -> loss
document.addEventListener("DOMContentLoaded", () => {
    gameSetup(width, height)
})

function toggleMenu() {
    document.getElementById("menu").classList.toggle("toggled");
}

function getIntVal(elementName) {
    return parseInt(document.getElementById(elementName).value)
}

function formSubmit() {
    widthInp = getIntVal("widthInput");
    heightInp = getIntVal("heightInput");
    minesInp = getIntVal("minesInput");

    if (heightInp > widthInp) {
        [heightInp, widthInp] = [widthInp, heightInp];
    }

    if (isNaN(widthInp) || isNaN(heightInp) | isNaN(minesInp)) {
        return;
    }
    if ((widthInp <= 0) || (heightInp <= 0) || (minesInp >= widthInp * heightInp)) {
        return;
    }
    toggleMenu()
    width = widthInp
    height = heightInp
    initialMines = minesInp
    gameSetup(width, height)
}

function updateMenu() {
    if (gameState == 2 || gameState == 3) {
        toggleMenu();
    }

    if (gameState == 2) {
        document.getElementById("feedback-text").innerHTML = `You won in ${timerValue} seconds!`

    }

    if (gameState == 3) {
        document.getElementById("feedback-text").innerHTML = "You Lose!"
    }
}