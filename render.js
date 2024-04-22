
values = [
    [-1, 2, -1, 1],
    [1, 2, 1, 1],
    [0, 0, 0, 0]
]

mask = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

colorMap = {
    "-1": "#FFFFFF",
    "0": "#000012", 
    "1": "#FFADAD",
    "2": "#FFD6A5",
    "3": "#FDFEB6",
    "4": "#CAFFBF",
    "5": "#9BF6FF",
    "6": "#A0C4FF",
    "7": "#BDB2FF",
    "8": "#FFC6FF"
}

document.addEventListener("DOMContentLoaded", function() {
    createGrid(10, 10, values);
    updateGrid(10, 10, mask);
    
});

timerValue = 0;
function incrementTimer() {
    timer = document.getElementById("timer");
    digits = timer.children;

    timerValue++;
  
    ones = Math.floor(timerValue/1)%10;
    tens = Math.floor(timerValue/10)%10;
    hundreds = Math.floor(timerValue/100)%10;
  
    //console.log(`${timerValue}, ${ones}, ${tens}, ${hundreds}`);
  
    digits[0].style.transform = `translate(0, ${ones * -5.75}rem)`;
    digits[1].style.transform = `translate(0, ${tens * -5.75}rem)`;
    digits[2].style.transform = `translate(0, ${hundreds * -5.75}rem)`;

    setTimeout(incrementTimer, 1000);
}

function updateMines(minesValue) {
    mines = document.getElementById("mines");
    digits = mines.children;

    ones = Math.floor(minesValue/1)%10;
    tens = Math.floor(minesValue/10)%10;
  
    //console.log(`${minesValue}, ${ones}, ${tens}`);
  
    digits[0].style.transform = `translate(0, ${ones * -5.75}rem)`;
    digits[1].style.transform = `translate(0, ${tens * -5.75}rem)`;
}

function updateGrid(height, width, mask) {
    for (let i = 0; i <= height; i++) {
        for (let j = 0; j <= width; j++) {
            console.log(i, j);
            const cell = document.getElementById(i + "-" + j);
            cell.innerHTML = mask[i][j] & 1 ? values[i][j] : "";
            cell.style.color = colorMap[values[i][j]];
        }
    }
}

// Create Minesweeper Grid
function createGrid(height, width, mines) {
    // Ensure height is less than width
    if (height > width) {
        [height, width] = [width, height];
    }

    // Set grid aspect ratio
    const grid = document.getElementById("grid");
    grid.style.aspectRatio = width + "/" + height;


    // Create grid
    for (let i = 0; i < height; i++) {
        const row = document.createElement("div");
        row.className = "row";
        grid.appendChild(row);

        for (let j = 0; j < width; j++) {
            const cell = document.createElement("div");
            
            cell.className = "cell";
            cell.id = i + "-" + j;
            
            cell.addEventListener("click", click.bind(null, cell));
            
            cell.style.width = 100 / width + "%";
            cell.style.fontSize = 600 / width + "px";

            row.appendChild(cell);
        }
    }
}

firstTime = true;
function click(cell) {
    console.log(cell.id);

    if (firstTime) {
        firstTime = false;
        updateMines(10); // Initialize mines
        incrementTimer(); // Initialize timer
    }
}