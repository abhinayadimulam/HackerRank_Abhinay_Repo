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

function popStack(stack, routesObj, height) {
    let count;
    let last;
    while (stack.length && ~~peek(stack) < height) {
        if (last !== peek(stack)) {
            if (count > 1) {
                routesObj.routes += calculateRoutes(count);
            }
            last = stack.pop();
            count = 1;
            continue;
        }
        // last equals the top of the stack
        stack.pop();
        count++;
    }
    if (count > 1) {
        routesObj.routes += calculateRoutes(count);
    }
}
function calculateRoutes(buildings) { return buildings * (buildings - 1); }
function peek(stack) { return stack[stack.length - 1]; }
// Complete the solve function below.
function solve(arr) {
    const stack = [arr.shift()];
    let totalRoutes = { routes: 0 };
    arr.forEach(height => {
        if (!stack.length) {
            stack.push(height);
            return;
        }
        if (height > peek(stack)) {
            popStack(stack, totalRoutes, height);
        }
        stack.push(height);
    });
    if (stack.length) popStack(stack, totalRoutes, Number.MAX_SAFE_INTEGER);

    return totalRoutes.routes;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let result = solve(arr);

    ws.write(result + "\n");

    ws.end();
}
