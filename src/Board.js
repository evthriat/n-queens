// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },

    /*
    Specification:
      Input: 
      Output:
      Side effects (does running this function change anything): 
      Edge Cases: 
    Justification (Why woud you call this function?): 
    Explanation (relation between inputs/outputs/side effects):
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
    /*
    Specification:
      Input: a number that represents row
      Output: boolean
      Side effects (does running this function change anything): none
      Edge Cases: input value that is incorrect or doesn't exist
    Justification (Why woud you call this function?): call it to see if there are conflicts
    Explanation (relation between inputs/outputs/side effects):
    Viz (draw it):
    Approximation (psuedocode) :
    Verfication (go through with example data):
    Implementation (code it):
    */
    //console.log("board console log: ", this.Board(rowIndex));
    // console.log("this CONSOLE LOG: ", this.attributes[rowIndex]); // board.attributes[rowIndex]
      var row = this.attributes[rowIndex];
    // method will act on board
    // inside board look at specific index
    // the element at the index will be an array
      var count = 0;
    // traverse array
      return row.reduce(function(conflict, space) {
      // count the number of 1's
        if (space === 1) {
          count++;
        }
        // if there's more than one '1'
        if (count > 1) {
          // return false
          conflict = true;
        }
        // otherwise
        return conflict;
      }, false);
      
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.attributes;

      for (var key in rows) {
        if (Array.isArray(rows[key])) {
          if (this.hasRowConflictAt(key)) {
            return true;
          }
        }     
      }
      return false;
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // pull in entire array
      var columns = this.attributes;
      var count = 0;
      // look at each array at index column
      for (var key in columns) {
        if (Array.isArray(columns[key])) {
          if (columns[key][colIndex] === 1) {
            count++;
          }
        }
        if (count > 1) {
          return true;
        }
        // count each item
          // if more than 1
            // return true
      }

      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var col = this.attributes;

      for (var key in col) {
        if (Array.isArray(col[key])) {
          if (this.hasColConflictAt(key)) {
            return true;
          }
        }     
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var diagonals = this.attributes;

      // if the MDCAFR index equals 0
      var isTopLeft = majorDiagonalColumnIndexAtFirstRow === 0 ? true : false;
        // the increment up as we move down the array
      // if not zero
      var index = majorDiagonalColumnIndexAtFirstRow;
        // then decrement the index value down the array
      // create count variable that equals 0
      var count = 0;
      // loop over each array in diagonals object
      for (var key in diagonals) {
        // if count is greater than 1
        if (Array.isArray(diagonals[key])) {
          if (diagonals[key][index] === 1) {
            count++;
          }
        }
        if (count > 1) {
          // return true
          return true;
        }
        isTopLeft ? index++ : index--;
      }






      // var leftCount = 0;
      // var rightCount = 0;
      // // look at each array at index column

      // //if majorDiango...index === 0
      //   //
      // for (var key in diagonals) {
      //   var leftIndex = parseInt(key);
      //   var rightIndex = diagonals['n'] - 1 - parseInt(key);
      //   console.log('leftIndex: ', leftIndex, 'rightIndex: ', rightIndex);
      //   if (Array.isArray(diagonals[key])) {
      //     if (diagonals[key][leftIndex] === 1) {
      //       leftCount++;
      //     }
      //     if (diagonals[key][rightIndex] === 1) {
      //       rightCount++;
      //     }
      //   }
      //   if (leftCount > 1 || rightCount > 1) {
      //     return true;
      //   }
      //   // count each item
      //     // if more than 1
      //       // return true
      // }

      // return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      console.log(this.hasMajorDiagonalConflictAt())
      return this.hasMajorDiagonalConflictAt(); // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
