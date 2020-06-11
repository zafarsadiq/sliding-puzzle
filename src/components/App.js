import React from "react";

const row = 3;
const col = 3;

class App extends React.Component
{
	constructor(props){
		super(props);
		this.move = this.move.bind(this);
		this.swap = this.swap.bind(this);
		this.shuffle = this.shuffle.bind(this);
		this.isOver = this.isOver.bind(this);
		this.initBoard = this.initBoard.bind(this);
		this.started = false;
		this.initBoard();
	}
	
	render(){
		let arr = [];
		if(this.state.slides.length == 0) return <div className='row'></div> ;
		for (let i = 0; i < row; i++){
			for( let j = 0; j < col; j++){
				arr.push(
					<Slide key={this.state.slides[i][j].position.row.toString() + this.state.slides[i][j].position.col.toString()} clickHandle={this.move} isBlank={this.state.slides[i][j].isBlank} position={this.state.slides[i][j].position} current_position={this.state.slides[i][j].current_position} puzzle={this.state.puzzle} />
				);
			}
		}
		return (
			<div className='row'>
				<div id="list">
					<img onClick={()=>this.changeBoard(1)} width="150" height="150" src={window.location.href + 'img/preview/1.jpg'} /><br />
					<img onClick={()=>this.changeBoard(2)} width="150" height="150" src={window.location.href + 'img/preview/2.jpg'} /><br />
					<img onClick={()=>this.changeBoard(3)} width="150" height="150" src={window.location.href + 'img/preview/3.jpg'} /><br />
					<img onClick={()=>this.changeBoard(4)} width="150" height="150" src={window.location.href + 'img/preview/4.jpg'} />
				</div>
				<div id="board">
					<button onClick={this.shuffle}>shuffle</button><br />
					{arr}
				</div>
		   </div> 
		);
		
	}
	
	componentDidMount() {  
		this.shuffle();
	}
	
	initBoard(){
		let slides = [];
		for (let i = 0; i < row; i++){
			slides.push([]);
			for( let j = 0; j < col; j++){
				let position = {
					row: i, col: j
				};
				if(i == 0 && j == 0){
					slides[i].push({
						isBlank: true,
						position: {row:i, col: j},
						current_position: {row:i, col:j},
					});
				}else{
					slides[i].push({
						isBlank: false,
						position: {row:i, col: j},
						current_position: {row:i, col:j},
					});
				}
			}
		}
		this.state = {
			slides: slides,
			puzzle: 1
		};
		
	}
	
	shuffle(){
		let number_of_clicks = 10;
		for(let i = 0; i < 100; i++){
			let slide_row = parseInt(Math.random()*10)%row;
			let slide_col = parseInt(Math.random()*10)%col;
			this.move({
				row: slide_row, col: slide_col
			});
		}
	}
	
	move(pos){
		let slides = this.state.slides;
		if(slides[pos.row - 1]  != undefined && slides[pos.row - 1][pos.col] != undefined && slides[pos.row - 1][pos.col].isBlank == true){
			this.swap(pos,{row:pos.row-1, col:pos.col});
		}
		if(slides[pos.row][pos.col + 1] != undefined && slides[pos.row][pos.col + 1].isBlank == true){
			this.swap(pos,{row:pos.row, col:pos.col+1});
		}
		if(slides[pos.row +1] != undefined && slides[pos.row +1][pos.col] != undefined && slides[pos.row+1][pos.col].isBlank == true){
			this.swap(pos,{row:pos.row+1, col:pos.col});
		}
		if(slides[pos.row][pos.col - 1] != undefined && slides[pos.row][pos.col - 1].isBlank == true){
			this.swap(pos,{row:pos.row, col:pos.col-1});
		}
		
	}
	
	swap(slide1,slide2){
		let slides = this.state.slides;
		let temp = slides[slide1.row][slide1.col];
		slides[slide1.row][slide1.col] = slides[slide2.row][slide2.col];
		slides[slide2.row][slide2.col] = temp;
		slides[slide1.row][slide1.col].current_position = {
			row: slide1.row, col: slide1.col
		};
		slides[slide1.row][slide1.col].isBlank = true;
		slides[slide2.row][slide2.col].current_position = {
			row: slide2.row, col: slide2.col
		};
		this.setState({
			slides: slides
		});
		this.started = true;
		
	}
	componentDidUpdate(){
		if(this.started && this.isOver()){
			alert("Congratulation! you have done it.");
		}
	}
	isOver(){
		let over = true;
		for(let i = 0; i < row; i++){
			for(let j=0; j<col; j++){
				let current_slide = this.state.slides[i][j];
				if(current_slide.position.row != current_slide.current_position.row || current_slide.position.col != current_slide.current_position.col){
					over = false;
				}
			}
		}
		return over;
	}
	changeBoard(puzzle){
		this.setState({
			puzzle: puzzle
		});
		this.shuffle();
	}
	
		
}

function Slide(props){
	const clickHandle = () => props.clickHandle(props.current_position);
	if(props.isBlank){
		return <img onClick={() => clickHandle()} src={window.location.href + 'img/' + props.puzzle + '/' + 'blank.jpg'} />;
	}
	return <img onClick={() => clickHandle()} src={window.location.href + 'img/' + props.puzzle + '/' + props.position.row + props.position.col + '.jpg'} />; 
}

export default App;