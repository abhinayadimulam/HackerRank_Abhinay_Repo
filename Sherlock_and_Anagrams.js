process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

function sherlockAndAnagrams(s) {
    let hash = {};
    let count = 0;
    for (let start = 0; start < s.length; start++) {
        for (let end = start + 1; end <= s.length; end++) {
            let ordered = s.substring(start, end).split('').sort().join('');
            if (ordered in hash) {
                count += hash[ordered];
                hash[ordered]++;
            } else {
                hash[ordered] = 1;
            }
        }
    }
    return count;
}

function main() {
    var q = parseInt(readLine());
    for (var a0 = 0; a0 < q; a0++) {
        var s = readLine();
        var result = sherlockAndAnagrams(s);
        process.stdout.write("" + result + "\n");
    }

}
