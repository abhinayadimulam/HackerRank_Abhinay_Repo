process.stdin.resume();
process.stdin.setEncoding("ascii");
process.stdin.on("data", function (input) {
    var lines = input.split("\n");
    lines.shift();
    var ar = lines[0].split(" ");

    console.log(partition(ar).join(" "));
});

function partition(ar) {
    var p = ar.shift();

    var left = [], right = [];

    for (var i = 0; i < ar.length; i++) {
        if (parseInt(ar[i]) < parseInt(p))
            left.push(ar[i])
        else
            right.push(ar[i])
    }
    return left.concat([p]).concat(right);
}