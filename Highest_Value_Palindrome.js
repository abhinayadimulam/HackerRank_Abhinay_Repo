'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function highestValuePalindrome(s, n, k) {
    const chars = s.split('');
    const side1End = Math.floor(chars.length / 2);
    const side2Start = Math.ceil(chars.length / 2);

    let availableMoves = k;

    const side1 = chars.slice(0, side1End);
    const side2 = chars.slice(side2Start, chars.length).reverse();

    const middle = chars.slice(side1End, side2Start);

    const changedIndicies = [...new Array(side1.length)].map(i => false);

    side1.forEach((char, index) => {
        if (char !== side2[index]) {
            changedIndicies[index] = true;
            availableMoves--;
            const max = Math.max(side1[index], side2[index]);
            side1[index] = max;
            side2[index] = max;
        }
    });


    if (availableMoves < 0) {
        return -1;
    }

    let index = 0;
    while (availableMoves > 0 && index < side1.length) {
        const changeCost = changedIndicies[index] ? 1 : 2;
        const shouldChange = side1[index] != 9;

        if (changeCost <= availableMoves && shouldChange) {
            side1[index] = 9;
            side2[index] = 9;
            availableMoves = availableMoves - changeCost;
        }

        index++;
    }

    if (availableMoves > 0 && middle.length > 0) {
        middle[0] = 9;
    }

    return [...side1, ...middle, ...side2.reverse()].join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const s = readLine();

    let result = highestValuePalindrome(s, n, k);

    ws.write(result + "\n");

    ws.end();
}
