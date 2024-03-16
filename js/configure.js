import {matrix, setMines, clearMatrix, setGameOn} from "./variables.js";
import {clickButton, setFlag} from "./events.js";
import {table} from "./elements.js";
import {generateNumberTotalMines} from "./utils.js";

function fillNewCell(newCell, rowNumber, columnNumber) {
    // create button
    let button = document.createElement("button");
    button.setAttribute("data-row", rowNumber);
    button.setAttribute("data-column", columnNumber);
    button.setAttribute("id", `id-button-${rowNumber}-${columnNumber}`);
    button.addEventListener('click', clickButton);
    button.addEventListener("contextmenu", setFlag);
    newCell.appendChild(button);
}
function createTable(rowsNumber, columnsNumber) {
    while (table.rows.length > 0) {
        table.deleteRow(0); // Always delete the first row
    }
    clearMatrix();
    setGameOn(false);
    for (let rowNumber = 0; rowNumber < rowsNumber; rowNumber++) {
        let newRow = table.insertRow(rowNumber);
        let matrixRow = [];
        for (let columnNumber = 0; columnNumber < columnsNumber; columnNumber++) {
            let newCell = newRow.insertCell(columnNumber);
            fillNewCell(newCell, rowNumber, columnNumber);
            matrixRow.push(0);
        }
        matrix.push(matrixRow);
    }
    let mines = generateNumberTotalMines(rowsNumber, columnsNumber);
    setMines(mines);
}

export {createTable}