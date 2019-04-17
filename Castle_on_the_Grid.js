'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

function minimumMoves(grid, startRow, startCol, goalRow, goalCol) {
    var n = grid[0].length;

    var queue = [];
    queue.push({
        col: startCol,
        row: startRow,
        moves: 0
    });

    var moves, direction;
    var node, row, col;
    var visited = {};
    while (queue.length > 0) {
        node = queue.shift();
        row = node.row;
        col = node.col;
        moves = node.moves + 1;

        if (row === goalRow && col === goalCol) {
            return moves - 1;
        }
        var iter = 1;
        while ((row - iter) >= 0 && grid[row - iter][col] !== 'X') {
            if (!visited[(row - iter) + '-' + col]) {
                visited[(row - iter) + '-' + col] = true;
                queue.push({
                    col: col,
                    row: row - iter,
                    moves: moves
                });
            }
            iter++;
        }
        iter = 1;
        while ((row + iter) < n && grid[row + iter][col] !== 'X') {
            if (!visited[(row + iter) + '-' + col]) {
                visited[(row + iter) + '-' + col] = true;
                queue.push({
                    col: col,
                    row: row + iter,
                    moves: moves
                });
            }
            iter++;
        }
        iter = 1;
        while ((col - iter) >= 0 && grid[row][col - iter] !== 'X') {
            if (!visited[row + '-' + (col - iter)]) {
                visited[row + '-' + (col - iter)] = true;
                queue.push({
                    col: col - iter,
                    row: row,
                    moves: moves
                });
            }
            iter++;
        }
        iter = 1;
        while ((col + iter) < n && grid[row][col + iter] !== 'X') {
            if (!visited[row + '-' + (col + iter)]) {
                visited[row + '-' + (col + iter)] = true;
                queue.push({
                    col: col + iter,
                    row: row,
                    moves: moves
                });
            }
            iter++;
        }
    }
    return -1;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const startXStartY = readLine().split(' ');

    const startX = parseInt(startXStartY[0], 10);

    const startY = parseInt(startXStartY[1], 10);

    const goalX = parseInt(startXStartY[2], 10);

    const goalY = parseInt(startXStartY[3], 10);

    const result = minimumMoves(grid, startX, startY, goalX, goalY);

    ws.write(result + '\n');

    ws.end();
}
