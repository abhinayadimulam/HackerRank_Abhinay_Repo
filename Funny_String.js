function processData(input) {
    var l;
    var s_i, s_i_1, r_i, r_i_1;
    var lines = input.split("\n");
    var number_of_lines = lines[0];

    a: for (var i = 1; i <= number_of_lines; i++) {
        l = lines[i];
        for (var j = 1; j < l.length / 2; j++) {
            s_i = l.charCodeAt(j);
            s_i_1 = l.charCodeAt(j - 1);
            r_i_1 = l.charCodeAt(l.length - j - 1);
            r_i = l.charCodeAt(l.length - j);
            if (Math.abs(s_i - s_i_1) !== Math.abs(r_i - r_i_1)) {
                console.log("Not Funny");
                continue a;
            }
        }
        console.log("Funny")
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
