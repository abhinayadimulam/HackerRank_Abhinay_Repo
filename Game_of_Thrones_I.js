'use strict';


function processData(input) {
    var chars = {};
    var inputArr = String(input).trim().split("");
    var charKeys = [];
    var charIndex = 0;
    for (var arrCount = 0; arrCount < inputArr.length; arrCount++) {
        var currChar = inputArr[arrCount];

        if (chars.hasOwnProperty(currChar)) {
            chars[currChar] += 1;
        } else {
            charKeys[charIndex] = currChar;
            charIndex++;
            chars[currChar] = 1;
        }
    }

    var numOdd = 0;
    for (var x = 0; x < charKeys.length; x++) {
        if (chars[charKeys[x]] % 2 !== 0) {
            numOdd++;
        }
        if (numOdd > 1) break; //save cycles
    }

    if (numOdd > 1) {
        process.stdout.write("NO");
    } else {
        process.stdout.write("YES");
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) { _input += input; });
process.stdin.on("end", function () { processData(_input); });
