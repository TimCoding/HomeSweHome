import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


export default class ModelPagination extends Component {
	constructor() {
        super();
        this.state = {
          todos: ['a','b','c','d','e','f','g','h','i','j','k'],
          currentPage: 1,
          todosPerPage: 1,
          startPage: 1,
          endPage: 11 / 1 < 5 ? 11 / 1 : 5
        };
        this.handleClick = this.handleClick.bind(this);
      }

    handleClick(event) {
        var mid = (this.startPage + this.endPage) / 2;
        var shift = Number(event.target.id) - mid;
        var newStart = this.state.startPage + shift;
        var newEnd = this.state.endPage + shift;
        alert("MID VALUE: " + mid);
        alert("SHIFT VALUE: " + shift);
        alert("WHAT WE CLICK ON: " + Number(event.target.id));
        alert("START VALUE: " + Number(newStart));
        alert("END VALUE: " + Number(newEnd));
        this.setState({
            currentPage: Number(event.target.id),
            startPage: newStart,
            endPage: newEnd
        });
    }

    render() {
    const { todos, currentPage, todosPerPage, startPage} = this.state;

    // Logic for displaying current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

    const renderTodos = currentTodos.map((todo, index) => {
        return <li key={index}>{todo}</li>;
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
