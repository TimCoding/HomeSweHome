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
				var amtPages = 4; //Initializing value, not that important
        var paginator = new api.Paginator(amtPages, props.call, props.query);
				this.maxPages = 0;
				this.paginatorAPI = paginator;
        this.state = {
					todos: [],
          todosPerPage: amtPages,
          startPage: 1,
          endPage: this.maxPages < 5 ? this.maxPages / amtPages : 5,
          max: this.maxPages,
          type: props.type,
          doneLoading: 0 //Flag for spinner 
        };
        this.handleClick = this.handleClick.bind(this);
        this.goEnd = this.goEnd.bind(this);
      }

		componentDidMount(){
			//Must fetch first page to intialize API for pagination
			this.paginatorAPI.fetchFirstPage()
				.then((dataJSON) =>
				{
                    this.maxPages = this.paginatorAPI.totalPages();
					this.setState({
						todos: this.state.todos.concat(dataJSON),
						max: this.paginatorAPI.totalPages(),
						startPage: 1,
                        endPage: this.maxPages > 5 ? 5 : this.maxPages,
                        doneLoading: 1
                    })
				}
				)
				.catch(error => this.setState({
					error: error.message
				}));
        }

		//Function handles edge case of going to the very end of pagination
    goEnd(event) {
        this.paginatorAPI.fetchLastPage()
        .then((dataJSON) => {
					 //Clear out what pages are currently being displayed
            this.setState({
                todos: []
            })
						//If pages greater than 5, display 4 previous pages before last page
						//Otherwise display 1 - max pages
            var newEnd = this.state.max;
            var newStart = newEnd - 4 > 1 ? newEnd - 4 : 1;
            this.setState({
                todos: this.state.todos.concat(dataJSON),
                doneLoading: 1,
                startPage: newStart,
                endPage: newEnd
            })
        })
    }

    handleClick(event) {
        this.setState({
            doneLoading: 0,
            todos: []
        })
        // to handle if user clicks more than one page
        // and stop from loading another set of cards right away
        if (!this.state.doneLoading) {
			return;
		}
        var page = Number(event.target.id);
        var newStart = 0;
        var newEnd = 0;
				//Handles arrow click for going back to the very first page
        if(Number(event.target.id) === 0){
            this.paginatorAPI.fetchFirstPage()
                .then((dataJSON) => {
                    newStart = 1;
                    newEnd = newStart + 4 > this.state.max ? this.state.max : newStart + 4;
                    this.setState({
                        todos: this.state.todos.concat(dataJSON),
                        doneLoading: 1,
                        startPage: 1,
                        endPage: newEnd
                    })
                })
        }else{
					//Handles normal case of clicking on numbered pages to navigate around
            this.paginatorAPI.current = page - 1;
                    this.paginatorAPI.fetchCurrentPage()
                        .then((dataJSON) =>
                        {
													//Calculating new page numbers to display
                            var mid = (this.state.startPage + this.state.endPage) / 2;
                            var shift = page - Math.floor(mid);
                            newStart = this.state.startPage + shift;
                            newEnd = this.state.endPage + shift;
                            var max = this.state.max;
														//In case algorithm causes starting page to be too low
                            if(newStart < 1){
                                newStart = 1;
                                newEnd = max
                                if((newStart + 4) < newEnd){
                                    newEnd = this.maxPages > 5 ? 5 : this.maxPages;
                                }
                            }
														//In case algorithm causes ending page to be too high
                            if(newEnd > max){
                                newStart = max - 4;
                                if(newStart < 1){
                                    newStart = 1;
                                }
                                newEnd = max;
                            }
                            this.setState({
                                todos: this.state.todos.concat(dataJSON),
                                doneLoading:1,
                                startPage: newStart,
                                endPage: newEnd
                            })
                        }
                        )
                        .catch(error => this.setState({
                            error: error.message
                        }));
        }
    }

    render() {
    const { todos, todosPerPage, startPage} = this.state;

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

    let renderPageNumbers = pageNumbers.map(number => {
        if(number === this.paginatorAPI.getCurrentPageNumber() + 1) {
            return (
                <PaginationItem active>
                    <PaginationLink
                        id={number}
                        onClick={this.handleClick}>
                        {number}
                    </PaginationLink>
                </PaginationItem>
            );
        }
        return (
        <PaginationItem>
            <PaginationLink
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
						{ this.state.doneLoading == 0 ? <h1 className="text-center" style={{fontSize: '6em'}}><PawSpinner /></h1> : "" }
                        { this.state.todos.length == 0 && this.state.doneLoading == 1 ? <p>No Results</p> : <Row>{renderTodos}</Row>}
					</Container>
        { pageNumbers.length <= 4 && this.state.doneLoading == 1 ? <p></p> :
            <Pagination id="page-numbers">
                <PaginationItem>
                    <PaginationLink previous id={0} onClick={this.handleClick}/>
                        </PaginationItem>
                            {renderPageNumbers}
                        <PaginationItem>
                    <PaginationLink next onClick={this.goEnd} />
                </PaginationItem>
            </Pagination>
        }
        </div>
    );
    }
}

window._ModelPagination = ModelPagination
