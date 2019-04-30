function processData(input) {
    var a1 = input.split("\n");
    var a2 = a1[0].split(" ").map(Number);
    var n = a2[0];
    var d = a2[1];
    var a = a1[1].split(" ").map(Number);
    var e = [];
    var m = 0;

    for (var i = 0; i < n; i++) {
        if (i >= d) {
            var sum = 0;
            var x = 0, y = 0;
            for (var j = 0; j < e.length; j++) if (e[j]) {
                sum += e[j];
                // console.log(sum, ((d-1)-(d-1)%2)/2, ((d-1)+(d-1)%2)/2);
                if (!x && sum - 1 >= ((d - 1) - (d - 1) % 2) / 2) {
                    x = j;
                }
                if (!y && sum - 1 >= ((d - 1) + (d - 1) % 2) / 2) {
                    y = j;
                }
            }
            if (a[i] >= x + y) {
                m++;
            }
            e[a[i - d]]--;

        }
        if (!e[a[i]]) e[a[i]] = 1; else e[a[i]]++;
    }
    console.log(m);
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
