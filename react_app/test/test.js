import React from 'react'
import { expect, assert } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme'
import { Splash } from '../js/splash.jsx'
import ModelPage from '../js/modelpage.jsx'
import { NavBar } from '../js/navbar.jsx'
import Reviews from '../js/reviews.jsx'
import Adapter from 'enzyme-adapter-react-16';
import DogCard from '../js/dogcards.jsx'

Enzyme.configure({ adapter: new Adapter() });

const splashWrapper = shallow(<Splash/>)
const modelWrapper = shallow(<ModelPage/>)
const navbarWrapper = shallow(<NavBar/>)
const jsonReviews = { adoption_policy:"test", mission:"test" }
const reviewsWrapper = shallow(<Reviews desc = {jsonReviews} />)


describe('Splash Component', () => {
	it('render splash', () => {
		expect(splashWrapper).to.have.length(1)
	})
})

describe('Model Component', () => {
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