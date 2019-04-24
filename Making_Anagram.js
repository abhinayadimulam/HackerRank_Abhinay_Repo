function countChars (string) {
	var result = {};

	for (var i = string.length - 1; i >= 0; i--) {
		result[string[i]] = typeof result[string[i]] === 'undefined' ? 1 : result[string[i]]+1;
	}
	return result;
}

function countDeletions (input) {
	var result = 0;
	for (var v in input) {
		result += Math.abs(input[v]);
	}
	return result;
}

function processData (input) {
	input = input.split('\n');
	var line1 = input[0],
		line2 = input[1],
		line1Chars = countChars(line1)
		result = 0;

	for (var i = line2.length - 1; i >= 0; i--) {
		if ( typeof line1Chars[line2[i]] === 'undefined') result++;
		else --line1Chars[line2[i]];
	}

	result += countDeletions(line1Chars);
	console.log(result);
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
