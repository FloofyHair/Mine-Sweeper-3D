

// Create Minesweeper Grid
document.addEventListener("DOMContentLoaded", function() {

    height = 5;
    width = 10;

    if (height > width) {
        temp = height;
        height = width;
        width = temp;
    }

    grid = document.getElementById("grid");

    grid.style.aspectRatio = width + "/" + height;

    for (let i = 0; i < height; i++) {
        row = document.createElement("div");
        row.className = "row";
        grid.appendChild(row);
        for (let j = 0; j < width; j++) {
            cell = document.createElement("div");
            cell.className = "cell";
            cell.id = i + "-" + j;
            cell.addEventListener("click", function() {
                console.log(cell.id);
            });
            row.appendChild(cell);
        }
    }
});