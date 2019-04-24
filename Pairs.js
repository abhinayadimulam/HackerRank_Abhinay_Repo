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

function pairs(k, arr) {
    // Complete this function
    var i = 0, j = 1, count = 0;
    var newarr = arr.sort((a, b) => a - b);
    while (j < newarr.length) {
        var diff = newarr[j] - newarr[i];

        if (diff == k) {
            count++;
            j++;
        } else if (diff > k) {
            i++;
        } else if (diff < k) {
            j++;
        }
    }
    return count
}

function main() {
    var n_temp = readLine().split(' ');
    var n = parseInt(n_temp[0]);
    var k = parseInt(n_temp[1]);
    arr = readLine().split(' ');
    arr = arr.map(Number);
    var result = pairs(k, arr);
    process.stdout.write("" + result + "\n");

}
