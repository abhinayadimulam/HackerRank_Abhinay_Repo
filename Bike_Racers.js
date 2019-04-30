
function findClosestPairs(bikers, bikes) {
    var closestBikerIndex = -1;
    var closestBikeIndex = -1;
    var closestDistanceSquared = -1;
    for (var bikerIndex = 0; bikerIndex < bikers.length; ++bikerIndex) {
        var bikerCoords = bikers[bikerIndex];
        for (var bikeIndex = 0; bikeIndex < bikes.length; ++bikeIndex) {
            var bikeCoords = bikes[bikeIndex];
            var xDiffSquared = bikeCoords.x - bikerCoords.x;
            xDiffSquared = xDiffSquared * xDiffSquared;
            var yDiffSquared = bikeCoords.y - bikerCoords.y;
            yDiffSquared = yDiffSquared * yDiffSquared;
            var distanceSquared = xDiffSquared + yDiffSquared;
            if (closestDistanceSquared < 0 || distanceSquared < closestDistanceSquared) {
                closestBikerIndex = bikerIndex;
                closestBikeIndex = bikeIndex;
                closestDistanceSquared = distanceSquared;
            }
        }
    }
    return {
        bikerIndex: closestBikerIndex,
        bikeIndex: closestBikeIndex,
        distanceSquared: closestDistanceSquared
    };
}

function processData(input) {
    var lines = input.split('\n').map((line) => {
        var words = line.split(' ').map((word) => {
            if (isNaN(parseInt(word))) {
                return word;
            }
            return parseInt(word);
        });
        return words;
    });
    var n = lines[0][0];
    var m = lines[0][1];
    var k = lines[0][2];
    var bikers = new Array(n);
    var bikes = new Array(m);
    for (var i = 0; i < n; ++i) {
        bikers[i] = { x: lines[1 + i][0], y: lines[1 + i][1] };
    }
    for (var i = 0; i < m; ++i) {
        bikes[i] = { x: lines[1 + i + n][0], y: lines[1 + i + n][1] };
    }
    var maxBikerDistance = -1;
    while (k !== 0) {
        var closestPair = findClosestPairs(bikers, bikes);
        if (closestPair.distanceSquared > maxBikerDistance) {
            maxBikerDistance = closestPair.distanceSquared;
        }
        k--;
        bikers.splice(closestPair.bikerIndex, 1);
        bikes.splice(closestPair.bikeIndex, 1);
    }
    console.log(maxBikerDistance);
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
