function processData(input) {
    //Enter your code here
    var rows = input.split("\n");
    var nums1 = rows[0].split(' ');
    var nums2 = rows[1].split(' ');
    var nums3 = rows[2].split(' ');
    var nums = nums1.concat(nums2, nums3);
    nums = nums.map(Number);

    var total = 0;
    var i, j;
    var minTotal = 1000;
    var cost;
    var sq = [[4, 9, 2, 3, 5, 7, 8, 1, 6], [8, 3, 4, 1, 5, 9, 6, 7, 2], [6, 7, 2, 1, 5, 9, 8, 3, 4], [8, 1, 6, 3, 5, 7, 4, 9, 2],
    [2, 9, 4, 7, 5, 3, 6, 1, 8], [4, 3, 8, 9, 5, 1, 2, 7, 6], [2, 7, 6, 9, 5, 1, 4, 3, 8], [6, 1, 8, 7, 5, 3, 2, 9, 4]];
    for (i = 0; i < 8; i++) {
        total = 0;
        for (j = 0; j < 9; j++) {
            total = total + Math.abs(sq[i][j] - nums[j]);
        }
        if (total < minTotal) {
            minTotal = total;
        }
    }
    process.stdout.write(minTotal);
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
