colorMap = {
    "-1": "#FFFFFF",
    // "0": "#000012",
    "0": "#FFFFFF",
    "1": "#FFADAD",
    "2": "#FFD6A5",
    "3": "#FDFEB6",
    "4": "#CAFFBF",
    "5": "#9BF6FF",
    "6": "#A0C4FF",
    "7": "#BDB2FF",
    "8": "#FFC6FF"
}


timerValue = 0;
function incrementTimer() {
    timer = document.getElementById("timer-digits");
    timerValue++;
    let paddedTimer = String(timerValue).padStart(3, '0');

    timer.innerHTML = paddedTimer;
  
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

function updateGrid(width, height, mask, values) {
    for (let y = 0; y <= height; y++) {
        for (let x = 0; x <= width; x++) {
            const cell = document.getElementById(x + ";" + y);
            cell.innerHTML = mask[y][x] & 1 ? values[y][x] : "";
            cell.style.color = colorMap[values[y][x]];
        }
    }
}

// Create Minesweeper Grid
function createGrid(width, height, mines) {
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
            
            cell.addEventListener("click", click.bind(null, cell));
            
            cell.style.width = 100 / width + "%";
            cell.style.fontSize = 600 / width + "px";

            row.appendChild(cell);
        }
    }
}