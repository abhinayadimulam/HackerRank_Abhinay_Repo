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

function solve(t) {
    var c = new Array(Math.max(...t) + 1).fill(0);

    for (var i = 0; i < t.length; i++) {
        if (t[i] < t.length) {
            c[(i + 1) % t.length]++;
            c[(i - t[i] + 1 + t.length) % t.length]--;
        }
    }
    var pos, max = -1, curr = 0;
    for (var i = 0; i < t.length; i++) {
        curr += c[i];
        if (curr > max) {
            pos = i;
            max = curr;
        }
    }
    return (pos + 1);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const tCount = parseInt(readLine(), 10);

    const t = readLine().split(' ').map(tTemp => parseInt(tTemp, 10));

    let id = solve(t);

    ws.write(id + "\n");

    ws.end();
}
