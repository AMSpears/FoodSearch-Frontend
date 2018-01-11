import React, { Component } from 'react'
import axios from 'axios'

import TextInput from '../TextInput/TextInput'
import Section from '../Section/Section'
import backend from '../BackendVariable'

class YelpRestaurantList extends Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		restaurant: {
	// 			name: '',
	// 			image_url: '',
	// 			location: ''
	// 		},
	// 		errors: {},
	// 		submitted: false
	// 	}
	// 	this.onChange = this.onChange.bind(this)
	// 	this.onSubmit = this.onSubmit.bind(this)
	// }
	//
	// // onChange(event) {
	// // 	const restaurant = this.state.restaurant
	// // 	restaurant[event.target.name] = event.target.value
	// // 	this.setState({ restaurant })
	// // }
	//
	// onChange(event) {
	// 	console.log(event.target.value)
	// 	this.setState(
	// 		{
	// 			name: event.target.value,
	// 			image_url: event.target.value,
	// 			location: event.target.value
	// 		},
	// 		() => {
	// 			console.log(this.state.name)
	// 			console.log(this.state.location)
	// 		}
	// 	)
	// }
	// componentDidMount() {
	// 	axios.get(`${backend}api/search/`).then(response => {
	// 		this.setState({
	// 			restaurant: response.data,
	// 			restaurantId: response.data._id
	// 		})
	// 	})
	// }
	// validate({ name, image_url, location }) {
	// 	const errors = {}
	//
	// 	this.setState({ errors })
	// 	const formIsValid = Object.getOwnPropertyNames(errors).length === 0
	// 	return formIsValid
	// }
	// onSubmit(event) {
	// 	event.preventDefault()
	// 	const formIsValid = this.validate(this.state.name)
	// 	if (formIsValid) {
	// 		this.props.onSubmit(this.state.name)
	// 		this.setState({ submitted: true })
	//
	// 		// console.log(`sending query to backend: ${this.state.term}`)
	// 		axios({
	// 			method: 'POST',
	// 			url: `${backend}api/search/`,
	// 			data: {
	// 				name: this.state.restaurant.name,
	// 				image_url: this.state.restaurant.image_url,
	// 				location: this.state.restaurant.location
	// 			}
	// 			// data: {
	// 			// jSon={"jSon"}
	// 			// businesses {"Businesses"}
	// 		})
	// 			.then(response => {
	// 				console.log(response.data)
	// 				this.props.alertToggle(true)
	// 				this.setState({ restaurants: response.data }, () => {
	// 					console.log(this.state.restaurants)
	// 				})
	// 				this.props.history.push('/')
	// 			})
	// 			.catch(err => {
	// 				this.props.alertToggle(true)
	// 				console.log(err)
	// 			})
	// 	}
	// }
	render() {
		// const { errors } = this.state
		// const { term, location } = this.state.restaurant
		// console.log(this.state.restaurant)
		// let restaurant
		// if (this.state.restaurant.length > 0) {
		// 	restaurant = this.state.restaurants.map((restaurant, i) => {
		// 		return (
		// 			<div className="restaurants-list" key={i}>
		// 				<p className="restaurants">{restaurant.userId}</p>
		// 			</div>
		// 		)
		// 	})
		// } else {
		// 	restaurant = 'not loaded yet'
		// }

		return (
			<Section>
				<div>
					<div className="form-style">
						<TextInput
							htmlId="search-form"
							name="name"
							placeholder="Type of food"
							onChange={this.onChange}
						/>
						<TextInput
							htmlId="search-form"
							name="location"
							placeholder="located In"
							onChange={this.onChange}
						/>
						<input type="submit" value="Show Results" onClick={this.onSubmit} />
					</div>
				</div>
				{/* <div>
					<h4> {restaurant}</h4>
				</div> */}
			</Section>
		)
	}
}

export default YelpRestaurantList
