function processData(input) {
  input = input.split("\n");
  var n = Number(input[0]);
  var ct = new Array(100);
  var result = "";
  for (var i = 0; i < n/2; i++) {
    var curr = input[i + 1].split(" ");
    var x = Number(curr[0]);
    var s = "-";
    if (ct[x] === undefined) {
      ct[x] = [s];
    }
    else {
      ct[x].push(s);
    }
  }
  for (i = n/2; i < n; i++) {
    var curr = input[i + 1].split(" ");
    var x = Number(curr[0]);
    var s = curr[1];
    if (ct[x] === undefined) {
      ct[x] = [s];
    }
    else {
      ct[x].push(s);
    }
  }
  for (i = 0; i < 100; i++) {
    if (ct[i] !== undefined) {
      for (var j = 0; j < ct[i].length; j++) {
        result += ct[i][j] + " ";
      }
    }
  }
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
