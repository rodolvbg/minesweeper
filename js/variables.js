import {minesElement} from "./elements.js";

let matrix = [];
let gameOn = false;
let mines = 0;

function setMines(value){
    mines = value;
    minesElement.value = value.toString();
}

function increaseMines(){
    mines++;
    minesElement.value = mines.toString();
}

function decreaseMines(){
    mines--;
    minesElement.value = mines.toString();
}

function getMines(){
    return mines;
}

function setGameOn(value) {
    gameOn = value;
}

function clearMatrix(){
    matrix = [];
}

export {matrix, gameOn, setGameOn, getMines, setMines, decreaseMines, increaseMines, clearMatrix};