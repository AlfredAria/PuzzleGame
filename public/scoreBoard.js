var ScoreBoard = React.createClass({
	getInitialState: function () {
		return {
			movements: 0,
			score: 0
		};
	},
	render: function() {
		return (<div>
				<div>Movements: {this.state.movements} </div>
				<div>Score: {this.state.score} </div>
			</div>);
	},
	setMovement: function(v) {
		this.setState({score: v});
	},
	reset: function() {
		this.setState({movements: 0, score: 0});
	}
});

var scoreBoardInstance = React.render(<ScoreBoard />, document.getElementById("score"));