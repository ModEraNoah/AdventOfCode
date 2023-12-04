import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows.map((row) => {
        return row.split(": ")[1].trim();
    });
}

// const rows: string[] = getFileRows("day-04/1/day-04-test.txt");
const rows: string[] = getFileRows("day-04/1/day-04-input.txt");
console.log(rows);

const leftSide = [];
const rightSide = [];
for (let i = 0; i < rows.length; i++) {
    const partedArray = rows[i].split("|");
    leftSide.push(
        partedArray[0]
            .trim()
            .split(" ")
            .filter((el) => {
                return el !== "";
            })
            .map((el) => parseInt(el)),
    );
    rightSide.push(
        partedArray[1]
            .trim()
            .split(" ")
            .filter((el) => {
                return el !== "";
            })
            .map((el) => parseInt(el)),
    );
}

console.log(rightSide);

let res: number = 0;

for (let i = 0; i < rows.length; i++) {
    let counter: number = -1;
    for (let j = 0; j < leftSide[i].length; j++) {
        if (rightSide[i].includes(leftSide[i][j])) {
            counter++;
        }
    }
    if (counter > -1) {
        console.log("game:", i + 1, "counter:", counter);
        res = res + Math.pow(2, counter);
    }
}

console.log(res);
