import fs from "fs";

function getFileContent(fileName: string): string[][] {
    const fileContent = fs.readFileSync("day-12/1/" + fileName);
    const rows: string[] = fileContent.toString().split("\n");
    rows.pop();
    return rows.map((row: string) => {
        return row.split(" ");
    });
}

// console.log(getFileContent("test.txt"));
const r = getFileContent("test.txt");
// const r = getFileContent("input.txt");

let res = 0;
for (let i = 0; i < r.length; i++) {
    const line = r[i][0];
    const groupSize = r[i][1].split(",").map((num) => {
        return parseInt(num);
    });
    res += solve(line, groupSize, 0);
}
console.log(res);

// console.log(line);
// console.log(groupSize);

function solve(row: string, groupArray: number[], groupIndex: number) {
    // base cases:
    // 1. grouplength > row
    // 2. row empty and grouplength 0 => valid solution
    /*
                                                    console.log("substring: ", row);
                                                    console.log(
                                                        "row:",
                                                        row,
                                                        "groupArray:",
                                                        groupArray,
                                                        "GroupINdex:",
                                                        groupIndex,
                                                        "row-length:",
                                                        row.length,
                                                    );
                                                    */
    // if (row.length === 0 && groupIndex > groupArray.length - 1) return 1;
    if (groupIndex > groupArray.length - 1) return 1;
    if (groupArray[groupIndex] > row.length) return 0;

    let counter = 0;
    // always do the seperator with the current check ==> every substring can start at index 0 and has to set the "." at the end of its group's sequence
    for (let i = 0; i <= row.length - groupArray[groupIndex]; i++) {
        // +1 because the group has to end with a "."
        let isDamagedGroup = true;
        for (let j = i; j <= groupArray[groupIndex] + i; j++) {
            if (j === groupArray[groupIndex] + i && row[j] === "#") {
                isDamagedGroup = false;
            } else if (row[j] === "." && j !== groupArray[groupIndex] + i) {
                isDamagedGroup = false;
            }
            if (j === row.length - 1) {
                // console.log("last one in string reached");
                break;
            }
        }

        if (
            isDamagedGroup //&&
            //            row.substring(i + groupArray[groupIndex] + 1).length >=
            //groupArray[groupIndex + 1]
        ) {
            /*
                                                                                                                                                            console.log("isDamagedGroup");
                                                                                                                                                            console.log(
                                                                                                                                                                "new substring: ",
                                                                                                                                                                row.substring(i + groupArray[groupIndex] + 1),
                                                                                                                                                            );
                                                                                                                                                            */
            counter += solve(
                row.substring(i + groupArray[groupIndex] + 1),
                groupArray,
                groupIndex + 1,
            );
            // console.log("counter: ", counter);

            i = row.indexOf("?", i) > 0 ? row.indexOf("?", i) : i;
            i =
                row.indexOf(".", i) > 0 && row.indexOf(".", i) < i
                    ? row.indexOf(".", i)
                    : i;
        }
        // console.log("i:", i);
    }
    return counter;
}
