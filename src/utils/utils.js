const winArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function isWinning(cellsArray) {
    for (let i = 0; i < winArr.length; i++) {
        const [a, b, c] = winArr[i];
        if (cellsArray[a] && cellsArray[a] === cellsArray[b] && 
            cellsArray[a] === cellsArray[c]) {
                return [a, b, c];
            }
    }
    return false;
}

function newCellsArray(arr, target, currentChar) {
    return arr.slice(0, target).concat(currentChar).concat(arr.slice(target + 1))
}

function checkWinOnTurn(board, action) {
  let plays = board.reduce((a, e, i) => {
    return (e === action) ? a.concat(i) : a;
  }, []);
  let gameWon = false;
  for (let [index, win] of winArr.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = {
        index: index,
        action: action
      };
      break;
    }
  }
  return gameWon;
}

function minimax(newBoard, action) {
    let availableSpots = newBoard.filter(cell => typeof cell === 'number')
  
    if (checkWinOnTurn(newBoard, 'X')) {
      return { score: -10 }
    } else if (checkWinOnTurn(newBoard, 'O')) {
      return { score: 10 }
    } else if (availableSpots.length === 0) {
      return { score: 0 }
    }
  
    let moves = [];
  
    for (let i = 0; i < availableSpots.length; i++) {
      let move = {};
      move.index = newBoard[availableSpots[i]];
      newBoard[availableSpots[i]] = action;
  
      if (action === 'O') {
        let result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        let result = minimax(newBoard, 'O');
        move.score = result.score;
      } // end of if/else block
  
      newBoard[availableSpots[i]] = move.index;
      moves.push(move);
    } // end of for look
  
    let bestMove;
  
    if (action === 'O') {
      let bestScore = -10000;
      for (let i=0; i<moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      } // end of for loop
    } 
    else {
      let bestScore = 10000;
      for (let i=0; i<moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
  
    return moves[bestMove];
  }

export {isWinning, newCellsArray, minimax}