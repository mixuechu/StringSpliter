import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';


class Main extends React.Component{
	constructor(){

		super();
		this.words = [] // used to record candidate words
		this.str = ""	// used to store target string
		this.answer = []// used to store all possible combinations
						// it is a list of lists as the solution might not be unique
	}

	find_min = (lis) => {
		// this function is used to find the smallest solution among answer
		var min = 10000
		var temp = []
		for(var i = 0; i < lis.length; i++){
			if (lis[i].length === min){
				min = lis[i].length
				temp.push(lis[i])
			}
			if (lis[i].length < min){
				min = lis[i].length
				temp = [lis[i]]
			}

		}
		return temp
	}

	remove_word = (word) => {
		// this function is used to support the Remove button
		this.words.splice(word, 1)
		this.answer = []
	}

	createSelectItems = () => {
		// this function is used to generate items for the dropdown button
     let items = [];         
     for (let i = 0; i <= this.words.length; i++) {             
          items.push(<MenuItem eventKey={i}>{this.words[i]}</MenuItem>)
     }
     return items

 	}

	add_ = () => {
		// this function is used to add word to words
		if (document.getElementById("inp").value){this.words.push(document.getElementById("inp").value)}
		document.getElementById("inp").value = ""
		this.answer = []
	}

	str_ = () => {
		// this funtion is used to modify target string
		if (document.getElementById("str").value){this.str = (document.getElementById("str").value)}
		document.getElementById("str").value = ""
		this.answer = []
	}

	helper = (temp, lis) => {
		//this function uses backtrack algorithem to get all possible solutions
		if (temp.join("") === this.str){
			let clone = arrayClone(temp)
			this.answer.push(clone)
			return }
		for (var i = 0; i < lis.length; i++){
			temp.push(lis[i])
			if (temp.join("") === this.str.substr(0, temp.join("").length))
				{
				[lis[i],lis[0]] = [lis[0],lis[i]];
				this.helper(temp, lis.slice(1,lis.length));
				[lis[i],lis[0]] = [lis[0],lis[i]];
				}

			temp.splice(temp.length - 1, 1)

			}
	}

	analyze_ = () => {
		// this function supports the button Analyze
		var temp = []
		this.helper(temp, this.words)
		this.min = this.find_min(this.answer)[0].length - 1
	}

	get_answers = () => {
		// this function is used to generate items for displaying answers
	let items = []
     for (let i = 0; i < this.answer.length; i++) {             
          items.push(<p>{(this.answer[i].join(", "))}</p>)  
     }
     return items
	}

	getwords = () => {
		// this function is used to generate items for displaying words
	let items = []
     for (let i = 0; i <= this.words.length; i++) {             
          items.push(<p>{this.words[i]}</p>)
     }
     return items
	}

	componentDidMount() {
		// this function is used to refresh all data and display Components
  	this.interval = setInterval(() => this.setState({ time: Date.now() }), 100)
	}
	render(){
		return (
			<div>

				<ButtonToolbar className = "center">

					<DropdownButton
						title="Remove"
						id="word-menu"
						onSelect={this.remove_word}
					>
						
						{this.createSelectItems()}
					</DropdownButton>

					<button className="btn btn-default" onClick={this.analyze_}>
					  Analyze
					</button>

				</ButtonToolbar>


				<h3>Words</h3>
				<div className = "words">{this.getwords()}</div>

				<div className = "center">
					Add: <input type="text" id="inp"/>
					<button onClick={this.add_}>Confirm</button>
				</div>

				<div className = "center">
					<h3>String:  {this.str}</h3><p/>
					<input type="text" id="str"/>
					<button onClick={this.str_}>Confirm</button>
				</div>

				<div className = "center">
					<h3>Number of Spaces: {this.min}</h3><p/>
				<div className = "words">{this.get_answers()}</div>
				</div>
			</div>	
			)
	}

}

function arrayClone(arr) {
	// used to do deepCopy
	return JSON.parse(JSON.stringify(arr))
}


ReactDOM.render(<Main />, document.getElementById('root'))
