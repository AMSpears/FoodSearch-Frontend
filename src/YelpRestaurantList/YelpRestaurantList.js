// import React, { Component } from 'react'
// import axios from 'axios'
//
// import TextInput from '../TextInput/TextInput'
// import Section from '../Section/Section'
// import backend from '../BackendVariable'
// // import './RestaurantList.css'
//
// class RestaurantList extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			restaurant: {
// 				term: '',
// 				location: ''
// 			},
// 			errors: {},
// 			submitted: false
// 		}
// 		this.onChange = this.onChange.bind(this)
// 		this.onSubmit = this.onSubmit.bind(this)
// 	}
//
// 	// onChange(event) {
// 	// 	const restaurant = this.state.restaurant
// 	// 	restaurant[event.target.name] = event.target.value
// 	// 	this.setState({ restaurant })
// 	// }
//
// 	onChange(event) {
// 		console.log(event.target.value)
// 		this.setState(
// 			{
// 				term: event.target.value,
// 				location: event.target.value
// 			},
// 			() => {
// 				console.log(this.state.term)
// 				console.log(this.state.location)
// 			}
// 		)
// 	}
// 	validate({ term, location }) {
// 		const errors = {}
//
// 		if (!term) errors.term = 'Input required'
// 		this.setState({ errors })
// 		const formIsValid = Object.getOwnPropertyNames(errors).length === 0
// 		return formIsValid
// 	}
// 	onSubmit(event) {
// 		event.preventDefault()
// 		const formIsValid = this.validate(this.state.term)
// 		if (formIsValid) {
// 			this.props.onSubmit(this.state.term)
// 			this.setState({ submitted: true })
// 		}
//
// 		console.log(`sending query to backend: ${this.state.term}`)
// 		console.log(`sending query to backend: ${this.state.location}`)
//
// 		axios
// 			.post(`${backend}api/restaurants/`, {
// 				term: this.state.term,
// 				location: this.state.location
// 			})
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
//
// 	render() {
// 		// const { errors, submitted } = this.state
// 		// const { term, location } = this.state
// 		console.log(this.state.restaurants)
// 		let restaurants
// 		if (this.state.restaurant.length > 0) {
// 			restaurants = this.state.restaurants.map((restaurant, i) => {
// 				return (
// 					<div className="restaurants-list" key={i}>
// 						<p className="restaurants">{restaurant.term}</p>
// 					</div>
// 				)
// 			})
// 		} else {
// 			restaurants = 'not loaded yet'
// 		}
//
// 		return (
// 			<Section>
// 				<div>
// 					<div className="form-style">
// 						<TextInput
// 							htmlId="search-form"
// 							name="term"
// 							labelName="term"
// 							placeholder="e.g. Cava"
// 							onChange={this.onChange}
// 						/>
// 						<TextInput
// 							htmlId="search-form"
// 							labelName="location"
// 							name="location"
// 							placeholder="e.g. manassas"
// 							onChange={this.onChange}
// 						/>
// 						<input type="submit" value="Show Results" onClick={this.onSubmit} />
// 					</div>
// 				</div>
// 				<div>
// 					<h4> {restaurants}</h4>
// 				</div>
// 			</Section>
// 		)
// 	}
// }
//
// export default RestaurantList
