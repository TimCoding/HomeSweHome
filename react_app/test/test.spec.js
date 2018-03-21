import React from 'react'
import { expect } from 'chai'
import Enzyme, { shallow, mount } from 'enzyme'
import { Splash } from '../js/splash.jsx'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const wrapper = shallow(<Splash/>)

describe('Splash Component', () => {
	it('render splash', () => {
		expect(wrapper).to.have.length(1)
	})
})
