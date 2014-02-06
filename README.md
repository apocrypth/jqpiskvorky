jqpiskvorky
===========

just simple 5 in row (gomoku) game

All you need to be able to include this game is this:


<div id="jqpContainer">
</div>

<script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
<script src="js/jqpiskorky.js"></script>

<script type="text/javascript">
	$( "#jqpContainer" ).Piskvorky({
		pl1symbol : "X", //1st player symbol (feel free to change it, but it could cause misalignment in grid)
		pl2symbol : "O", //2nd player symbol (feel free to change it, but it could cause misalignment in grid)
		gridSize : 25, // size of square grid for the game
		startingPlayer : true, //true = 1st player starts, false = 2nd player starts
		winLineLength : 5 //how many symbols player have to put in line to win
	});
</script>

