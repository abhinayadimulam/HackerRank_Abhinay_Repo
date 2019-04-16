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


function main() {
    var g = parseInt(readLine());
    for(var a0 = 0; a0 < g; a0++){
      var n_temp = readLine().split(' ');
      var n = parseInt(n_temp[0]);
      var m = parseInt(n_temp[1]);
      var x = parseInt(n_temp[2]);
      var a = readLine().split(' ');
      a = a.map(Number);
      var b = readLine().split(' ');
      b = b.map(Number);
      
      var ai = 0;
      var bi = 0;
      var count = 0;
      var sum = 0;
      var maxCount = 0;
      
      while (sum + a[ai] <= x && ai < a.length) {
        sum += a[ai]
        ai++
      }
      maxCount = count = ai
      ai--
      while (ai >= 0 && bi < b.length) {
        while (sum + b[bi] <= x && bi < b.length) {
          sum += b[bi]
          bi++
          count++
        }
        if (count > maxCount) {
          maxCount = count
        }
        sum -= a[ai]
        ai--
        count--
      }
      console.log(maxCount)
    }

}
