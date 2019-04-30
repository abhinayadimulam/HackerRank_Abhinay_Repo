process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}
var BigNumber = require('bignumber.js');

function main() {
    var q = parseInt(readLine());
    for (var a0 = 0; a0 < q; a0++) {
        var s = readLine();
        var flag = true;

        for (let len = 1; len < s.length - 1; len++) {
            var first = new BigNumber(s.substr(0, len));
            var num = new BigNumber(s.substr(0, len));

            if (s.length <= len) {
                continue;
            }
            var sNew = ''.concat(first.toString());

            while (sNew.length < s.length) {
                num = num.add(1);
                sNew = sNew.concat(num.toString());
            }
            if (sNew === s) {
                console.log('YES ' + first);
                flag = false;
                continue
            }
        }

        if (flag) {
            console.log('NO')
        }
    }

}
