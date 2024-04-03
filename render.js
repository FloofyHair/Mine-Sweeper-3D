

// Create Minesweeper Grid
document.addEventListener("DOMContentLoaded", function() {

    height = 5;
    width = 10;
    grid = document.getElementById("grid");

    for (let i = 0; i < height; i++) {
        row = document.createElement("div");
        row.className = "row";
        console.log(row);
        console.log(grid);
        grid.appendChild(row);
        for (let j = 0; j < width; j++) {
            cell = document.createElement("div");
            cell.className = "cell";
            row.appendChild(cell);
        }
    }
});