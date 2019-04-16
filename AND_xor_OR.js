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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the andXorOr function below.
 */
function andXorOr(a) {
    // console.log(a)
    // console.log(a.sort((a, b) => a-b))
    let s = [];
    for (let i = a.length; i >= 1; i--) {
        s.push(((a[i] & a[i - 1]) ^ (a[i] | a[i - 1])) & (a[i] ^ a[i - 1]))
    }
    return s.sort((a, b) => a - b).pop();
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const aCount = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = andXorOr(a);

    ws.write(result + "\n");

    ws.end();
}
