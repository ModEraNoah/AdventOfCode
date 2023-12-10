import fs from "fs";

function getFileRows(path: string): number[][] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows.map((row) => row.match(/-?\d+/g)!.map((col) => parseInt(col)!));
}

// const rows: number[][] = getFileRows("day-09/2/test.txt");
const rows: number[][] = getFileRows("day-09/2/input.txt");

function calculate(arr: number[]) {
    if (
        arr.every((el) => {
            return el == 0;
        })
    ) {
        return 0;
    }

    const nextLevel: number[] = [];
    for (let i = 1; i < arr.length; i++) {
        nextLevel.push(arr[i - 1] - arr[i]);
    }
    const nextVal: number = calculate(nextLevel)!;
    arr.unshift(arr[0] + nextVal);
    return arr[0];
}

let res = 0;
for (let i = 0; i < rows.length; i++) {
    res += calculate(rows[i]);
}
console.log("res: ", res);
