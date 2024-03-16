import {decreaseMines, gameOn, increaseMines, matrix, setGameOn, getMines} from "./variables.js";
import {table} from "./elements.js";
import {
    getCoordinates,
    getNeighboursCoordinates,
    getNeighboursFlagsCount,
    getNeighboursMinesCount,
    getRandomInt
} from "./utils.js";
import {getFlag, getMine} from "./views.js";
import {startTime} from "./timer.js";

function putMines(excludeRow, excludeColumn) {
    let numRows = table.rows.length;
    let numCols = numRows > 0 ? table.rows[0].cells.length : 0;
    let mines = getMines();
    while (mines) {
        let row = getRandomInt(0, numRows - 1);
        let column = getRandomInt(0, numCols - 1);
        if (matrix[row][column] !== -1 && (row !== excludeRow || column !== excludeColumn)) {
            matrix[row][column] = -1;
            mines--;
        }
    }
}

function putNumbers() {
    for (let y = 0; y < table.rows.length; y++) {
        for (let x = 0; x < table.rows[y].cells.length; x++) {
            matrix[y][x] = getNeighboursMinesCount(y, x);
        }
    }
}

function clear(row, column) {
    let button = document.getElementById(`id-button-${row}-${column}`);
    if (!button.classList.contains("clear-button") && !button.querySelector('img')) {
        button.setAttribute("class", "clear-button");
    } else {
        return;
    }
    if (matrix[row][column] === 0) {
        getNeighboursCoordinates(row, column).forEach(([y, x]) => {
            clear(y, x);
        })
    } else {
        if (matrix[row][column] === -1) {
            button.innerHTML = getMine().outerHTML;
            finishGame(false);
        } else {
            button.innerText = matrix[row][column];
        }
    }
}

function finishGame(win) {
    setGameOn(false);
    if (win){
        alert("Congratulations, you won.")
    }
    else{
        for (let y =0; y<matrix.length; y++){
            for (let x = 0; x < matrix[y].length; x++){
                if(matrix[y][x] === -1){
                    let button = document.getElementById(`id-button-${y}-${x}`);
                    button.innerHTML = getMine().outerHTML;
                }
            }
        }
    }
}

function organizeTableAfterFirstClick(initialRow, initialColumn) {
    putMines(initialRow, initialColumn);
    putNumbers();
    setGameOn(true);
    startTime();
}

function clickInfoButton(button) {
    let [y, x] = getCoordinates(button);
    let flagNumber = getNeighboursFlagsCount(y,x);
    if(flagNumber === matrix[y][x]){
        getNeighboursCoordinates(y,x).forEach(([y,x])=> {
            clear(y,x);
        })
    }
}

function clickNormalButton(button){
    if (button.getAttribute("flag")) {
        return;
    }
    let [row, column] = getCoordinates(button)
    if (!gameOn) {
        organizeTableAfterFirstClick(row, column)
    }
    clear(row, column);
}

function clickButton(event) {
    let button = event.target;
    if(!button.classList.contains("clear-button")){
        clickNormalButton(button);
    }
    else{
        clickInfoButton(button);
    }
}

function setFlag(event) {
    if (!gameOn) {
        return;
    }
    event.preventDefault();
    let button = event.target;
    if (button.classList.contains("clear-button")) {
        return;
    }
    if (!button.querySelector('img')) {
        button.innerHTML = getFlag().outerHTML;
        decreaseMines();
    } else {
        button.innerText = "";
        increaseMines();
    }
}

export {clickButton, setFlag}
