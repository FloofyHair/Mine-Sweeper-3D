width = 0;
height = 0;
initialMines = 0;

gameRunning = false;

document.addEventListener("DOMContentLoaded", ()=>{gameSetup(width, height)})

function getIntVal(elementName){
    return parseInt(document.getElementById(elementName).value)
}

function formSubmit(){
    widthInp = getIntVal("widthInput");
    heightInp = getIntVal("heightInput");
    minesInp = getIntVal("minesInput");

    if(isNaN(widthInp)||isNaN(heightInp)|isNaN(minesInp)){
        return;
    }

    document.getElementById("menu").style.display = "none";
    width = widthInp
    height = heightInp
    initialMines = minesInp
    gameSetup(width, height)
}