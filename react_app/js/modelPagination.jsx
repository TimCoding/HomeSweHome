import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink, Container, Row, Col } from 'reactstrap';
import * as api from './api.js';
import DogCard from './dogcards.jsx';
import {PawSpinner} from './spinner.jsx';


export default class ModelPagination extends Component {
	constructor(props) {
        super(props);
				var amtPages = 4;
				var paginator = new api.Paginator(amtPages, api.fetchShelterDogs, "TX2115");
				this.maxPages = 0;
				this.paginatorAPI = paginator;
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
                    this.maxPages = this.paginatorAPI.totalPages();
					this.setState({
						todos: this.state.todos.concat(dogsJSON),
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
        var mid = (this.state.startPage + this.state.endPage) / 2;
				var page = Number(event.target.id);
        var shift = page - Math.floor(mid);
        var newStart = this.state.startPage + shift;
        var newEnd = this.state.endPage + shift;
				var max = this.state.max;
				var dogs = [];
				this.paginatorAPI.fetchPage(page - 1)
					.then((dogsJSON) =>
					{
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
                    if((newStart + 4) < newEnd){
                        newEnd = this.maxPages > 5 ? 5 : this.maxPages;
                    }
				}
				if(newEnd > max){
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
				return (
						<Col md="3">
							<DogCard dogData={currentTodos}/>
						</Col>
				);
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
						<h2>Dogs</h2>
						{ this.state.todos.length == 0 ? <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1> : "" }
						<Row>
	        		        {renderTodos}
						</Row>
					</Container>
        <Pagination id="page-numbers">
					<PaginationItem>
						<PaginationLink previous key={1} id={1} onClick={this.handleClick}/>
					</PaginationItem>
          {renderPageNumbers}
					<PaginationItem>
            {/* error where you click last button right away it does the same thing with double clicking with first button*/}
          	<PaginationLink next key={this.state.max} id={this.state.max} onClick={this.handleClick} />
        	</PaginationItem>
        </Pagination>
        </div>
    );
    }
}

window._ModelPagination = ModelPagination
