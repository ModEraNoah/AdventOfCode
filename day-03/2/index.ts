import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows;
}

// const rows: string[] = getFileRows("day-03/1/day-03-test.txt");
const rows: string[] = getFileRows("day-03/1/day-03-input.txt");

let result: number = 0;

const arrayOfSymbols: boolean[][] = [];
const arrayOfNumbers: boolean[][] = [];
const visited: boolean[][] = [];

for (let i = 0; i < rows.length; i++) {
    const row: string = rows[i];
    arrayOfSymbols.push(Array.from(row).map((char) => char === "*"));

    arrayOfNumbers.push(Array.from(row).map((char) => !isNaN(parseInt(char))));

    visited.push(new Array(row.length).fill(false));
}

function findNextFalseIndex(
    array: boolean[][],
    rowIndex: number,
    currentIndex: number,
): number {
    return array[rowIndex].findIndex((val, index) => {
        return val === false && index > currentIndex;
    });
}

function findLastTrueIndex(
    array: boolean[][],
    rowIndex: number,
    currentIndex: number,
): number {
    return (
        array[rowIndex].slice(0, currentIndex).findLastIndex((val, index) => {
            return val === false && index < currentIndex;
        }) + 1
    );
}

for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
        if (arrayOfSymbols[i][j]) {
            checkNeighbours(i, j);
        }
    }
}

function checkNeighbours(row: number, column: number) {
    const numbersForSymbol: number[] = [];
    //check top
    if (row) {
        //straight ahead
        if (arrayOfNumbers[row - 1][column] && !visited[row - 1][column]) {
            doChecking(row - 1, column, numbersForSymbol);
        }

        //left
        if (arrayOfNumbers[row - 1][column - 1] && !visited[row - 1][column - 1]) {
            doChecking(row - 1, column - 1, numbersForSymbol);
        }

        //right

        if (arrayOfNumbers[row - 1][column + 1] && !visited[row - 1][column + 1]) {
            doChecking(row - 1, column + 1, numbersForSymbol);
        }
    }

    // check bottom
    if (row + 1 < rows.length) {
        //straight ahead
        if (arrayOfNumbers[row + 1][column] && !visited[row + 1][column]) {
            doChecking(row + 1, column, numbersForSymbol);
        }

        //left
        if (arrayOfNumbers[row + 1][column - 1] && !visited[row + 1][column - 1]) {
            doChecking(row + 1, column - 1, numbersForSymbol);
        }

        //right

        if (arrayOfNumbers[row + 1][column + 1] && !visited[row + 1][column + 1]) {
            doChecking(row + 1, column + 1, numbersForSymbol);
        }
    }

    // check left
    if (column - 1) {
        //left
        if (arrayOfNumbers[row][column - 1] && !visited[row][column - 1]) {
            doChecking(row, column - 1, numbersForSymbol);
        }
    }

    // check right
    if (column + 1 < rows[0].length) {
        //right
        if (arrayOfNumbers[row][column + 1] && !visited[row][column + 1]) {
            doChecking(row, column + 1, numbersForSymbol);
        }
    }

    if (numbersForSymbol.length === 2) {
        result += numbersForSymbol[0] * numbersForSymbol[1];
    }
}

function doChecking(
    rowToCheck: number,
    columnToCheck: number,
    numbersForSymbol: number[],
) {
    if (
        arrayOfNumbers[rowToCheck][columnToCheck] &&
        !visited[rowToCheck][columnToCheck]
    ) {
        const beginning = findLastTrueIndex(
            arrayOfNumbers,
            rowToCheck,
            columnToCheck,
        );
        const ending = findNextFalseIndex(
            arrayOfNumbers,
            rowToCheck,
            columnToCheck,
        );
        if (beginning > -1 && ending > -1) {
            numbersForSymbol.push(
                parseInt(rows[rowToCheck].slice(beginning, ending)),
            );
            for (let i = beginning; i < ending; i++) {
                visited[rowToCheck][i] = true;
            }
        } else if (ending < 0) {
            numbersForSymbol.push(
                parseInt(rows[rowToCheck].slice(beginning, rows[0].length)),
            );
            for (let i = beginning; i < rows[0].length; i++) {
                visited[rowToCheck][i] = true;
            }
        } else {
            numbersForSymbol.push(
                parseInt(rows[rowToCheck].slice(columnToCheck, ending)),
            );
            for (let i = columnToCheck; i < ending; i++) {
                visited[rowToCheck][i] = true;
            }
        }
    }
}

console.log("result:", result);
