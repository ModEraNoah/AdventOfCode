import fs from "fs";

export function trebuchet(path: string) {
    const fileContent = fs.readFileSync(path, "utf8");
    const allRows = fileContent.split(/\r?\n/);

    let counter = 0;
    for (let i = 0; i < allRows.length - 1; i++) {
        counter += parseInt(getCalibrationValue(allRows[i]));
    }

    console.log("Sum of all calibration values: ", counter);
}

export function getCalibrationValue(row: string): string {
    let frontPointer: string = "";
    let backPointer: string = "";

    const numericNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const literalNumber = [
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];
    const literalToNumeric = new Map([
        ["one", "1"],
        ["two", "2"],
        ["three", "3"],
        ["four", "4"],
        ["five", "5"],
        ["six", "6"],
        ["seven", "7"],
        ["eight", "8"],
        ["nine", "9"],
    ]);

    let firstNumericNumberIndex: number = Infinity;
    for (let i = 0; i < row.length; i++) {
        try {
            if (numericNumbers.includes(row[i])) {
                frontPointer = row[i];
                firstNumericNumberIndex = i;
                break;
            }
        } catch (e) {
            continue;
        }
    }

    let lastNumericNumberIndex: number = -1;
    for (let i = row.length - 1; i >= 0; i--) {
        try {
            if (numericNumbers.includes(row[i])) {
                backPointer = row[i];
                lastNumericNumberIndex = i;
                break;
            }
        } catch (e) {
            continue;
        }
    }

    let firstLiteralNumberIndex: number = firstNumericNumberIndex;
    literalNumber.forEach((num) => {
        let match = row.match(num)?.index;
        if (match !== null && match! < firstLiteralNumberIndex) {
            frontPointer = literalToNumeric.get(num)!;
            //frontPointer = num;
            firstLiteralNumberIndex = row.match(num)!.index!;
        }
    });

    let lastLiteralNumberIndex: number = lastNumericNumberIndex;
    literalNumber.forEach((num) => {
        let match = row.lastIndexOf(num);
        if (match >= 0 && match! > lastLiteralNumberIndex) {
            backPointer = literalToNumeric.get(num)!;
            //backPointer = num;
            lastLiteralNumberIndex = match;
        }
    });

    return frontPointer + backPointer;
}

trebuchet("day-01/day-01-input.txt");
// trebuchet("day-01/test2-input.txt");
