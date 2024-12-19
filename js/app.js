/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  
  /*---------------------------- Variables (state) ----------------------------*/
  let board; 
  let turn; 
  let winner; 
  let tie;
  
  /*------------------------ Cached Element References ------------------------*/
  const squareEls = document.querySelectorAll('.sqr');
  const messageEl = document.getElementById('message');
  const resetBtnEl = document.getElementById('reset');
  
  /*----------------------------- Event Listeners -----------------------------*/
  squareEls.forEach((square) => {
    square.addEventListener('click', handleClick);
  });
  resetBtnEl.addEventListener('click', init);
  
  /*-------------------------------- Functions --------------------------------*/
  function init() {
    board = ['', '', '', '', '', '', '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
  }
  
  function render() {
    updateBoard();
    updateMessage();
  }
  
  function updateBoard() {
    board.forEach((cell, index) => {
      const square = squareEls[index];
      square.textContent = cell;
    });
  }
  
  function updateMessage() {
    if (!winner && !tie) {
      messageEl.textContent = `It's ${turn}'s turn!`;
    } else if (!winner && tie) {
      messageEl.textContent = "It's a tie!";
    } else {
      messageEl.textContent = `Congratulations, ${turn} wins!`;
    }
  }
  
  function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id);
  
    
    if (board[squareIndex] || winner) return;
  
   
    placePiece(squareIndex);
  
    
    checkForWinner();
  
    
    checkForTie();
  
    
    switchPlayerTurn();
  
   
    render();
  }
  
  function placePiece(index) {
    board[index] = turn;
  }
  
  function checkForWinner() {
    winningCombos.forEach((combo) => {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = true;
      }
    });
  }
  
  function checkForTie() {
    if (winner) return;
    tie = board.every((cell) => cell !== '');
  }
  
  function switchPlayerTurn() {
    if (winner) return;
    turn = turn === 'X' ? 'O' : 'X';
  }
  
  
  init();
  