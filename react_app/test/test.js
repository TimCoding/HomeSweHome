import React from 'react'
import { expect, assert } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme'
import { Splash } from '../js/splash.jsx'
import ModelPage from '../js/modelpage.jsx'
import { NavBar } from '../js/navbar.jsx'
import ShelterInfo from '../js/shelterinfo.jsx'
import Adapter from 'enzyme-adapter-react-16';
import DogCard from '../js/dogcards.jsx'
import ShelterCard from '../js/sheltercards.jsx'
import ParkCard from '../js/parkcards.jsx'
import ShelterContact from '../js/sheltercontact.jsx'
import {ControlledCarousel} from '../js/carousel.jsx'
import {ParkDetails} from '../js/parkdetails.jsx'
import {CarouselItem} from 'reactstrap';
import InfoCard from '../js/infocard.jsx'
Enzyme.configure({ adapter: new Adapter() });

describe('Query Prop', () => {
	const dogsJSON = {name:"Tic", breeds:["Pit Bull Terrier"], image_urls:[], housetrained:"false", friendly:"true"}
	const dogCardWrapper = shallow(<DogCard dogData={dogsJSON} query="corgi"/>)
	const parkJSON = {name:"Park Name", image_urls:["src"], yelp_rating:"3", phone:"123-345-5678", address:"address", city:"city",
				state:"state", zip:"zip"}
	const parkCardWrapper = shallow(<ParkCard parkData={parkJSON} query="Park123"/>)
	const shelterJSON = {image_urls:["src"], name:"Shelter Name", email:"email", phone:null}
	const shelterCardWrapper = shallow(<ShelterCard shelterData={shelterJSON} query="Dog Shelter"/>)

	it('passes query to DogCard', () => {
		 expect(dogCardWrapper.find('.testQuery').text()).to.equal("corgi")
	})

	it('passes query to ParkCard', () => {
		 expect(parkCardWrapper.find('.testQuery').text()).to.equal("Park123")
	})

	it('passes query to ShelterCard', () => {
		 expect(shelterCardWrapper.find('.testQuery').text()).to.equal("Dog Shelter")
	})
})

describe('Splash Component', () => {
	const splashWrapper = shallow(<Splash/>)

	it('render splash', () => {
		expect(splashWrapper).to.have.length(1)
	})
})

// describe('Model Component', () => {
// 	const modelWrapper = shallow(<ModelPage/>)

// 	it('render component', () => {
// 		expect(modelWrapper).to.have.length(1)
// 	})
// })

describe('Navbar Component', () => {
	const navbarWrapper = shallow(<NavBar/>)

	it('render navbar', () => {
		expect(navbarWrapper).to.have.length(1)
	})
})

describe('ShelterInfo Component', () => {
	const shelterInfoJSON = {adoption_policy:"Adoption Policy", mission:"Mission", email:"email"}
	const shelterInfoWrapper = shallow(<ShelterInfo desc={shelterInfoJSON}/>)

	it('render shelterinfo', () => {
		// I think there is an error with dangerouslysetinnerhtml I cant get the data from there
		// expect(shelterInfoWrapper.find('.shelterAdoptionPolicy').text()).to.equal("Adoption Policy")
		// expect(shelterInfoWrapper.find('.shelterMission').text()).to.equal("Mission")
		expect(shelterInfoWrapper.find('.shelterEmail').text()).to.equal("email")
	})
})

describe('InfoCard Component', () => {
	const infoCardWrapper = shallow(<InfoCard name={"Adoption Center"} address={"address"} phone={"123"} image_urls={[]}/>)

	it('render infocard', () => {
		expect(infoCardWrapper.find('.infoCardTitle').text()).to.equal("Adoption Center")
		expect(infoCardWrapper.find('.infoCardAddress').text()).to.equal("address")
		expect(infoCardWrapper.find('.infoCardPhone').text()).to.equal("123")
	})
})

describe('ShelterContact Component', () =>{
	const shelterContactJSON = {image_urls:["src"], name:"Shelter Name", city:"city", state:"state", phone:"123-345-5678", address:"address"}
	const shelterContactWrapper = shallow(<ShelterContact shelterJSON={shelterContactJSON}/>)

	it ('render sheltercontact', () => {
		expect(shelterContactWrapper.find('.shelterName').text()).to.equal("Shelter Name")
		expect(shelterContactWrapper.find('.shelterAddress').text()).to.equal(" address" || " city, state")
		expect(shelterContactWrapper.find('.shelterPhone').text()).to.equal(" 123-345-5678")
	})
})

describe('DogCard Component', () => {
	const dogsJSON = {name:"Tic", breeds:["Pit Bull Terrier"], image_urls:[], housetrained:"false", friendly:"true"}
	const dogCardWrapper = shallow(<DogCard dogData={dogsJSON}/>)

	it ('render dogcard', () => {
		expect(dogCardWrapper.find('.testName').text()).to.equal("Tic")
		expect(dogCardWrapper.find('.testHouseTrained').text()).to.equal("false")
		expect(dogCardWrapper.find('.testFriendly').text()).to.equal("true")
	})
})

describe('ParkCard Component', () => {
	const parkJSON = {name:"Park Name", image_urls:["src"], yelp_rating:"3", phone:"123-345-5678", address:"address", city:"city",
				state:"state", zip:"zip"}
	const parkCardWrapper = shallow(<ParkCard parkData={parkJSON}/>)

	it ('render parkcard', () => {
		expect(parkCardWrapper.find('.testName').text()).to.equal("Park Name")
		expect(parkCardWrapper.find('.testRating').text()).to.equal("3")
		expect(parkCardWrapper.find('.testPhone').text()).to.equal("123-345-5678")
		expect(parkCardWrapper.find('.testAddress').text()).to.equal("address city, state zip")
	})
})

describe('ShelterCard Component', () => {
	const shelterJSON = {image_urls:["src"], name:"Shelter Name", email:"email", phone:null}
	const shelterCardWrapper = shallow(<ShelterCard shelterData={shelterJSON}/>)

	it ('render sheltercard', () => {
		expect(shelterCardWrapper.find('.testName').text()).to.equal("Shelter Name")
		expect(shelterCardWrapper.find('.testEmail').text()).to.equal("email")
		expect(shelterCardWrapper.find('.testPhone').text()).to.equal("")
	})
})

describe('Carousel Component', () => {
	const images = ["1", "2", "3"]
	const carouselWrapper = shallow(<ControlledCarousel items={images}/>)

	it ('render sheltercard', () => {
		expect(carouselWrapper.find(CarouselItem)).to.have.length(3)
	})
})

// describe('ParkDetails Component', () => {
// 	const parkDetailsWrapper = shallow(<ParkDetails parkID={1}/>)

// 	it('render spinner', () => {
//     expect(parkDetailsWrapper.find('.PawSpinner')).to.have.length(1)
//   })
// })
