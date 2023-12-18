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
function getExpandedUniverse(universe: string[][]): number[][] {
    const expansionFactor = 1000000 - 1;

    // Neuer Ansatz: wir gehen alle Reiehn durch, die erweitert werden und zählen diese in einem Array für jede Zeile mit, die diese Expansion betrifft
    // Wenn wir dann die Distanz berechnen, müssen wir die Differenz der Ausdehnungen für beide Koordinaten/Universen berücksichtigen und
    // diese Differenz in den Abstand mit einkalkulieren

    const rowsExpansion: number[] = new Array(universe.length).fill(0);
    // horizontal
    for (let i = 0; i < universe.length; i++) {
        let noGalaxies = true;
        for (let j = 0; j < universe[i].length; j++) {
            if (universe[i][j] === "#") {
                noGalaxies = false;
            }
        }
        if (noGalaxies) {
            for (let k = i; k < universe.length; k++) {
                rowsExpansion[k] += 1 * expansionFactor;
            }
        }
    }

    // vertical

    const columnExpansion: number[] = new Array(universe[0].length).fill(0);

    const len = universe[0].length;
    for (let i = 0; i < len; i++) {
        let noGalaxies = true;

        for (let j = 0; j < universe.length; j++) {
            if (universe[j][i] === "#") {
                noGalaxies = false;
                break;
            }
        }

        if (noGalaxies) {
            for (let k = i; k < universe[0].length; k++) {
                columnExpansion[k] += 1 * expansionFactor;
            }
        }
    }
    return [rowsExpansion, columnExpansion];
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
    return Math.floor(
        Math.abs(a.row - b.row) +
        Math.abs(expansions[0][a.row] - expansions[0][b.row]) +
        Math.abs(a.column - b.column) +
        Math.abs(expansions[1][a.column] - expansions[1][b.column]),
    );
}

const expansions: number[][] = getExpandedUniverse(rows);
const galaxyCoordinates: coordinates[] = getGalaxyCoordinates(rows);

let result = 0;
for (let i = 0; i < galaxyCoordinates.length - 1; i++) {
    for (let j = i + 1; j < galaxyCoordinates.length; j++) {
        const distance = getDistanceOfTwoUniverses(
            galaxyCoordinates[i],
            galaxyCoordinates[j],
        );

        result += distance;
    }
}

// const offset = (rows.length - 1) * (rows[0].length - 1) + 1;

console.log(result);
