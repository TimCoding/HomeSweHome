import React from 'react'
import { expect, assert } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme'
import { Splash } from '../js/splash.jsx'
import ModelPage from '../js/modelpage.jsx'
import { NavBar } from '../js/navbar.jsx'
import Reviews from '../js/reviews.jsx'
import Adapter from 'enzyme-adapter-react-16';
import DogCard from '../js/dogcards.jsx'
import ShelterCard from '../js/sheltercards.jsx'
import ParkCard from '../js/parkcards.jsx'

Enzyme.configure({ adapter: new Adapter() });



const navbarWrapper = shallow(<NavBar/>)
const jsonReviews = { adoption_policy:"test", mission:"test" }
const reviewsWrapper = shallow(<Reviews desc = {jsonReviews} />)


describe('Splash Component', () => {
	const splashWrapper = shallow(<Splash/>)

	it('render splash', () => {
		expect(splashWrapper).to.have.length(1)
		
	})
})

describe('Model Component', () => {
	const modelWrapper = shallow(<ModelPage/>)

	it('render component', () => {
		expect(modelWrapper).to.have.length(1)
	})

})

describe('Navbar Component', () => {
	it('render navbar', () => {
		expect(navbarWrapper).to.have.length(1)
	})
})

describe('Reviews Component', () => {
	it('render reviews', () => {
		expect(reviewsWrapper).to.have.length(1)
	})
})

describe('Reviews Component', () => {
	it('render reviews', () => {
		expect(reviewsWrapper).to.have.length(1)
	})
})

describe('DogCard Component', () => {
	const dogsJSON = {name:"Tic", breeds:["Pit Bull Terrier"], housetrained:false, friendly:true}
	const dogCardWrapper = shallow(<DogCard dogData={dogsJSON}/>)

	it ('render dogcard', () => {
		expect(dogCardWrapper.find('.dogCardName').text()).to.equal("Tic")
		expect(dogCardWrapper.find('.dogCardBreed').text()).to.equal("Pit Bull Terrier")
		expect(dogCardWrapper.find('.dogCardHouseTrained').text()).to.equal("No")
		expect(dogCardWrapper.find('.dogCardFriendly').text()).to.equal("Yes")
	})
})

describe('ParkCard Component', () => {
	const parkJSON = {name:"Park Name", image_urls:["src"], yelp_rating:"3", phone:"123-345-5678", address:"address", city:"city", 
				state:"state", zip:"zip"}
	const parkCardWrapper = shallow(<ParkCard parkData={parkJSON}/>)

	it ('render parkcard', () => {
		expect(parkCardWrapper.find('.parkCardTitle').text()).to.equal("Park Name")
		expect(parkCardWrapper.find('.parkCardRating').text()).to.equal("3")
		expect(parkCardWrapper.find('.parkCardPhone').text()).to.equal("123-345-5678")
		expect(parkCardWrapper.find('.parkCardLocation').text()).to.equal("address city, state zip")
	})
})

describe('ShelterCard Component', () => {
	const shelterJSON = {image_urls:["src"], name:"Shelter Name", email:"email", phone:null}
	const shelterCardWrapper = shallow(<ShelterCard shelterData={shelterJSON}/>)

	it ('render sheltercard', () => {
		expect(shelterCardWrapper.find('.shelterCardsTitle').text()).to.equal("Shelter Name")
		expect(shelterCardWrapper.find('.shelterCardEmail').text()).to.equal("email")
		expect(shelterCardWrapper.find('.shelterCardPhone').text()).to.equal("")
	})
})