import {createGrid} from '/NSI-Project/render.js';
import {updateGrid} from '/NSI-Project/render.js';
import {updateMines} from '/NSI-Project/render.js';
import {incrementTimer} from '/NSI-Project/render.js';

const dX = [1, 1, 0, -1, -1, -1, 0, 1];
const dY = [0, 1, 1, 1, 0, -1, -1, -1];

let numFlags = 0;
let remainingMines = 0;
let firstTime = true;
let initialMines = 0;
let numbers, mask, flags;

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateGrid(width, height) {
    let grid = new Array(height);
    for (let y = 0; y < height; y++) {
        let row = new Array(width);
        row.fill(0);
        grid[y] = row;
    }
    return grid;
}

function generateBoard(width, height, num_mines) {
    let grid = generateGrid(width, height);
    let i = 0;
    while (i < num_mines) {
        let x = randInt(0, width);
        let y = randInt(0, height);

        if (grid[y][x] === 0) {
            i++;
            grid[y][x] = 1;
        }
    }
    return grid;
}

function getGridNumbers(width, height, mine_grid) {
    let grid = new Array(height);
    for (let y = 0; y < height; y++) {
        grid[y] = new Array(width);
        for (let x = 0; x < width; x++) {
            grid[y][x] = numNeighbors(mine_grid, width, height, x, y);
        }
    }
    return grid;
}

function validCell(width, height, x, y) {
    return (x >= 0 && x < width && y >= 0 && y < height);
}

function numNeighbors(grid, width, height, x, y) {
    if (grid[y][x] === 1) {
        return -1;
    }
    let num = 0;
    for (let n = 0; n < 8; n++) {
        let dx = x + dX[n];
        let dy = y + dY[n];
        if (validCell(width, height, dx, dy)) {
            num += grid[dy][dx];
        }
    }
    return num;
}

function floodFill(width, height, x, y, numbers, old_mask) {
    let mask = generateGrid(width, height);
    let queue = [[x, y]];
    while (queue.length > 0) {
        let current = queue.shift();
        let cx = current[0];
        let cy = current[1];
        if (!validCell(width, height, cx, cy) || mask[cy][cx] === 1) {
            continue;
        }
        mask[cy][cx] = 1;
        if (numbers[cy][cx] !== 0) {
            continue;
        }
        for (let d = 0; d < 8; d++) {
            queue.push([cx + dX[d], cy + dY[d]]);
        }
    }
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            mask[y][x] = mask[y][x] | old_mask[y][x];
        }
    }
    return mask;
}

function getXY(string) {
    return string.split(";").map(Number);
}

function updateFlags(width, height, flags, mask) {
    let newFlags = generateGrid(width, height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            newFlags[y][x] = (1 - mask[y][x]) & flags[y][x];
        }
    }
    return newFlags;
}

function onFirstClick(width, height, cell, initialMines) {
    let clickPos = getXY(cell.id);
    firstTime = false;
    updateMines(initialMines);
    incrementTimer();

    let x = clickPos[0];
    let y = clickPos[1];
    let board = generateBoard(width, height, initialMines);

    let condition = (board) => numNeighbors(board, width, height, x, y) !== 0;
    if (initialMines > (width * height * 0.7)) {
        condition = (board) => board[y][x] === 1;
    }

    while (condition(board)) {
        board = generateBoard(width, height, initialMines);
    }

    numbers = getGridNumbers(width, height, board);
}

export function click(width, height, event) {
    if (event.target.className == "cell") {
        let cell = event.target;
        if (firstTime) {
            onFirstClick(width, height, cell, initialMines);
        }
        let clickPos = getXY(cell.id);
        mask = floodFill(width, height, clickPos[0], clickPos[1], numbers, mask);
        flags = updateFlags(width, height, flags, mask);
        update(width, height, mask, flags, numbers);
    }
}

function gridSum(width, height, grid) {
    let n = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            n += grid[y][x];
        }
    }
    return n;
}

function update(width, height, mask, flags, numbers) {
    numFlags = gridSum(width, height, flags);
    remainingMines = Math.max(0, initialMines - numFlags);
    updateMines(remainingMines);
    updateGrid(width, height, mask, flags, numbers);
}

export function rightClick(width, height, event) {
    if (event.target.className == "cell") {
        let cell = event.target;
        event.preventDefault();
        let clickPos = getXY(cell.id);
        let x = clickPos[0];
        let y = clickPos[1];
        flags[y][x] = (1 - mask[y][x]) & (1 - flags[y][x]);
        update(width, height, mask, flags, numbers);
    }
}

export function gameSetup(widthInp, heightInp, minesInp) {
    initialMines = minesInp;
    let board = generateGrid(widthInp, heightInp);
    numbers = generateGrid(widthInp, heightInp);
    mask = generateGrid(widthInp, heightInp);
    flags = generateGrid(widthInp, heightInp);

    createGrid(widthInp, heightInp);
    updateGrid(widthInp, heightInp, mask, flags, numbers);
    updateMines(remainingMines);
}