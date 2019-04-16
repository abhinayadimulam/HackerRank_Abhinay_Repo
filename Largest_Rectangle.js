process.stdin.resume();
process.stdin.setEncoding('ascii');

var stdin = "";
var stdin_array = "";
var currentline = 0;

process.stdin.on('data', function (data) {
    stdin += data;
});

process.stdin.on('end', function () {
    stdin_array = stdin.split("\n");
    main();
});

function readLine() {
    return stdin_array[currentline++];
}

function largestRectangle(h) {
    let maxH = Math.max(...h);
    let maxR = 0;
    for (let i = maxH; i > 0; i--) {
        let c = 0;
        for (let j of h) {
            if (j >= i) {
                c++;
            } else {
                maxR = Math.max(maxR, i * c);
                c = 0;
            }
        }
        if (c !== 0) {
            maxR = Math.max(maxR, i * c);
        }
    }
    return maxR;
}

function main() {
    var n = parseInt(readLine());
    h = readLine().split(' ');
    h = h.map(Number);
    var result = largestRectangle(h);
    process.stdout.write("" + result + "\n");

}
