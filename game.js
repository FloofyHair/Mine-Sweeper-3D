const dX = [1, 1, 0, -1, -1, -1,  0,  1];
const dY = [0, 1, 1,  1,  0, -1, -1, -1];

numFlags = 0;
remainingMines = initialMines;

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
function generateBoard(width, height, num_mines){
    if((width<=0)||(height<=0)||(num_mines>width*height)){
        return false
    }

    grid = generateGrid(width, height);
    let i = 0;
    while(i<num_mines){
        let x = randInt(0, width-1);
        let y = randInt(0, height-1);

        if(grid[y][x] == 0){
            i++;
            grid[y][x] = 1
        }
    }

    return grid
}

function getGridNumbers(width, height, mine_grid){
    var grid = new Array(height);

    for (let y = 0; y < height; y++) {
        grid[y] = new Array(width);
        for (let x = 0; x < width; x++) {
            grid[y][x] = numNeighbors(mine_grid, width, height, x, y)
        }
    }

    return grid
}

function validCell(width, height, x, y){
    return ((x >= 0) && (x < width) && (y >= 0) && (y < height))
}
function numNeighbors(grid, width, height, x, y){

    if(grid[y][x]==1){
        return -1
    }
    num = 0
    for(var n = 0; n<8; n++){
        let dx = x+dX[n];
        let dy = y+dY[n];
        if(validCell(width, height, dx,dy)){
            num += grid[dy][dx]
        }
    }
    return num
}

function logB(board){
    board.forEach(row => {
        let x = ''
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

function floodFill(width, height, x,y, numbers, old_mask){
    var mask = generateGrid(width, height)
    var queue = [[x,y]]
    while(queue.length>0){
        let current = queue.shift(0)
        let cx = current[0]
        let cy = current[1]
        if((!validCell(width, height, cx,cy))||(mask[cy][cx]==1)){continue}
        mask[cy][cx] = 1
        if(numbers[cy][cx]!=0){continue}
        for(let d = 0; d<8; d++){
            queue.push([cx+dX[d],cy+dY[d]])
        }
    }
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            mask[y][x] = mask[y][x] | old_mask[y][x]
        }
    }
    return mask
}
function gameSetup(width, height){
    board = generateGrid(width, height)
    numbers = generateGrid(width, height)
    mask = generateGrid(width, height)
    flags = generateGrid(width, height)

    createGrid(width, height, numbers);
    updateGrid(width, height, mask, flags, numbers);
    updateMines(remainingMines)
}

function getXY(string){
    return string.split(";").map(Number);
}

function updateFlags(width, height, flags, mask){
    newFlags = generateGrid(width, height)
    for(let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            newFlags[y][x] = (1-mask[y][x])&flags[y][x]
        }
    }
    return newFlags
}
firstTime = true;

function onFirstClick(width, height, cell){
    clickPos = getXY(cell.id);
    firstTime = false;
    updateMines(initialMines); // Initialize mines
    incrementTimer(); // Initialize time

    let x = clickPos[0]
    let y = clickPos[1]
    board = generateBoard(width, height, initialMines)
    while(numNeighbors(board, width, height, x, y)!=0){
        board = generateBoard(width, height, initialMines)
    }

    numbers = getGridNumbers(width, height, board)
}
function click(width, height, event) {
    if (event.target.className == "cell") {
        cell = event.target;
        if (firstTime) {
            onFirstClick(width, height, cell)
        }
        clickPos = getXY(cell.id);
        mask = floodFill(width, height, clickPos[0], clickPos[1], numbers, mask);
        flags = updateFlags(width, height, flags, mask);
        update(width, height, mask, flags, numbers);
}
}
function gridSum(width, height, grid){
    let n = 0
    for (let y = 0; y < height; y++){
        for(let x = 0; x < width; x++){
            n += grid[y][x]
        }
    }
    return n
}

function update(width, height, mask, flags, numbers){
    numFlags = gridSum(width, height, flags)
    remainingMines = Math.max(0,initialMines - numFlags);
    updateMines(remainingMines);
    updateGrid(width, height, mask, flags, numbers)
}

function rightClick(width, height, event){
    if (event.target.className == "cell") {
        cell = event.target;
        event.preventDefault();
        clickPos = getXY(cell.id);
        x = clickPos[0];
        y = clickPos[1];
        flags[y][x] = (1-mask[y][x])&(1-flags[y][x]);
        update(width, height, mask, flags, numbers);
    }
}

