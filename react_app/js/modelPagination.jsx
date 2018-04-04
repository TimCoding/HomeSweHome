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
          todosPerPage: amtPages,
          startPage: 1,
          endPage: this.maxPages < 5 ? this.maxPages / amtPages : 5,
          max: this.maxPages,
          ending: 0,
          type: props.type,
          doneLoading: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.goEnd = this.goEnd.bind(this);
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
                        endPage: this.maxPages > 5 ? 5 : this.maxPages,
                        ending: this.paginatorAPI.totalPages(),
                        doneLoading: 1
                    })
				}
				)
				.catch(error => this.setState({
					error: error.message
				}));
        }
        
    goEnd(event) {
        this.paginatorAPI.fetchLastPage()
        .then((dataJSON) => {
            this.setState({
                todos: []
            })
            var newEnd = this.state.max; 
            var newStart = newEnd - 4 > 1 ? newEnd - 4 : 1;
            this.setState({
                todos: this.state.todos.concat(dataJSON),
                doneLoading: 1,
                startPage: newStart,
                endPage: newEnd
            })
           // alert(this.state.endPage);
        }) 
    }

    handleClick(event) {
        // alert("YOU CLICK ON DIS: " + Number(event.target.id));
        // alert("YOU WANT DIS: " + (this.state.max + 1));
        this.setState({
            doneLoading: 0,
            todos: []
        })
        var page = Number(event.target.id);
        var newStart = 0; 
        var newEnd = 0;
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
            
        // }else if(Number(event.target.id) === (this.state.ending)){
        //     this.paginatorAPI.fetchPage(this.state.max - 1)
        //         .then((dataJSON) => {
        //             newEnd = this.state.max; 
        //             newStart = newEnd - 4 > 1 ? newEnd - 4 : 1;
        //             this.setState({
        //                 todos: this.state.todos.concat(dataJSON),
        //                 doneLoading: 1,
        //                 startPage: newStart,
        //                 endPage: newEnd
        //             })
        //            // alert(this.state.endPage);
        //         })
        }else{
            this.paginatorAPI.current = page - 1;
                    //alert("CURRENT newEND: " + newEnd);
                    this.paginatorAPI.fetchCurrentPage()
                        .then((dataJSON) =>
                        {

                            var mid = (this.state.startPage + this.state.endPage) / 2;
                            var shift = page - Math.floor(mid);
                            newStart = this.state.startPage + shift;
                            newEnd = this.state.endPage + shift;
                            var max = this.state.max;
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
                                /*Rename todos to useful homeswehome related name*/
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
    const { todos, todosPerPage, startPage} = this.state;g

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
