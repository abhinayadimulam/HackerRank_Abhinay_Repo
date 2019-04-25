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

function maximumSum(a, m) {
  let b = new Array(a.length), z = -1;

  for (let i = 0; i < a.length; i++) {
    b[i] = 0;
  }

  for (let i = 0; i < a.length; ++i) {
    const n = a[i] % m;
      
    for (let j = 0; j <= i; j++) {
      b[j] += n;
      b[j] -= ((b[j] >= m) * m);

      if (b[j] > z) {
        z = b[j];
      }
    }
  }

  return z;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const nm = readLine().split(' ');

        const n = parseInt(nm[0], 10);

        const m = parseInt(nm[1], 10);

        const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

        let result = maximumSum(a, m);

        ws.write(result + "\n");
    }

    ws.end();
}
