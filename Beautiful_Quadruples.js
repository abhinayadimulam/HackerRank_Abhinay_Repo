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
    var A_temp = readLine().split(' ');
    var A = parseInt(A_temp[0]);
    var B = parseInt(A_temp[1]);
    var C = parseInt(A_temp[2]);
    var D = parseInt(A_temp[3]);

    const [a, b, c, d] = [A, B, C, D].sort((a, b) => { if (a < b) { return -1; } else if (a > b) { return 1; } return 0; });

    let quadruplets = -1 / 24 * a * (a * a * a - 2 * a * a * (2 * d + 3) + a * (-6 * c * c + 6 * c * (2 * d + 1) + 12 * d + 11) - 2 * (2 * b * b * b - 6 * b * b * (d + 1) + b * (-6 * c * c + 12 * c * d + 6 * c + 6 * d + 4) - 3 * c * c + 6 * c * d + 3 * c + 4 * d + 3));

    const memo = {};

    for (let w = 1; w <= a; ++w) {
        for (let x = w; x <= b; ++x) {
            const wx = w ^ x;
            let map = memo[wx];

            if (!map) {
                map = {};

                let runningTotal = 0;
                for (let y = c; y >= 1; --y) {
                    const wxy = wx ^ y;

                    if (y <= wxy && wxy <= d) {
                        map[y] = runningTotal++ + 1;
                    } else {
                        map[y] = runningTotal;
                    }
                }
                memo[wx] = map;
            }

            quadruplets -= map[x];
        }
    }

    console.log(Math.round(quadruplets));
}
