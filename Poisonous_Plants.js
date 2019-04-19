function processData(input) {
    var lines = input.split("\n"),
        values = lines[1].split(" "),
        pesticides = [],
        day = 0,
        tmp,
        nbDied,
        i;

    lines.shift();

    for (i = 0; i < values.length; i += 1) {
        pesticides[i] = +values[i];
    }

    do {
        day++;
        nbDied = 0;
        tmp = [];
        for (i = pesticides.length - 1; i >= 0; i -= 1) {
            if (i === 0 || pesticides[i] <= pesticides[i - 1]) {
                tmp.push(pesticides[i]);
            } else {
                nbDied++;
            }
        }
        pesticides = tmp.reverse();
    } while (nbDied > 0);
    console.log(Math.max(0, day - 1));
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
