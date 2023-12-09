import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n\n");
    return rows.map((row) => {
        return row;
    });
}

// const rows: string[] = getFileRows("day-05/1/day-05-test.txt");
const rows: string[] = getFileRows("day-05/1/day-05-input.txt");

const seeds = rows[0].split(":")[1].match(/\d+/g)!;

rows.shift();

let minLocation = Infinity;

for (let i = 0; i < seeds.length; i++) {
    const temp = getLocation(parseInt(seeds[i]));
    minLocation = temp < minLocation ? temp : minLocation;
}

console.log("minLocation:", minLocation);

function getLocation(seed: number): number {
    let res = 0;
    for (let i = 0; i < rows.length; i++) {
        const goTo = rows[i]
            .split(":")[1]
            .split("\n")
            .filter((row) => row)
            .map((row) => {
                return row.match(/\d+/g)!.map((el) => parseInt(el));
            }) as number[][];

        res = getDestination(seed, goTo);
        seed = res;
    }
    return res;
}

function getDestination(seed: number, goToMap: number[][]): number {
    for (let i = 0; i < goToMap.length; i++) {
        if (seed <= goToMap[i][1] + goToMap[i][2] && seed >= goToMap[i][1]) {
            return goToMap[i][0] + seed - goToMap[i][1];
        }
    }
    return seed;
}
