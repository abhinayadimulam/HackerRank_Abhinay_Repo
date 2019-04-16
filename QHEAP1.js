function processData(input) {
    //Enter your code here
    let heap = [0];
    input = input.split('\n');
    for (var i = 1; i < input.length; i++) {
        if (input[i] === '3') {
            console.log(heap[1]);
        }
        if (input[i][0] === '1') {
            addToHeap(parseInt(input[i].split(' ')[1]));
        }
        if (input[i][0] === '2') {
            let num = parseInt(input[i].split(' ')[1]);
            let idx = heap.indexOf(num);
            if (idx > 0) {
                heap.splice(idx, 1);
                heap.shift();
                heap.sort((a, b) => {
                    return a - b;
                })
                heap.unshift(0);
            }
        }
    }

    function addToHeap(num) {
        let idx = heap.length;
        heap.push(num);
        let test = true;
        while (test) {
            let parent = Math.floor(idx / 2);
            let parentNum = heap[parent];
            if (heap[idx] < heap[parent]) {
                heap[parent] = heap[idx];
                heap[idx] = parentNum;
            } else {
                test = false;
            }
            idx = parent;
        }
    }
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
