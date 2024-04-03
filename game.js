const width = 20;
const height = 10;

const dX = [1, 1, 0, -1, -1, -1,  0,  1];
const dY = [0, 1, 1,  1,  0, -1, -1, -1];

function randInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}

function generateBoard(num_mines){
    if((width<=0)||(height<=0)||(num_mines>width*height)){
        return false
    }

    var grid = new Array(height);

    for (var y = 0; y < height; y++) {
        var row = new Array(width);
        row.fill(0);
        grid[y] = row;
    }
    let i = 0;
    while(i<num_mines){
        x = randInt(0, width);
        y = randInt(0, height);

        if(grid[y][x] == 0){
            i++;
            grid[y][x] = 1
        }
    }

    return grid
}

function getGridNumbers(mine_grid){
    var grid = new Array(height);

    for (var y = 0; y < height; y++) {
        grid[y] = new Array(width);
        for (var x = 0; x < width; x++) {
            grid[y][x] = numNeighbors(mine_grid,x,y)
        }
    }

    return grid
}

function validCell(x, y){
    return (x > 0 || x < width || y > 0 || y < height)
}
function numNeighbors(grid, x, y){
    num = 0
    for(var n = 0; n<8; n++){
        dx = x+dX[n];
        dy = y+dY[n];
        if(validCell(dx,dy)){
            num += grid[y][x]
        }
    }
    return num
}