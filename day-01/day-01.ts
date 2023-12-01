import fs from "fs";

export function trebuchet(path: string) {
    const fileContent = fs.readFileSync(path, "utf8");
    const allRows = fileContent.split(/r?\n/);

    let counter = 0;
    for (let i = 0; i < allRows.length - 1; i++) {
        //console.log(allRows[i]);
        counter += parseInt(getCalibrationValue(allRows[i]));
    }

    console.log("Sum of all calibration values: ", counter);
}

export function getCalibrationValue(row: string): string {
    let frontPointer: string = "";
    let backPointer: string = "";

    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < row.length; i++) {
        try {
            if (numbers.includes(row[i])) {
                frontPointer = row[i];
                break;
            }
        } catch (e) {
            continue;
        }
    }

    for (let i = row.length - 1; i >= 0; i--) {
        try {
            if (numbers.includes(row[i])) {
                backPointer = row[i];
                break;
            }
        } catch (e) {
            continue;
        }
    }

    return frontPointer + backPointer;
}

// trebuchet("day-01/day-01-input.txt");
trebuchet("day-01/day-01-input.txt");
