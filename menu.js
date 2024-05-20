import {gameSetup} from '/game.js';

document.addEventListener("DOMContentLoaded", () => {
    // Removed gameSetup call here since it needs parameters
});

function getIntVal(elementName) {
    return parseInt(document.getElementById(elementName).value);
}

export function formSubmit() {
    let widthInp = getIntVal("widthInput");
    let heightInp = getIntVal("heightInput");
    let minesInp = getIntVal("minesInput");

    if (isNaN(widthInp) || isNaN(heightInp) || isNaN(minesInp)) {
        return;
    }
    if ((widthInp <= 0) || (heightInp <= 0) || (minesInp >= widthInp * heightInp)) {
        return;
    }
    document.getElementById("menu").style.display = "none";
    gameSetup(widthInp, heightInp, minesInp);
}
