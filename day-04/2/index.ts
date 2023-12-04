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

const leftSide: any = [];
const rightSide: any = [];
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

const howManyTimesGetCalled = new Array(rows.length).fill(1);

for (let i = 0; i < rows.length; i++) {
    console.log("Game", i + 1, "gets called x times:", howManyTimesGetCalled[i]);

    let counter: number = 0;

    for (let j = 0; j < leftSide[i].length; j++) {
        if (rightSide[i].includes(leftSide[i][j])) {
            counter++;
            // as each [i+counter] gets called n times by the item [i]
            howManyTimesGetCalled[i + counter] += howManyTimesGetCalled[i];
        }
    }
}

console.log(
    "how many times do they get called",
    howManyTimesGetCalled.reduce((a, b) => a + b, 0),
);
