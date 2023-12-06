import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows.map((row) => {
        return row.split(": ")[1].trim();
    });
}

// const rows: string[] = getFileRows("day-06/1/day-06-test.txt");
const rows: string[] = getFileRows("day-06/1/day-06-input.txt");

const timeArray = rows[0].match(/\d+/g)!;
const distanceArray = rows[1].match(/\d+/g)!;

let res = 1;

for (let i = 0; i < timeArray.length; i++) {
    res *= calculateOptions(parseInt(timeArray[i])!, parseInt(distanceArray[i])!);
}

function calculateOptions(time: number, distance: number) {
    const smaller = Math.floor(
        time / 2 - Math.sqrt((time / 2) ** 2 - distance) + 0.000000001,
    );
    const bigger = Math.floor(
        time / 2 + Math.sqrt((time / 2) ** 2 - distance) - 0.000000001,
    );

    return bigger - smaller;
}

console.log("result:", res);
