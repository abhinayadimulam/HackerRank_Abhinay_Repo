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

// Complete the solve function below.
function solve(arr) {
    let max = 0;
    if (arr.length < 3) return 0;
    let i = arr.length - 2;
    while (arr[i] >= arr[i + 1]) {
        i--;
        if (i == 0) return 0;
    }
    const end = i + 1; // rigth topmost

    let rightBed = i;

    while (arr[i] >= arr[i - 1]) {
        if (arr[i] !== arr[i - 1]) rightBed = i - 1;
        i--;
        if (i == 0) return 0;
    }

    let left = i-1;

    for (i = rightBed; i < end; i++) {
        if (arr[i] == arr[i + 1]) continue;
        const newMax = findLeft(arr[i]) * (i + 2);
        if (newMax == 0) return max;
        max = Math.max(newMax, max);
    }

    function findLeft(val) {
        while (arr[left] <= val) {
            left--;
            if (left < 0) return 0;
        }
        return left + 1;
    }

    return max;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = solve(arr);

    ws.write(result + "\n");

    ws.end();
}
