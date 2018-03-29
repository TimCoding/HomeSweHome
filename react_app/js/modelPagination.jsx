import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export default class ModelPagination extends Component {
	constructor() {
        super();
        this.state = {
          todos: ['a','b','c','d','e','f','g','h','i','j','k'],
          currentPage: 1,
          todosPerPage: 3
        };
        this.handleClick = this.handleClick.bind(this);
      }

    handleClick(event) {
    this.setState({
        currentPage: Number(event.target.id)
    });
    }

    render() {
    const { todos, currentPage, todosPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
        return <li key={index}>{todo}</li>;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
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
        <ul>
            {renderTodos}
        </ul>
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
