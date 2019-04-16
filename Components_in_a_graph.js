function processData(input) {
    //Enter your code here
    let edges = input.split('\n').map(input => (input.split(' ')));
    let connectedComponents = [];
    for (let i = 1; i < edges.length; i += 1) {
        ccWithEdgeA = connectedComponents.find(cc => cc.has(edges[i][0]));
        ccWithEdgeB = connectedComponents.find(cc => cc.has(edges[i][1]));
        if ((ccWithEdgeA && ccWithEdgeB) && ccWithEdgeA !== ccWithEdgeB) {
            ccWithEdgeA.forEach(v => ccWithEdgeB.add(v));
            ccWithEdgeA.clear();
        } else if (ccWithEdgeA) {
            ccWithEdgeA.add(edges[i][1]);
        } else if (ccWithEdgeB) {
            ccWithEdgeB.add(edges[i][0]);
        } else {
            let newCC = new Set();
            newCC.add(edges[i][0]);
            newCC.add(edges[i][1]);
            connectedComponents.push(newCC)
        }
    }
    let min = Number.POSITIVE_INFINITY;
    let max = 0;
    for (let i = 0; i < connectedComponents.length; i += 1) {
        let ccSize = connectedComponents[i].size;
        if (ccSize > max) max = ccSize;
        if (ccSize != 0 && ccSize < min) min = ccSize;
    }
    console.log(min, max);

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
