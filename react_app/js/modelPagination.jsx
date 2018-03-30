import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import * as api from './api.js';
import DogCard from './dogcards.jsx';


export default class ModelPagination extends Component {
	constructor(props) {
        super(props);
				var amtPages = 5;
				var paginator = new api.Paginator(amtPages, api.fetchShelterDogs, "TX2115");
				this.maxPages = 0;
				this.paginatorAPI = paginator;
				//Intialize pagination API here
				this.paginatorAPI.fetchFirstPage().then(() => {
					alert(this.paginatorAPI.isInitialized());
				});
        this.state = {
					todos: [],
          currentPage: 1,
          todosPerPage: amtPages,
          startPage: 1,
          endPage: this.maxPages < 5 ? this.maxPages / amtPages : 5,
					max: this.maxPages
        };
        this.handleClick = this.handleClick.bind(this);
      }

		componentDidMount(){
			this.paginatorAPI.fetchFirstPage()
				.then((dogsJSON) =>
				{
					//var dogs = [];
					// dogs.concat(dogsJSON);
					// alert(dogs);
					this.maxPages = this.paginatorAPI.totalPages();
					this.setState({
						todos: this.state.todos.concat(dogsJSON),
						max: this.paginatorAPI.totalPages(),
						/*FIX PLEASE*/
						startPage: 1,
						endPage: 5
					})
				}
				)
				.catch(error => this.setState({
					error: error.message
				}));
		}

    handleClick(event) {
        var mid = (this.state.startPage + this.state.endPage) / 2;
				var page = Number(event.target.id);
        var shift = page - mid;
        var newStart = this.state.startPage + shift;
        var newEnd = this.state.endPage + shift;
				var max = this.state.max;
				var dogs = [];
				// dogs.concat(this.paginatorAPI.fetchPage(Number(event.target.id)));
				this.paginatorAPI.fetchPage(page - 1)
					.then((dogsJSON) =>
					{
						// var dogs = [];
						// dogs.concat(dogsJSON);
						this.setState({
							/*Rename todos to useful homeswehome related name*/
							todos: this.state.todos.concat(dogsJSON)
						})
					}
					)
					.catch(error => this.setState({
						error: error.message
					}));
				if(newStart < 1){
					newStart = 1;
					newEnd = max
				}
				/*BUGGY PLEASE FIX */
				if(newEnd > max){
					newStart = max - 4;
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
				return (
						<Col md="3">
								<DogCard dogData={currentTodos}/>
						</Col>
				);
		});

    // Logic for displaying page numbers
    const pageNumbers = [];
    // for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    //     pageNumbers.push(i);
    // }

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
						<h2>Dogs</h2>
						<Row>
	        		{renderTodos}
						</Row>
					</Container>
        <Pagination id="page-numbers">
					<PaginationItem>
						<PaginationLink previous href="#" />
					</PaginationItem>
          {renderPageNumbers}
					<PaginationItem>
          	<PaginationLink next href="#" />
        	</PaginationItem>
        </Pagination>
        </div>
    );
    }
}

window._ModelPagination = ModelPagination
