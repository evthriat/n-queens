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



window.findNRooksSolution = function(n, index, row, solution) {
  solution = solution || new Board({n: n});           // the board we are testing
  //count = count || 0;                                 //number of rooks on board (not used yet)
  index = index || 0;                                 //index we are modifying and checking
  row = row || 0;                                     //row we are modifying and checking
  //console.log('solution:', solution)
  //if(row === 0) then index === rowOneIndex
  solution.togglePiece(row, index);                   //toggle rock on row and index
  if (solution.hasAnyRooksConflicts() === true) {     //if toggled rook creates a conflict
    solution.togglePiece(row, index);                 //toggle rook off row and index
    //console.log(row, index)
    index++;                                          //move to next index
    if (index >= n) {
      index = index - n;                              //if index is larger than board, start back at 0
    }
    return findNRooksSolution(n, index, row, solution);  //call recursively on same row, next index
  }
  
  if (row === n - 1) {

    var solutionArr = [];
    for (var i = 0; i < n; i++) {
      solutionArr.push(solution.attributes[i]);
    }                          //if board is full return solution
    console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solutionArr));
    return solutionArr;
  }

  if (index > n) {                                    //if index is larger than board, start back at 0;
    index = index - n;
  }
  row++;                                              //no conflicts, so move to the next row
  // if (row > n) {
  //   row = row - n;
  // }
  
  return findNRooksSolution(n, 0, row, solution);  //call recursively on index 0, next row

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var testBoard = new Board({n: n});
  var rowTest = 0;
  // while (rowTest < n) {
  //   for (var i = 0; i < n; i++) {
  //     testBoard.toggle(rowTest, i);
      
  //   }
  // }

  var lookRecursilvey = function(row) {
    if (row === n) {                    //if the row is n, valid solution
      solutionCount++;                  //increment solutionCount up
      return;                           //return solution
    }
    for (var i = 0; i < n; i++) {       //increment up looking at every index
      testBoard.togglePiece(row, i);    //toggle piece on
      if (!testBoard.hasAnyRooksConflicts()) {  //check if valid solution
        lookRecursilvey(row + 1);               //look at next value
      }
      testBoard.togglePiece(row, i);          //toggle piece off
    }
  };
  lookRecursilvey(0);                         //look recursively starting at 0
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);


  //alternate solution, compute factorial n
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var oddIndex = 0;
  var evenIndex = 1;
  var solutionArr = [];
  if (n === 0) {
    return {n: 0};
  }
  if (n === 1) {
    solution.togglePiece(0, 0);
    return [solution.attributes[0]];
  }
  if (n % 2 === 0) {
    for (var i = 0; i < n; i++) {
      solution.togglePiece(i, evenIndex);
      evenIndex += 2;
      if (evenIndex > n) {
        evenIndex = 0;
      }
    }
  } else if (n % 2 !== 0) {
    for (var r = 0; r < n; r++) {
      solution.togglePiece(r, oddIndex);
      oddIndex += 2;
      if (oddIndex > n) {
        oddIndex = 1;
      }
    }
  }
  for (var j = 0; j < n; j++) {
    solutionArr.push(solution.attributes[j]);
  }
  //console.log(solutionArr)
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solutionArr));
  return solutionArr;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme
  
  var recursiveLook = function(row) {
    if (row === n) {
      
    }
  };


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
