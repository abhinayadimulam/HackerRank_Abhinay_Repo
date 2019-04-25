function processData(input) {
    var prices = (input.split('\n')[1]).split(' ');
    function compFunc(a, b) {
        return a - b;
    }
    var sortPrices = prices.slice(0);
    sortPrices.sort(compFunc);
    var minLoss = sortPrices[0];
    for (var i = 1; i < sortPrices.length; i++) {
        if (sortPrices[i] - sortPrices[i - 1] < minLoss &&
            prices.indexOf(sortPrices[i]) < prices.indexOf(sortPrices[i - 1])) {
            minLoss = sortPrices[i] - sortPrices[i - 1];
        }
    }
    console.log(minLoss);
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
