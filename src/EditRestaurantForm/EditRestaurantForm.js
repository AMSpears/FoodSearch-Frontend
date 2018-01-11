import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import TextInput from '../TextInput/TextInput'
import backend from '../BackendVariable'
import Section from '../Section/Section'
import './EditRestaurantForm.css'

class EditRestaurantForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			restaurant: {
				name: '',
				image_url: '',
				location: ''
			},
			errors: {},
			submitted: false,
			restaurantId: ''
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	onChange(event) {
		const restaurant = this.state.restaurant
		restaurant[event.target.name] = event.target.value
		this.setState({ restaurant })
	}
	componentDidMount() {
		axios
			.get(`${backend}api/restaurants/${this.props.match.params.id}`)
			.then(response => {
				this.setState({
					restaurant: response.data,
					restaurantId: response.data._id
				})
			})
	}

	validate({ name, image_url, location }) {
		const errors = {}

		this.setState({ errors })
		const formIsValid = Object.getOwnPropertyNames(errors).length === 0
		return formIsValid
	}
	onSubmit(event) {
		event.preventDefault()
		const formIsValid = this.validate(this.state.restaurant)
		if (formIsValid) {
			this.props.onSubmit(this.state.restaurant)
			this.setState({ submitted: true })
		}
		axios({
			method: 'PUT',
			url: `${backend}api/restaurants/${this.props.match.params.id}`,
			headers: { token: localStorage.token },
			data: {
				name: this.state.restaurant.name,
				image_url: this.state.restaurant.image_url,
				location: this.state.restaurant.location
			}
		})
			.then(response => {
				let restaurantId = response.data._id
				this.props.retrieveRestaurants()
				return restaurantId
			})
			.then(restaurantId => {
				this.props.setMessage('restaurant updated!')
				this.props.alertToggle(true)
				this.props.history.push(`/restaurants/${this.state.restaurantId}`)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		let restaurant = this.props.restaurants.find(
			restaurant => restaurant._id === this.props.match.params._id
		)
		if (!restaurant) {
			return (
				<Section>
					<div>
						<p>Loading...</p>
					</div>
				</Section>
			)
		} else {
			return (
				<Section>
					<div className="form-style">
						<h2> Edit </h2>
						<TextInput
							labelName=" Type of Food"
							name="name"
							defaultValue={restaurant.name}
							required
							placeholder="Type of Food"
							onChange={this.onChange}
							ref="name"
						/>
						<TextInput
							labelName="image_url"
							name="image_url"
							defaultValue={restaurant.image_url}
							onChange={this.onChange}
						/>
						<TextInput
							labelName="City"
							name="location"
							defaultValue={restaurant.location}
							required
							onChange={this.onChange}
						/>

						<input type="submit" value="Saved" onClick={this.onSubmit} />
					</div>
				</Section>
			)
		}
	}
}

EditRestaurantForm.propTypes = {
	confirmationMessage: PropTypes.string,
	onSubmit: PropTypes.func.isRequired
}
EditRestaurantForm.defaultProps = {
	confirmationMessage: 'Restaurant Edited!'
}
export default EditRestaurantForm
