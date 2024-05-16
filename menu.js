import {gameSetup} from './game.js';

let width = 0;
let height = 0;
let initialMines = 0;

let gameRunning = false;

document.addEventListener("DOMContentLoaded", () => {
    gameSetup(width, height)
})

function getIntVal(elementName) {
    return parseInt(document.getElementById(elementName).value)
}

export function formSubmit() {
    let widthInp = getIntVal("widthInput");
    let heightInp = getIntVal("heightInput");
    let minesInp = getIntVal("minesInput");

    if (isNaN(widthInp) || isNaN(heightInp) | isNaN(minesInp)) {
        return;
    }
    if ((widthInp <= 0) || (heightInp <= 0) || (minesInp >= widthInp * heightInp)) {
        return;
    }
    document.getElementById("menu").style.display = "none";
    width = widthInp
    height = heightInp
    initialMines = minesInp
    gameSetup(width, height)
}