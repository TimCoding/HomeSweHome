import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import * as api from './api.js';
import DogCard from './dogcards.jsx';
import {PawSpinner} from './spinner.jsx';
import ShelterCard from './sheltercards.jsx';
import ParkCard from './parkcards.jsx';
import Highlighter from "react-highlight-words";


export default class ModelPagination extends Component {
	constructor(props) {
        super(props);
				var amtPages = 4;
                var paginator = new api.Paginator(amtPages, props.call, props.query);
				this.maxPages = 0;
				this.paginatorAPI = paginator;
        this.state = {
					todos: [],
          currentPage: 1,
          todosPerPage: amtPages,
          startPage: 1,
          endPage: this.maxPages < 5 ? this.maxPages / amtPages : 5,
          max: this.maxPages,
          type: props.type
        };
        this.handleClick = this.handleClick.bind(this);
      }

		componentDidMount(){
			this.paginatorAPI.fetchFirstPage()
				.then((dataJSON) =>
				{
                    this.maxPages = this.paginatorAPI.totalPages();
					this.setState({
						todos: this.state.todos.concat(dataJSON),
						max: this.paginatorAPI.totalPages(),
						startPage: 1,
                        endPage: this.maxPages > 5 ? 5 : this.maxPages
                    })
				}
				)
				.catch(error => this.setState({
					error: error.message
				}));
		}

    handleClick(event) {
        var page = Number(event.target.id);
        if(Number(event.target.id) === 0){
            page = 1;
        }else if(Number(event.target.id) === (this.state.max + 1)){
            page = this.state.max;
        }
        var mid = (this.state.startPage + this.state.endPage) / 2;
        var shift = page - Math.floor(mid);
        var newStart = this.state.startPage + shift;
        var newEnd = this.state.endPage + shift;
				var max = this.state.max;
				var dogs = [];
				this.paginatorAPI.fetchPage(page - 1)
					.then((dataJSON) =>
					{
						this.setState({
							/*Rename todos to useful homeswehome related name*/
							todos: this.state.todos.concat(dataJSON)
						})
					}
					)
					.catch(error => this.setState({
						error: error.message
					}));
				if(newStart < 1 || Number(event.target.id) == 0){
					newStart = 1;
                    newEnd = max
                    if((newStart + 4) < newEnd){
                        newEnd = this.maxPages > 5 ? 5 : this.maxPages;
                    }
				}
				if(newEnd > max || Number(event.target.id) == (this.state.max + 1)){
                    newStart = max - 4;
                    if(newStart < 1){
                        newStart = 1;
                    }
					newEnd = max;
				}
				this.setState({
						todos: dogs,
						startPage: newStart,
						endPage: newEnd
                });
    }

    render() {
    const { todos, currentPage, todosPerPage, startPage} = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.state.todos;

    const renderTodos = currentTodos.map(currentTodos => {
                if(this.state.type == "dog"){
                    return (
						<Col md="3">
							<DogCard dogData={currentTodos} query={this.props.query}/>
						</Col>

				    );
                }else if(this.state.type == "park"){
                    return (
						<Col md="3">
							<ParkCard parkData={currentTodos} query={this.props.query}/>
						</Col>
				    );
                }else if(this.state.type == "shelter"){
                    return (
						<Col md="3">
							<ShelterCard shelterData={currentTodos} query={this.props.query}/>
						</Col>
				    );
                }
				
		});

    // Logic for displaying page numbers
    const pageNumbers = [];

    for (let i = this.state.startPage; i <= this.state.endPage; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
        return (
        <PaginationItem>
            <PaginationLink
				key={number}
	            id={number}
	            onClick={this.handleClick}>
						{number}
			</PaginationLink>
        </PaginationItem>
        );
    });

    return (
        <div>
					<Container>
						{ this.state.todos.length == 0 ? <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1> : "" }
						<Row>
	        		        {renderTodos}
						</Row>
					</Container>
        <Pagination id="page-numbers">
					<PaginationItem>
						<PaginationLink previous key={1} id={0} onClick={this.handleClick}/>
					</PaginationItem>
          {renderPageNumbers}
					<PaginationItem>
          	<PaginationLink next key={this.state.max} id={this.state.max + 1} onClick={this.handleClick} />
        	</PaginationItem>
        </Pagination>
        </div>
    );
    }
}

window._ModelPagination = ModelPagination
