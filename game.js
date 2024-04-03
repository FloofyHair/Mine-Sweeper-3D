function randInt(min, max){
    return Math.floor(Math.random() * 10);
}
function generateBoard(width, height, num_mines){
    var grid = new Array(height);

    for (var y = 0; y < height; y++) {
        row = new Array(width);
        row.fill(false);
        grid[y] = row;
    }

    if((width<=0)||(height<=0)||(num_mines>=width*height)){
        return false
    }

    let i = 0;
    while(i<num_mines){
        x = randInt(0, width);
        y = randInt(0, height);

        if(grid[y][x]==false){
            i++;
            grid[y][x]=true
        }
    }

    return grid
}

console.log(generateBoard(10,10,10));