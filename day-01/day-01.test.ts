import { getCalibrationValue } from "./day-01";

test("beginning and ending", () => {
    expect(getCalibrationValue("1abc2")).toEqual("12");
});

test("somewhere in the middle", () => {
    expect(getCalibrationValue("pqr3stu8vwx")).toEqual("38");
});

test("mutliple numbers in row", () => {
    expect(getCalibrationValue("a1b2x3d4e5f")).toEqual("15");
});

test("only 1 number in row", () => {
    expect(getCalibrationValue("treb7uchet")).toEqual("77");
});

test("whole file", () => { });
