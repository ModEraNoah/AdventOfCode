import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows;
}

// const rows: string[] = getFileRows("day-08/2/day-08-test.txt");
const rows: string[] = getFileRows("day-08/2/day-08-input.txt");

const stepScheme = rows.shift()!;
rows.shift();

const list: { current: string; left: string; right: string }[] = [];

rows.forEach((row) => {
    const x: any = {};
    x.current = row.split("=")[0].trim();
    x.left = row
        .split("=")[1]
        .split(",")[0]
        .match(/[1-9A-Z]+/g)!
        .toString();
    x.right = row
        .split("=")[1]
        .split(",")[1]
        .match(/[1-9A-Z]+/g)!
        .toString();
    list.push(x);
});

let foundZ = false;
let start: any = list.filter((el) => el.current.match(/[??A]/));
console.log("start:", start);
const directionsMap: Map<string, string[]> = new Map();
const res = [];
for (let i = 0; i < start.length; i++) {
    let counter = 0;
    while (!foundZ) {
        if (stepScheme[counter % stepScheme.length] === "R") {
            if (directionsMap.has(start[i].right)) {
                start[i] = directionsMap.get(start[i].right);
            } else {
                start[i] = list.filter((el) => el.current === start[i].right)[0];
                directionsMap.set(start[i].current, start[i]);
            }
        } else {
            if (directionsMap.has(start[i].left)) {
                start[i] = directionsMap.get(start[i].left);
            } else {
                start[i] = list.filter((el) => el.current === start[i].left)[0];
                directionsMap.set(start[i].current, start[i]);
            }
        }

        counter++;
        if (start[i].current.match(/[??Z]/)) {
            foundZ = true;
        }
    }
    console.log(counter);
    res.push(counter);
    foundZ = false;
}

// source: https://www.geeksforgeeks.org/lcm-of-given-array-elements/
// Javascript program to find LCM of n elements

// Utility function to find
// GCD of 'a' and 'b'
function gcd(a: number, b: number) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// Returns LCM of array elements
function findlcm(arr: number[], n: number) {
    // Initialize result
    let ans = arr[0];

    // ans contains LCM of arr[0], ..arr[i]
    // after i'th iteration,
    for (let i = 1; i < n; i++) ans = (arr[i] * ans) / gcd(arr[i], ans);

    return ans;
}

console.log("least common multiple:", findlcm(res, res.length));
