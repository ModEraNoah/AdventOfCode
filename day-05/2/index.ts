import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n\n");
    return rows.map((row) => {
        return row;
    });
}

// const rows: string[] = getFileRows("day-05/2/day-05-test.txt");
const rows: string[] = getFileRows("day-05/2/day-05-input.txt");

const seeds = rows[0]
    .split(":")[1]
    .match(/\d+/g)!
    .map((el) => parseInt(el));
console.log(seeds);

rows.shift();

const goTo: number[][] = [];
rows.forEach((row) => {
    goTo.push(
        row
            .split(":")[1]
            .split("\n")
            .filter((row) => row)
            .map((row) => {
                return row.match(/\d+/g)!.map((el) => parseInt(el));
            }) as number[][],
    );
});

let notFound = true;
let location = 0;
while (notFound) {
    const temp = getLocation(location);
    if (isSeed(temp)) {
        console.log("seed:", temp);
        console.log("location:", location);
        notFound = false;
    }
    location++;
}

function getLocation(seed: number): number {
    let res = 0;
    for (let i = rows.length - 1; i > -1; i--) {
        res = getDestination(seed, goTo[i]);
        seed = res;
    }
    return res;
}

function getDestination(seed: number, goToMap: number[][]): number {
    for (let i = 0; i < goToMap.length; i++) {
        if (seed >= goToMap[i][0] && seed < goToMap[i][0] + goToMap[i][2]) {
            return seed + (goToMap[i][1] - goToMap[i][0]);
        }
    }
    return seed;
}

function isSeed(seed: number) {
    for (let i = 0; i < seeds.length; i += 2) {
        if (seed >= seeds[i] && seed <= seeds[i] + seeds[i + 1]) {
            return true;
        }
    }
    return false;
}
