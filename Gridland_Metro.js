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

function insertTrack(mt, track) {
    if (!mt.has(track[0])) {
        mt.set(track[0], { routes: [[track[1], track[2]]] });
    }
    else {
        mt.get(track[0]).routes.push([track[1], track[2]]);
    }
}

function calcTrack(row) {
    let res = BigInt(0);
    let routes = row.routes;
    let prevEnd = 0;
    for (let i = 0; i < routes.length; i++) {
        if (routes[i][0] > prevEnd) {
            res += BigInt((routes[i][1] - routes[i][0]) + 1);
            prevEnd = routes[i][1];
        }
        else {
            if (routes[i][1] > prevEnd) {
                res += BigInt(routes[i][1] - prevEnd);
                prevEnd = routes[i][1];
            }
        }
    }
    return res;
}

function gridlandMetro(n, m, k, track) {
    let mapTrack = new Map();
    let result = BigInt(n) * BigInt(m);
    for (let t of track) {
        insertTrack(mapTrack, t);
    }
    mapTrack.forEach(row => {
        result -= calcTrack(row);
    })

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nmk = readLine().split(' ');

    const n = parseInt(nmk[0], 10);

    const m = parseInt(nmk[1], 10);

    const k = parseInt(nmk[2], 10);

    let track = Array(k);

    for (let i = 0; i < k; i++) {
        track[i] = readLine().split(' ').map(trackTemp => parseInt(trackTemp, 10));
    }

    let result = gridlandMetro(n, m, k, track);

    ws.write(result + "\n");

    ws.end();
}
