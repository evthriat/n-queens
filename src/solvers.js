/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n, index, row, solution, count) {
  solution = solution || new Board({n: n});
  count = count || 0;
  index = index || 0;
  row = row || 0;
  //console.log('solution:', solution)

  solution.togglePiece(row, index);               //toggle rock on row and index
  if (solution.hasAnyRooksConflicts() === true) { //if toggled rook creates a conflict
    solution.togglePiece(row, index);               //toggle rook off row and index
    //console.log(row, index)
    index++;                                      //move to next index
    if (index >= n) {
      index = index - n;                          //if index is larger than board, start back at 0
    }
    return findNRooksSolution(n, index, row, solution, count);  //call recursively on same row, next index
  }
  
  if (row === n - 1) {                                //if board is full return solution
    return solution;
  }

  if (index > n) {                                //if index is larger than board, start back at 0;
    index = index - n;
  }
  row++;                                          //no conflicts, so move to the next row
  // if (row > n) {
  //   row = row - n;
  // }
  return findNRooksSolution(n, 0, row, solution, count);  //call recursively on index 0, next row
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutionCount = 0; //fixme
  // create for loop to increment over index
  //for (var r = 0; r < n; r++) {
    // create another loop for row
  for (var i = 0; i < n; i++) {
      //call findNrooks rooks solutions on     
      // if solution found increment solutionCount
    if (i === 1 && n === 4) {
      debugger;
    }
      //console.log("Solution: ", findNRooksSolution(n, i, r));
    if (findNRooksSolution(n, i, 0)) {
      solutionCount++;
      console.log('solutionCount: ', solutionCount);
    }
    //}
  }
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
