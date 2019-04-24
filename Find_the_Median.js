function getMedian(input) {
    var midPoint = Math.floor(input.length / 2);
    return partitionMiddle(input, 0, input.length - 1)[midPoint];
}
function partitionMiddle(input, bottom, top) {
    if (bottom >= top) return input;
    var pivot = top;
    var low = bottom;
    for (var sentinel = low + 1; sentinel < top; sentinel++) {
        if (input[sentinel] < input[pivot]) {
            swap(input, sentinel, low);
            low++;
        }
    }

    swap(input, ++low, pivot);

    var midPoint = Math.floor(input.length / 2);
    if (low === midPoint) return input;
    if (low < midPoint) return partitionMiddle(input, low + 1, top);
    return partitionMiddle(input, bottom, low - 1);

}
function swap(input, x, y) {
    var temp = input[x];
    input[x] = input[y];
    input[y] = temp;
}
function processData(input) {
    input =input.split('\n')[1].split(' ').map(function (val) { return parseInt(val, 10); });

    process.stdout.write(getMedian(input) + '\n');
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
