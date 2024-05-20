import {click} from "/game.js";
import {rightClick} from "/game.js";

let width = 0;
let height = 0;

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", (cell) => {
        click(width, height, cell)
    });
    document.body.addEventListener("contextmenu", (cell) => {
        rightClick(width, height, cell)
    });
});


let timerValue = 0;

export function incrementTimer() {
    let timer = document.getElementById("timer-digits");
    timerValue++;

    timer.innerHTML = String(timerValue).padStart(3, '0');

    setTimeout(incrementTimer, 1000);
}


export function updateMines(minesValue) {
    let mines = document.getElementById("mines");
    let digits = mines.children;

    let ones = Math.floor(minesValue / 1) % 10;
    let tens = Math.floor(minesValue / 10) % 10;

    //console.log(`${minesValue}, ${ones}, ${tens}`);

    digits[0].style.transform = `translate(0, ${ones * -5.9}rem)`;
    digits[1].style.transform = `translate(0, ${tens * -5.9}rem)`;
}


export function updateGrid(width, height, mask, flags, values) {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const cell = document.getElementById(x + ";" + y);
            let tileType = mask[y][x] & 1 ? values[y][x] : "U";
            tileType = flags[y][x] & 1 ? "F" : tileType;
            cell.style.backgroundImage = `url(Sprites/${tileType}.png)`;
            // cell.innerHTML = cell.tileType
            // cell.style.color = colorMap[cell.innerHTML];
        }
    }
}


export function createGrid(width, height) {
    // Ensure height is less than width
    if (height > width) {
        [height, width] = [width, height];
    }

    // Set grid aspect ratio
    const grid = document.getElementById("grid");
    grid.style.aspectRatio = width + "/" + height;


    // Create grid
    for (let y = 0; y < height; y++) {
        const row = document.createElement("div");
        row.className = "row";
        grid.appendChild(row);

        for (let x = 0; x < width; x++) {
            const cell = document.createElement("div");

            cell.className = "cell";
            cell.id = x + ";" + y;

            cell.style.width = 100 / height + "%";
            cell.style.fontSize = 500 / height + "px";

            row.appendChild(cell);
        }
    }
}