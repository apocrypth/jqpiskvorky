(function($, window, document, undefined) { //anonymous function, called immediately

	var defaultConfig = {
		startingPlayer : false,
		pl1symbol : 'X',
		pl2symbol : 'O',
		gridSize : 25,
		winLineLength : 5
	}

	var $button;
	var $turnAnnouncer;
	var canvas;
	var context;
	var end = false;
	var board = [];

	var turn;
	var pl1symbol;
	var pl2symbol;
	var size;
	var winLineLength;

	$.fn.Piskvorky = function(config) {
		var jqObj = this;

		Configure(config);
		
		jqObj.empty();
		
		$button = $('<button>New Game</button>');
		$turnAnnouncer = $('<p></p>');
		var $canvas = $('<canvas width="'+20*size+'" height="'+20*size+'"></canvas>');
		canvas = $canvas.get(0); //getting canvas from jquery object

		$button.appendTo(jqObj);
		$turnAnnouncer.appendTo(jqObj);
		$canvas.appendTo(jqObj);
		
		context = canvas.getContext('2d');

		$button.click(function(){
			NewGame();
		});

		$canvas.mousedown(function myDown(e){
			if (end == true) {
				return;
			}

			var position = $canvas.position();
			var x = e.pageX-position.left;
			var y = e.pageY-position.top;
			var j = (x / 19) >> 0; //division without remainder
			var i = (y / 19) >> 0;

			if (board[i][j] == 0){
				board[i][j] = GetActualPlayerSymbol();
				RenderField(i,j);
				turn = !turn;
				SetTurnAnnouncer();
				CheckWinner();
			}
		});

		return this;
	}

	function Configure(config) {
		$.extend(true, defaultConfig, config);
		turn = defaultConfig.startingPlayer;
		pl1symbol = defaultConfig.pl1symbol;
		pl2symbol = defaultConfig.pl2symbol;
		size = defaultConfig.gridSize;
		winLineLength = defaultConfig.winLineLength;
	};

	function RenderBoard(board){
		context.clearRect(0, 0, canvas.width, canvas.height);
		//grid
		context.beginPath();
		for (var i=0; i<size+1; i++){
			context.moveTo(i*19+1, 0);
			context.lineTo(i*19+1, 477);
			context.moveTo(0, i*19+1);
			context.lineTo(477, i*19+1);
		}
		context.stroke();
	}

	function RenderField(i,j){ //to put just a players symbol into board
		if (board[i][j] == pl1symbol) {
			context.fillText(pl1symbol, j*20 + 4-j, (i+1)*20-2-i);	//shifts are due to size of letter X (i,j reversed)
		}
		else if (board[i][j] == pl2symbol) {
			context.fillText(pl2symbol, j*20 + 3-j, (i+1)*20-2-i);	//shifts are due to size of letter O (i,j reversed)
		}
	}

	function SetTurnAnnouncer(){ //just telling whose move is now
		$turnAnnouncer.html('Na tahu je: '+GetActualPlayerSymbol());
	}

	function GetActualPlayerSymbol(){
		if (turn == true) {
			return pl1symbol;
		}
		else
			return pl2symbol;
	}

	function GetSymbol(input){
		if (input == 1){
			return pl1symbol;
		}
		else if (input == 2) {
			return pl2symbol;
		}
		else {
			return '';
		}
	}

	function AnnounceWinner(w){ //end game function, announcing winner
		end = true;
		alert('Vyhral '+GetSymbol(w));
	}

	function NewGame(){ //resetting game/starting new game
		board = [];
		turn = defaultConfig.startingPlayer;
		end = false;

		context.font = '18pt Calibri';
		context.fillStyle = 'black';

		for (var i = 0; i < size; i++) {
			board[i] = [];
			for (var j = 0; j < size; j++) {
				board[i][j] = 0;
			}
		};

		RenderBoard(board);
		SetTurnAnnouncer();
	}

	function CheckWinner(){ //function for checking the winner
		//rows + columns checker
		var tmp = '';
		var pl1 = '';
		var pl2 = '';

		for (var i=0; i<winLineLength; i++){
			pl1 += pl1symbol;
			pl2 += pl2symbol;
		}
		for (var i=0; i<size; i++){
			tmp = board[i].join('');
			if (tmp.indexOf(pl1) >=0) {
				AnnounceWinner(1);
				return;
			}
			else if (tmp.indexOf(pl2) >=0) {
				AnnounceWinner(2);
				return;
			}
			tmp = '';
			for (var j=0; j<size;j++){ //for columns are i,j swapped, to have for every X[i] coordinate checked all Y[j] coordinates
				tmp += board[j][i];
			}
			if (tmp.indexOf(pl1) >=0) {
				AnnounceWinner(1);
				return;
			}
			else if (tmp.indexOf(pl2) >=0) {
				AnnounceWinner(2);
				return;
			}
		}
		//diagonal checker
		var m = size;
		var n = size;
		//  \ 
		for (var i = 1 - m; i < n; i++) {
			tmp = '';
			for (var j = 0; j < m; j++) {
				if (board[j][i + j] !== undefined) {
				tmp +=(board[j][i + j]);
				}
			}
			if (tmp.indexOf(pl1) >=0) {
				AnnounceWinner(1);
				return;
			}
			else if (tmp.indexOf(pl2) >=0) {
				AnnounceWinner(2);
				return;
			}
		}
		//  /
		for (var i = 0; i < m + n - 1; i++) {
			tmp = '';
			for (var j = 0; j < n; j++) {
				if (board[j][i - j] !== undefined) {
					tmp +=(board[j][i - j]);
				}
			}
			if (tmp.indexOf(pl1) >=0) {
				AnnounceWinner(1);
				return;
			}
			else if (tmp.indexOf(pl2) >=0) {
				AnnounceWinner(2);
				return;
			}
		}
	}
})(jQuery, window, document);