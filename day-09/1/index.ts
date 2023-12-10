import fs from "fs";

function getFileRows(path: string): number[][] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows.map((row) => row.match(/-?\d+/g)!.map((col) => parseInt(col)!));
}

// const rows: number[][] = getFileRows("day-09/1/test.txt");
const rows: number[][] = getFileRows("day-09/1/input.txt");

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
        nextLevel.push(arr[i] - arr[i - 1]);
    }
    const nextVal: number = calculate(nextLevel)!;
    arr.push(arr[arr.length - 1] + nextVal);
    // console.log("arr:", arr, "nextVal:", nextVal);
    return arr[arr.length - 1];
}

let res = 0;
for (let i = 0; i < rows.length; i++) {
    res += calculate(rows[i]);
}
console.log("res: ", res);
