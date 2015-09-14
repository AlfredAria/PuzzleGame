var colors = ["white", "red", "blue", "green",
				"yellow", "aqua", "grey",
				"orange", "purple"];
	
var Piece = React.createClass({
	render: function () {
		var style = {
			"background-color" : colors[this.props.value]
		};
		return (
			<div className="piece" style={style}>
				{this.props.value}
			</div>
		);
	}
});

/*
	This class includes the data structure
*/
var Board = React.createClass({
	render: function () {
    	return (
			<div className="board">
				{this.state.layoutPieces}
			</div>
		);
	},
	/*
		UI components
	*/
	boardPieces: [
    		<Piece value='0' />,                                               
			<Piece value='1' />, <Piece value='2' />, <Piece value='3' />,
			<Piece value='4' />, <Piece value='5' />, <Piece value='6' />,
			<Piece value='7' />, <Piece value='8' />],
	/*
		Update Model -> View
		Takes the array and updates the UI (Blocks)
	*/
	updateUIHelper: function(array) {
		return array.map((item, index) => {
					return this.boardPieces[item];
				});
	},
	/*
		The board is initialized,
		the view (layoutPieces) is initialized
	*/
	getInitialState: function () {
		var array = shuffle([1,2,3,4,5,6,7,8,0]);
		return {
			movement: 0,
			dataModel: array,
			layoutPieces: this.updateUIHelper(array)
		};
	},
	/*
		Start a new game by shuffling the array
		and clearing the movements
	*/
	reset: function () {
		var array = shuffle([1,2,3,4,5,6,7,8,0]);
		this.setState({
			movement: 0,
			dataModel: array,
			layoutPieces: this.updateUIHelper(array)
		});	
	},
	/*
		Move the blocks on a given velocity.
		x is positive on the right,
		y is positive on the top.
	*/
	move: function(vx, vy) {
		var blankLocation = 0;
		for (var i = 0; i < 9; i ++) {
			if (this.state.dataModel[i] === 0) {
				blankLocation = i;
				break;
			}			
		}
		/*
			It makes sense for only the following cases
		*/
		console.log("0 at " + blankLocation + "Moving!");
		if (vx == 1) {
			if (blankLocation % 3 != 2)
				this.swap(blankLocation, blankLocation + 1);
		} else if (vx == -1) {
			if (blankLocation % 3 != 0)
				this.swap(blankLocation, blankLocation - 1);
		} else if (vy == 1) {
			if (Math.floor(blankLocation / 3) != 2)
				this.swap(blankLocation, blankLocation + 3);
		} else if (vy == -1) {
			if (Math.floor(blankLocation / 3) != 0)
				this.swap(blankLocation, blankLocation - 3);
		} else {
			// Don't know what to do
		}
		var nextMove = this.state.movement + 1;
		var array = this.state.dataModel;
		this.setState({
			movement: nextMove,
			layoutPieces: this.updateUIHelper(array)
		});
	},
	/*
		Helper function to swap two blocks
	*/
	swap: function(i, j) {
		var t = this.state.dataModel[i];
		this.state.dataModel[i] = this.state.dataModel[j];
		this.state.dataModel[j] = t;
	},
	/*
		Checks if the user has won the game
	*/
	hasWon: function() {
		for (var i = 0; i < 8; i ++)
			if (i + 1 !== this.state.dataModel[i])
				return false;
		return true;
	}
});

/* 
	Shuffle an array
*/
var shuffle = function (arr) {
	var len = arr.length;
	for (var i = len - 1; i >= 0; i --) {
		var j = Math.floor(Math.random() * i);
		var t = arr[i];
		arr[i] = arr[j];
		arr[j] = t;
	}
	return arr;
}

var boardInstance = React.render(<Board />, document.getElementById("content"));

