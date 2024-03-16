import {matrix} from "./variables.js";
function getRandomInt(min, max) {
    min = Math.ceil(min); // Ensure the minimum is rounded up to the nearest whole number
    max = Math.floor(max); // Ensure the maximum is rounded down to the nearest whole number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getNeighboursCoordinates(row, column) {
    let neighboursCoordinates = [];
    const directions = [[-1, -1], [-1, 0], [-1, 1], // Above rows
        [0, -1], [0, 1], // Same row
        [1, -1], [1, 0], [1, 1]  // Below rows
    ];
    directions.forEach(([dy, dx]) => {
        const newY = row + dy;
        const newX = column + dx;
        if (newY >= 0 && newY < matrix.length && newX >= 0 && newX < matrix[newY].length) {
            neighboursCoordinates.push([newY, newX]);
        }
    });
    return neighboursCoordinates
}

function getNeighboursMinesCount(row, column) {
    if (matrix[row][column] === -1) {
        return -1;
    }
    let cont = 0;
    getNeighboursCoordinates(row, column).forEach(([y, x]) => {
        if (matrix[y][x] === -1) {
            cont++;
        }
    });
    return cont;
}

function getNeighboursFlagsCount(row, column) {
    let cont = 0;
    getNeighboursCoordinates(row, column).forEach(([y, x]) => {
        let id = `id-button-${y}-${x}`;
        let button = document.getElementById(id);
        if (button.querySelector("img")) {
            cont++;
        }
    });
    return cont;
}

function generateNumberTotalMines(rows, columns) {
    const percentage = getRandomInt(10, 15) / 100;
    const mines = parseInt(rows * columns * percentage);
    document.getElementById("id_mines_number").value = mines.toString();
    return mines;
}

function getCoordinates(button){
    return [Number(button.getAttribute("data-row")), Number(button.getAttribute("data-column"))];
}

export {getNeighboursCoordinates, getNeighboursMinesCount, getNeighboursFlagsCount, generateNumberTotalMines, getCoordinates, getRandomInt}