function processData(input) {
    const charCount = new Array(26).fill(0);
    
    const a = 'a'.charCodeAt(0);
    for (let i = 0; i < input.length; i++) {
        charCount[input.charCodeAt(i) - a]++;
    }
    
    const charRepeats = [];
    
    for (let i = 0; i < charCount.length; i++) {
        if (charCount[i] !== 0) {
            charRepeats[charCount[i]] = charRepeats[charCount[i]] ? charRepeats[charCount[i]] + 1 : 1;
        }
    }
    
    let maxCount = 0;
    let maxIndex = 0;
    charRepeats.forEach((count, index) => {
        if (maxCount < count) {
            maxCount = count;
            maxIndex = index;
        }
    });
    
    let removes = 0;
    charRepeats.forEach((count, index) => {
        removes += Math.min(Math.abs(count * (index - maxIndex)), count);
    });
    
    if (removes === 1 || removes === 0) {
        console.log('YES');
    } else {
        console.log('NO');
    }
    
    //Enter your code here
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
