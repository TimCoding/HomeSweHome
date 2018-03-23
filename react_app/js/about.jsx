import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import {Container, Row, Col, Jumbotron} from 'reactstrap';
import {NavBar} from './navbar.jsx';
import {ControlledCarousel} from './carousel.jsx';
import {PawSpinner} from './spinner.jsx';


const PersonCard = (props) => {

    return (
        <div className={"col-lg-4" + (props.offset ? " offset-lg-2" : "")}>
            <img src={props.image_url} className="rounded-circle mx-auto d-block"/>
            <h2 className="text-center mt-3">{props.name}</h2>
            <Container className="mb-5">
                <table className="table table-sm">
                    <tr>
                        <td colSpan="2" className="border-top-0">
                            <p>{props.description}</p>
                            <p>{props.role}</p>
                        </td>
                    </tr>
                    <tr>
                        <td>Favorite Dog:</td>
                        <td>{props.fav_dog}</td>
                    </tr>
                    <tr>
                        <td>Commits:</td>
                        <td>{props.commits}</td>
                    </tr>
                    <tr>
                        <td>Issues:</td>
                        <td>{props.issues}</td>
                    </tr>
                    <tr>
                        <td>Unit Tests:</td>
                        <td>{props.unit_tests}</td>
                    </tr>
                </table>
            </Container>
        </div>);
};


export default class About extends Component {

    constructor(props){
        super(props);

        this.state = {
            aboutData: null,
            error: null
        };
    }

    componentDidMount(){
        fetch("/about/data/")
            .then(response => response.json())
            .then(response => {
                this.setState({
                    aboutData: response
                });
            }).catch(error => this.setState({
                "error": error.message
            }))
    }

    render() {


        let crew = (
            <h1 className="text-center" style={{fontSize: '6em', width: "100%"}}><PawSpinner id={"CrewPawSpinner"}/></h1>
        );

        if(!(this.state.aboutData == null)){
            console.log(this.state.aboutData);
            crew = (
                <React.Fragment>
                    <PersonCard {...this.state.aboutData.users["dav-s"]}/>
                    <PersonCard {...this.state.aboutData.users["TimCoding"]}/>
                    <PersonCard {...this.state.aboutData.users["ewk298"]}/>
                    <PersonCard offset={"true"}{...this.state.aboutData.users["rebekkahkoo"]}/>
                    <PersonCard {...this.state.aboutData.users["gmac220"]}/>
                </React.Fragment>
            );
        }

        return (
            <div>
                <NavBar/>

                <Jumbotron className="text-center">
                    <div className="container">
                        <h1 className="jumbotron-heading">
                            About <span className="font-italic">HomeSweHome</span>
                        </h1>
                        <p className="lead text-muted">
                            All you need to know about this amazing project.
                        </p>
                        <p>
                            <a href="#crew" className="btn btn-primary m-2">
                                Meet the Crew
                            </a>
                            <a href="#about" className="btn btn-primary m-2">
                                About the Project
                            </a>
                        </p>
                    </div>
                </Jumbotron>

                <Container id="crew">
                    <h2 className="text-center my-4">The Crew</h2>
                    <Row>
                        {crew}
                    </Row>
                </Container>

                <Container id="about">
                    <hr className="my-5"/>
                    <h2 className="text-center">We all love dogs, right?</h2>
                    <Row>
                        <div className="col-lg-10 offset-lg-1">
                            <h4><i className="fas fa-paw"></i> The Overview</h4>
                            <p className="text-justify">Welcome all dog lovers! If you are looking to discover a new
                                dog, shelter, or park,
                                you have come to the right place! <span className="font-italics">HomeSweHome</span> is
                                the best new site to
                                find your new best friend! For any shelter in your area, you can find which little
                                buddies are living
                                there. In addition, you can see what parks are in the area for you and your friend to
                                have a great time!
                            </p>

                            <hr/>

                            <h4><i className="fas fa-database"></i> The Data</h4>
                            <p>There are many challenges that face us when acquiring and processing this disparate data.
                                We pull from the following resources:</p>
                            <ul>
                                <li><a href="https://www.petfinder.com/developers/api-docs">PetFinder API</a>:</li>
                                <ul>
                                    <li>Main data source for finding adoptable dogs and shelters</li>
                                    <li>Most dogs listings have dog images to scrape from</li>
                                </ul>
                                <li><a href="https://www.nps.gov/subjects/digital/nps-data-api.htm">National Park
                                    Service API</a>:
                                </li>
                                <ul>
                                    <li>Has information on parks based on a given area</li>
                                    <li>Need to pair up parks with shelters based on location</li>
                                </ul>
                                <li><a href="https://developers.google.com/places/supported_types">Google Places API</a>:
                                </li>
                                <ul>
                                    <li>Gives Google information of a shelter or park</li>
                                    <li>Should be able to retrieve images and map data</li>
                                </ul>
                                <li><a href="https://rescuegroups.org/services/adoptable-pet-data-http-json-api/">Rescue
                                    Groups API</a>:
                                </li>
                                <ul>
                                    <li>Source for finding animal rescue groups and organizations</li>
                                    <li>Used in conjunction with PetFinder API to find more organizations' information
                                    </li>
                                </ul>
                                <li><a href="https://www.yelp.com/developers/documentation/v3">Yelp API</a>:</li>
                                <ul>
                                    <li>Used for finding reviews about parks and shelters</li>
                                </ul>
                            </ul>
                            <p>One large challenge is pairing up shelters with parks. We do this by getting longitude
                                and latitude
                                information from the shelter API and then using this data to find nearby parks from the
                                park APIs.</p>

                            <hr/>

                            <h4><i className="fas fa-list-ol"></i> The Stats</h4>
                            <div className="container">
                                <table className="table">
                                    <tr>
                                        <td>Total Commits:</td>
                                        <td>{this.state.aboutData ? this.state.aboutData.totals.commits : "..."}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Issues:</td>
                                        <td>{this.state.aboutData ? this.state.aboutData.totals.issues : "..."}</td>
                                    </tr>
                                    <tr>
                                        <td>Total Unit Tests:</td>
                                        <td>{this.state.aboutData ? this.state.aboutData.totals.unit_tests : "..."}</td>
                                    </tr>
                                </table>
                            </div>

                            <hr/>

                            <h4><i className="fas fa-wrench"></i> The Tools</h4>
                            <p>Many new tools other than the previously stated ones were used in the creation of this
                                site. Including but not limited to:</p>
                            <ul>
                                <li>Slack:</li>
                                <ul>
                                    <li>Group collaboration and file sharing</li>
                                    <li>GitHub integration for tracking activity</li>
                                </ul>
                                <li>Amazon EC2:</li>
                                <ul>
                                    <li>Hosting of server</li>
                                    <li>Installation and custom options for running in production</li>
                                </ul>
                                <li>Namecheap:</li>
                                <ul>
                                    <li>Domain registration</li>
                                    <li>DNS Configuration</li>
                                </ul>
                                <li>Python Requests Library:</li>
                                <ul>
                                    <li>Used to make API calls to GitHub for about page</li>
                                    <li>Will be used to make API calls for scraping other data</li>
                                </ul>
                            </ul>

                            <hr/>

                            <h4><i className="fas fa-link"></i> The Links</h4>
                            <ul>
                                <li><a href="https://github.com/TimCoding/HomeSweHome/">GitHub Project</a></li>
                                <li>GitBook:</li>
                                <ul>
                                    <li><a href="https://epicdavi.gitbooks.io/api/">API Documentation</a></li>
                                    <li><a href="https://epicdavi.gitbooks.io/report/">Technical Report</a></li>
                                    <li><a href="https://epicdavi.gitbooks.io/report/self-critique.html">Self
                                        Critique</a></li>
                                    <li><a href="https://epicdavi.gitbooks.io/report/other-critique.html">Other
                                        Critique</a></li>
                                </ul>
                            </ul>
                        </div>
                    </Row>
                </Container>
            </div>
        );
    }
}

window._About = About;
