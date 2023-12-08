import fs from "fs";

function getFileRows(path: string): string[] {
    const fileContent = fs.readFileSync(path, "utf8");
    const rows = fileContent.split("\n");
    rows.pop();
    return rows;
}

// const rows: string[] = getFileRows("day-07/2/day-07-test.txt");
const rows: string[] = getFileRows("day-07/2/day-07-input.txt");

const list: { hand: string; bid: string; handValue: number; rating: number }[] =
    [];

rows.forEach((row) => {
    const x: any = {};
    [x.hand, x.bid] = row.split(" ");
    list.push(x);
});

list.forEach((l) => getHandValue(l));
getRanking(list);
// console.log(list);

let res: number = 0;
for (let i = 0; i < list.length; i++) {
    res = res + parseInt(Object.values(list)[i].bid) * (i + 1);
}

console.log(res);

/* takes in a object of `list` and calculates the value of the hand and sets the corresponding key-value
 *
 * 5 of a kind = 7 point
 * 4 of a kind = 6 points
 * Full House  = 5 points
 * 3 of a kind = 4 points
 * 2 pair      = 3 points
 * 1 pair      = 2 points
 * High Card   = 1 point
 *
 */
function getHandValue(o: any) {
    const cardMap: Record<string, number> = {};
    let currentMax = 0;
    let maxKey = "";
    for (let i = 0; i < o.hand.length; i++) {
        cardMap[o.hand[i]] = (cardMap[o.hand[i]] ?? 0) + 1;
        if (cardMap[o.hand[i]] > currentMax && o.hand[i] != "J") {
            maxKey = o.hand[i];
            currentMax = cardMap[o.hand[i]];
        }
    }

    const numbersOfJoker = cardMap["J"] ?? 0;
    cardMap[maxKey] += numbersOfJoker;

    delete cardMap["J"];
    const mapLength = Object.keys(cardMap).length;

    if (mapLength === 1) {
        o.handValue = 7;
    } else if (mapLength === 2) {
        if (Object.values(cardMap)[0] === 1 || Object.values(cardMap)[0] === 4) {
            o.handValue = 6;
        } else {
            o.handValue = 5;
        }
    } else if (mapLength === 3) {
        if (Math.max(...Object.values(cardMap)) === 3) {
            o.handValue = 4;
        } else {
            o.handValue = 3;
        }
    } else if (mapLength === 4) {
        o.handValue = 2;
    } else {
        o.handValue = 1;
    }
}

function getCardValue(card: string) {
    switch (card) {
        case "2":
            return 2;
        case "3":
            return 3;
        case "4":
            return 4;
        case "5":
            return 5;
        case "6":
            return 6;
        case "7":
            return 7;
        case "8":
            return 8;
        case "9":
            return 9;
        case "T":
            return 10;
        case "J":
            return 1;
        case "Q":
            return 12;
        case "K":
            return 13;
        case "A":
            return 14;
    }
}

function getRanking(o: any) {
    o.sort((a: any, b: any) => {
        let partRes = a.handValue - b.handValue;
        if (partRes) return partRes;
        for (let i = 0; i < a.hand.length; i++) {
            if (a.hand[i] != b.hand[i])
                return getCardValue(a.hand[i])! - getCardValue(b.hand[i])!;
        }
    });
}
