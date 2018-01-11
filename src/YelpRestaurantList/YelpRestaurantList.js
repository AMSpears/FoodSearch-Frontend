import React, { Component } from 'react'
import axios from 'axios'
import $ from 'jquery'

import TextInput from '../TextInput/TextInput'
import Section from '../Section/Section'
import backend from '../BackendVariable'

class YelpRestaurantList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			restaurant: {
				term: '',
				location: ''
			},

			errors: {},
			submitted: false,
			yelpResults: []
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	handleFavorite(e) {
		console.log(e.currentTarget.name)
	}
	onChange(event) {
		this.setState({
			restaurant: {
				...this.state.restaurant,
				[event.target.name]: event.target.value
			}
		})
	}

	// onChange(event) {
	// 	console.log(event.target.value)
	// 	this.setState(
	// 		{
	// 			// name: event.target.value,
	// 			// image_url: event.target.value,
	// 			// location: event.target.value
	// 			term: event.target.value,
	// 			location: event.target.value
	// 		},
	// 		() => {
	// 			console.log(this.state.term)
	// 			console.log(this.state.location)
	// 		}
	// 	)
	// }
	componentDidMount() {
		axios.get(`${backend}api/search/`).then(response => {
			this.setState({
				term: this.state.restaurant.term,
				location: this.state.restaurant.location
			})
		})
	}
	onSubmit(event) {
		event.preventDefault()
		console.log(this.state.restaurant)
		axios({
			method: 'POST',
			url: `${backend}api/search/`,
			headers: { token: localStorage.token },
			data: this.state.restaurant
		})
			.then(response => {
				console.log(response)
				this.setState({
					yelpResults: response.data
				})
				// let restaurantId = response.data._id
				// this.props.retrieveRestaurants()
				// return restaurantId
			})
			// .then(restaurantId => {
			// 	this.props.setMessage('See results')
			// 	this.props.alertToggle(true)
			// 	this.props.history.push(`/restaurants/`)
			// })
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		console.log(this.state.yelpResults)
		const { errors } = this.state
		console.log(this.state.restaurant)
		let restaurants
		if (this.state.yelpResults.length > 0) {
			restaurants = this.state.yelpResults.map((restaurant, i) => {
				return (
					<Section>
						<div
							name={i}
							onClick={e => {
								this.handleFavorite(e)
							}}
						>
							<i className="fa fa-heart-o" aria-hidden="true" />
						</div>
						<div className="restaurants-list" key={i}>
							<h1>{restaurant.name}</h1>
							<img src={restaurant.image_url} />
							<h2> {restaurant.phone}</h2>
							<h2>{restaurant.location.city}</h2>
						</div>
					</Section>
				)
			})
		} else {
			restaurants = 'not loaded yet'
		}

		return (
			<Section>
				<div>
					<form className="form-style" onSubmit={this.onSubmit}>
						<TextInput
							htmlId="search-form"
							name="term"
							placeholder="Type of food"
							onChange={this.onChange}
						/>
						<TextInput
							htmlId="search-form"
							name="location"
							placeholder="located In"
							onChange={this.onChange}
						/>
						<input type="submit" value="Show Results" />
					</form>
				</div>
				<div>
					<h4> {restaurants}</h4>
				</div>
			</Section>
		)
	}
}

export default YelpRestaurantList
