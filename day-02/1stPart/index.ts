import fs from "fs";

export function cubeConundrum(path: string) {
    const fileContent = fs.readFileSync(path, "utf8");
    const allRows = fileContent.split(/\r?\n/);

    let idSum: number = 0;
    for (let i = 0; i < allRows.length - 1; i++) {
        const splittedRow: string[] = allRows[i].split(":");
        const gamePart = splittedRow[0];
        const cubePart = splittedRow[1];

        const isPossible: boolean = compareCubes(cubePart);

        if (isPossible) {
            console.log("success gamePart:", gamePart);
            idSum += eval(gamePart.split(" ")[1]);
        }
    }

    console.log("idSum: ", idSum);
}

export function compareCubes(row: string): boolean {
    const sets: string[] = row.split(";");

    let isPossible = true;
    for (let i = 0; i < sets.length; i++) {
        const cubeMap: Map<string, number> = new Map([
            ["blue", 0],
            ["red", 0],
            ["green", 0],
        ]);
        const cubes = sets[i].split(",");
        cubes.forEach((cubePair) => {
            const splittedPair: string[] = cubePair.split(" ");
            const cubeCounter = eval(splittedPair[1]);
            const cubeColor = splittedPair[2];

            const currentColorCounter = cubeMap.get(cubeColor)!;
            cubeMap.set(cubeColor, currentColorCounter + cubeCounter);
        });

        if (
            cubeMap.get("blue")! > 14 ||
            cubeMap.get("red")! > 12 ||
            cubeMap.get("green")! > 13
        ) {
            isPossible = false;
        }
    }

    return isPossible;
}

console.log("Test-Data:");
cubeConundrum("day-02/1stPart/day-02-test.txt");

console.log("real Data:");
cubeConundrum("day-02/1stPart/day-02-input.txt");
