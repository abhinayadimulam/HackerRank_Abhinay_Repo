function processData(input) {
    input = input.split('\n').splice(1);
    var pairs = [];

    for (var i = 0; i < input.length; i += 2) {
        pairs.push([input[i], input[i + 1]]);
    }

    for (var i = 0; i < pairs.length; i++) {
        var res = 'NO';
        for (var j = 0; j < pairs[i][0].length; j++) {
            if (pairs[i][1].indexOf(pairs[i][0][j]) > -1) {
                res = 'YES';
            }
        }
        console.log(res);
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
