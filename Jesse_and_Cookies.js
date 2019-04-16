function asc(a, b) {
    return a - b;
}

function insert(x, sorted) {
    var out = [], i, inserted = false;
    for (i = 2; i < sorted.length; i++) {
        if (sorted[i] < x) {
            out.push(sorted[i]);
        } else {
            out.push(x);
            while (i < sorted.length) {
                out.push(sorted[i]);
                i++;
            }
            inserted = true;
        }
    }
    if (!out.length || !inserted) {
        out.push(x);
    }
    return out;
}

function processData(input) {
    var n, k, a;
    input = input.split('\n');
    n = parseInt(input[0].split(' ')[0], 10);
    k = parseInt(input[0].split(' ')[1], 10);
    a = input[1].split(' ').map(function (x) {
        return parseInt(x, 10);
    }).sort(asc);
    var steps = 0, c, i, x;
    while (true) {
        if (a[0] >= k) return steps;
        if (n === 1 && a[0] < k) return -1;
        c = a[0] + 2 * a[1];
        a = insert(c, a);
        n--;
        steps++;
    }
}
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    console.log(processData(_input));
});
