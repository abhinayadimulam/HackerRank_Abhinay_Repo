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
    var n = parseInt(readLine());
    for (var a0 = 0; a0 < n; a0++) {
        var s = readLine();

        var cost = 0;
        var p = "";

        for (var str_index = 0; str_index < s.length; str_index++) {
            if (p.indexOf(s[str_index]) === -1) {
                cost = cost + 1;
            }
            p = p + s[str_index];
        }
        console.log(cost);
    }
}
