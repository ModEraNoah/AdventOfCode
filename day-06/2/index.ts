import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows.map((row) => {
        return row.split(": ")[1].trim();
    });
}

// const rows: string[] = getFileRows("day-06/2/day-06-test.txt");
const rows: string[] = getFileRows("day-06/2/day-06-input.txt");

const timeArray = rows[0].replace(/\s/g, "")!;
const distanceArray = rows[1].replace(/\s/g, "")!;

let res = 1;

res *= calculateOptions(parseInt(timeArray)!, parseInt(distanceArray)!);

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
