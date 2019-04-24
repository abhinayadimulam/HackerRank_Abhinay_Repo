function processData(input) {
    input = input.split('\n');
    var t = Number(input.shift());
    for (var i = 0; i < t; i++) {
        var n = Number(input.shift());
        var a = input.shift().split(' ').map(function (a) {
            return Number(a);
        });
        var sumleft = [], sumright = [];
        for (var j = 0; j < n; j++) {
            sumleft.push(j > 0 ? sumleft[j - 1] + a[j] : a[j]);
            sumright.push(j > 0 ? sumright[j - 1] + a[n - j - 1] : a[n - j - 1]);
        }
        for (var j = 0; j < n; j++) {
            if (sumleft[j] == sumright[n - j - 1]) {
                console.log('YES');
                break;
            }
        }
        if (j == n) console.log("NO");
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