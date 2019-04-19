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

function main() {
    var q = parseInt(readLine());

    for (var a0 = 0; a0 < q; a0++) {
        var n = parseInt(readLine());
        var containers = [];
        var balls = [];
        for (var i = 0; i < n; i++) {
            containers[i] = 0;
            balls[i] = 0;
        }
        for (var i = 0; i < n; i++) {
            var row = readLine().split(' ');
            row = row.map(Number);

            for (var j = 0; j < row.length; j++) {
                containers[i] += row[j];
                balls[j] += row[j];
            }
        }
        containers.sort((a, b) => a - b);
        balls.sort((a, b) => a - b);

        var i = 0;
        for (; i < n; i++) {
            if (containers[i] !== balls[i]) break;
        }
        console.log(i === n ? 'Possible' : 'Impossible');
    }

}
