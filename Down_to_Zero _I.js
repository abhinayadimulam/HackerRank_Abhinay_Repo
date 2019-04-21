function processData(input) {
    'use strict';
    let nums = input.split('\n').slice(1);
    let sieve = [0];
    for (let i = 1; i <= 1e6; i++) {
        sieve[i] = sieve[i-1] + 1;
        for (let j = 2; j <= Math.floor(Math.sqrt(i)); j++) {
            if (i % j === 0 && sieve[Math.round(i/j)] < sieve[i]) { sieve[i] = sieve[Math.round(i/j)] + 1; }
        }
    }
    for (let i = 0; i < nums.length; i++) console.log(sieve[nums[i]]);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
