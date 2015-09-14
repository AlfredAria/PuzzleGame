var socket = io();

/*
	http://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/

	React’s classes has a getInitialState function which expect us to return the initial data of class.
 
!!! componentDidMount gets called after the component mounted, therefore it’s the best place to attach our socket.io listeners.

*/

var Board = React.createClass({
	/* Setup initial state values */
	getInitialState: function () {
		return {data: []};
	},
	/* Setup socket.io event listener(s) */
	componentDidMount: function() {
		// socket.on("call event", this.updateValue);
		socket.on("get some more", this.someMore);
	},
	render: function() {
		return (
			<div>
				<ul>
				{
					this.state.data.map((value, index) => {
						return (
							<li> {index}: {value} </li>
						);
					})
				}
				</ul>
			</div>	
		);
	},
	updateValue: function(item) {
		var oldItems = this.state.data;
		var newItems = null;
		if (Array.isArray(oldItems) == true) {
			oldItems.push(item);
			newItems = oldItems;
		}
		else {
			newItems = [item];
		}
		this.setState({data: newItems});
	},
	someMore: function(items) {
		var oldItems = this.state.data;
		var newItems = null;
		if (Array.isArray(oldItems) == true) {
			newItems = oldItems.concat(items);
		}
		else {
			newItems = items;
		}
		this.setState({data: newItems});
	}
});

document.getElementById("addSomeMore").addEventListener("click", function(e) {
	e.preventDefault();
	socket.emit("add some more");
});

React.render(
	<Board />, document.getElementById("content"));