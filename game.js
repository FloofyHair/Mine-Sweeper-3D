const width = 20;
const height = 10;

const dX = [1, 1, 0, -1, -1, -1,  0,  1];
const dY = [0, 1, 1,  1,  0, -1, -1, -1];

function randInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min
}

function generateGrid(width, height){
    var grid = new Array(height);

    for (var y = 0; y < height; y++) {
        var row = new Array(width);
        row.fill(0);
        grid[y] = row;
    }

    return grid
}
function generateBoard(num_mines){
    if((width<=0)||(height<=0)||(num_mines>width*height)){
        return false
    }

    grid = generateGrid(width, height);
    let i = 0;
    while(i<num_mines){
        x = randInt(0, width-1);
        y = randInt(0, height-1);

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
    return ((x >= 0) && (x < width) && (y >= 0) && (y < height))
}
function numNeighbors(grid, x, y){

    if(grid[y][x]==1){
        return -1
    }
    num = 0
    for(var n = 0; n<8; n++){
        dx = x+dX[n];
        dy = y+dY[n];
        if(validCell(dx,dy)){
            num += grid[dy][dx]
        }
    }
    return num
}

function logB(board){
    board.forEach(row => {
        x = ''
        row.forEach(n=>{
            if(n==-1){
                x+='X'
            }
            else{
            x+=n
            }
            x+=' '
        })
        console.log(x)
    });
    console.log()
}

function floodFill(x,y, numbers){
    var mask = generateGrid(width, height)
    var queue = [[x,y]]
    while(queue.length>0){
        let current = queue.shift(0)
        let cx = current[0]
        let cy = current[1]
        if((!validCell(cx,cy))||(mask[cy][cx]==1)){continue}
        mask[cy][cx] = 1
        if(numbers[cy][cx]>0){continue}
        for(let d = 0; d<8; d++){
            queue.push([cx+dX[d],cy+dY[d]])
        }
    }
    return mask
}

board = generateBoard(20)
numbers = getGridNumbers(board)
mask = floodFill(0,0,numbers)
logB(numbers)
logB(mask)
