function check(grid, checked, i, j) {
  if(i < 0 || j < 0 || i >= grid.length || j >= grid[i].length) return 0;
  if(checked[i][j] || !grid[i][j]) return 0;
  checked[i][j] = true;
  return 1
    + check(grid, checked, i-1, j-1)
    + check(grid, checked, i-1, j)
    + check(grid, checked, i-1, j+1)
    + check(grid, checked, i, j-1)
    + check(grid, checked, i, j)
    + check(grid, checked, i, j+1)
    + check(grid, checked, i+1, j-1)
    + check(grid, checked, i+1, j)
    + check(grid, checked, i+1, j+1);
}

function processData(input) {
  var grid = input.split('\n').slice(2);
  for(var i=0; i<grid.length; i++) grid[i] = grid[i].split(' ').map(Number);
  var checked = grid.map(function(r) {
    return r.map(function(){return false});
  });
  
  var max = 0;
  for(var i=0; i<grid.length; i++) {
    for(var j=0; j<grid[i].length; j++) {
      max = Math.max(max, check(grid, checked, i, j));
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
