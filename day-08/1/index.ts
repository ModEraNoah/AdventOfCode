import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows;
}

// const rows: string[] = getFileRows("day-08/1/day-08-test.txt");
const rows: string[] = getFileRows("day-08/1/day-08-input.txt");

const stepScheme = rows.shift()!;
rows.shift();

const list: { current: string; left: string; right: string }[] = [];

rows.forEach((row) => {
    const x: any = {};
    x.current = row.split("=")[0].trim();
    x.left = row
        .split("=")[1]
        .split(",")[0]
        .match(/[A-Z]+/g)!
        .toString();
    x.right = row
        .split("=")[1]
        .split(",")[1]
        .match(/[A-Z]+/g)!
        .toString();
    list.push(x);
});

let foundZZZ = false;
let start: any = list.filter((el) => el.current === "AAA")[0];
let counter = 0;
const directionsMap: Map<string, string[]> = new Map();
while (!foundZZZ) {
    if (stepScheme[counter % stepScheme.length] === "R") {
        if (directionsMap.has(start.right)) {
            start = directionsMap.get(start.right);
        } else {
            start = list.filter((el) => el.current === start.right)[0];
            directionsMap.set(start.current, start);
        }
    } else {
        if (directionsMap.has(start.left)) {
            start = directionsMap.get(start.left);
        } else {
            start = list.filter((el) => el.current === start.left)[0];
            directionsMap.set(start.current, start);
        }
    }

    if (start.current === "ZZZ") {
        foundZZZ = true;
    }

    counter++;
}

console.log(counter);
