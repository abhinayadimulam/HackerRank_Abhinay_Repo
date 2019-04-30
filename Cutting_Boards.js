var p = Math.pow(10, 9) + 7;

function int(str) {
    return parseInt(str, 10);
}

function solve(x, y) {
    x.sort(function(a, b) { return a - b });
    y.sort(function(a, b) { return a - b });
    var sum = 0,
        xsum = 0,
        ysum = 0;
    while (x.length + y.length > 0) {
        var a = x.length > 0 ? x[0] : Infinity;
        var b = y.length > 0 ? y[0] : Infinity;
        if (a < b) {
            x.shift();
            xsum = (xsum + a) % p;
            sum = (sum + ysum + a) % p;
        } else {
            y.shift();
            ysum = (ysum + b) % p;
            sum = (sum + xsum + b) % p;
        }
    }
    return sum;
}

function processData(input) {
    var lines = input.trim().split('\n');
    var t = int(lines.shift());
    while (t > 0) {
        lines.shift();
        var y = lines.shift().split(' ').map(int);
        var x = lines.shift().split(' ').map(int);
        console.log(solve(x, y));
        t -= 1;
    }
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