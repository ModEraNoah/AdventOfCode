import fs from "fs";

function getFileContent(fileName: string): string[][] {
    const fileContent = fs.readFileSync("day-11/1/" + fileName);
    const rows: string[] = fileContent.toString().split("\n");
    rows.pop();
    return rows.map((row: string) => {
        return row.split("");
    });
}

// const rows = getFileContent("test.txt");
const rows = getFileContent("input.txt");

// any rows or columns that contain no galaxies should all actually be twice as big
function getExpandedUniverse(universe: string[][]): string[][] {
    const expandedGalaxy: string[][] = [];

    // horizontal
    for (let i = 0; i < universe.length; i++) {
        let noGalaxies = true;
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === "#") {
                noGalaxies = false;
            }
        }
        // Parse and Stringify to get a deep-clone
        expandedGalaxy.push(JSON.parse(JSON.stringify(universe[i])));
        if (noGalaxies) {
            expandedGalaxy.push(JSON.parse(JSON.stringify(universe[i])));
        }
    }

    // vertical
    const len = expandedGalaxy[0].length;
    let timesSliced = 0;
    for (let i = 0; i < len; i++) {
        let noGalaxies = true;

        for (let j = 0; j < universe.length; j++) {
            if (universe[j][i] === "#") {
                noGalaxies = false;
                break;
            }
        }

        if (noGalaxies) {
            for (let j = 0; j < expandedGalaxy.length; j++) {
                expandedGalaxy[j].splice(
                    i + timesSliced,
                    Infinity,
                    ...[".", ...expandedGalaxy[j].slice(i + timesSliced)],
                );
            }
            timesSliced++;
        }
    }
    return expandedGalaxy;
}

type coordinates = { row: number; column: number };
function getGalaxyCoordinates(universe: string[][]): coordinates[] {
    const galaxyCoordinates: coordinates[] = [];
    for (let i = 0; i < universe.length; i++) {
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === "#") {
                galaxyCoordinates.push({ row: i, column: j });
            }
        }
    }
    return galaxyCoordinates;
}

function getDistanceOfTwoUniverses(a: coordinates, b: coordinates): number {
    return Math.floor(Math.abs(a.row - b.row) + Math.abs(a.column - b.column));
}

const expandedUniverse: string[][] = getExpandedUniverse(rows);
const galaxyCoordinates: coordinates[] = getGalaxyCoordinates(expandedUniverse);

let result = 0;
for (let i = 0; i < galaxyCoordinates.length - 1; i++) {
    for (let j = i + 1; j < galaxyCoordinates.length; j++) {
        result += getDistanceOfTwoUniverses(
            galaxyCoordinates[i],
            galaxyCoordinates[j],
        );
    }
}

console.log(result);
