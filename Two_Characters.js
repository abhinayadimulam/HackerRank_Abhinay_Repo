function processData(input) {
    const chars = input.split('\n')[1].split('');
    
    const letters = new Set();
    for(const char of chars){
        letters.add(char);
    }
    let max = 0;
    for(const first of letters){
        for(const second of letters){
            if(first <= second){
                continue;
            }
            const filtered = chars.filter(char => (char === first || char === second));
            let last;
            let alternating = true;
            for(const char of filtered){
                if(last === char){
                    alternating = false;
                    break;
                }
                last = char;
            }
            const count = filtered.length;
            if(alternating && count > max){
                max = count;   
            }
        }
    }
    console.log(max);
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
