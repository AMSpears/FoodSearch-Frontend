import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import TextInput from '../TextInput/TextInput'
import backend from '../BackendVariable'
import Section from '../Section/Section'
import './NewRestaurantForm.css'

class NewRestaurantForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			restaurant: {
				food: '',
				image_url: '',
				location: ''
			},
			errors: {},
			submitted: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}
	onChange(event) {
		const restaurant = this.state.restaurant
		restaurant[event.target.name] = event.target.value
		this.setState({ restaurant })
	}
	validate({}) {
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

			axios({
				method: 'POST',
				url: `${backend}api/restaurants/`,
				headers: { token: localStorage.token },
				data: {
					food: this.state.restaurant.food,
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
					this.props.setMessage('Restaurant created!')
					this.props.alertToggle(true)
					this.props.history.push(`/restaurants/${restaurantId}`)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	render() {
		const { errors, submitted } = this.state
		const { food, image_url, location } = this.state.restaurant
		let formDisplay = null
		if (localStorage.token && localStorage.token.length > 10) {
			if (submitted) {
				formDisplay = <h2> {this.props.confirmationMessage} </h2>
			} else {
				formDisplay = (
					<div>
						<div className="form-style">
							<TextInput
								labelName=" Type of Food"
								name="food"
								placeholder="Type of Food"
								onChange={this.onChange}
							/>
							<TextInput
								labelName="image_url"
								name="image_url"
								onChange={this.onChange}
							/>
							<TextInput
								labelName="City"
								name="location"
								required
								error={errors.location}
								onChange={this.onChange}
							/>

							<input type="submit" value="Save" onClick={this.onSubmit} />
						</div>
					</div>
				)
			}
		} else {
			formDisplay = (
				<p>You must be logged in if you want to save a restaurant</p>
			)
		}
		return (
			<Section>
				<div>{formDisplay}</div>
			</Section>
		)
	}
}

NewRestaurantForm.propTypes = {
	confirmationMessage: PropTypes.string,
	onSubmit: PropTypes.func.isRequired
}
NewRestaurantForm.defaultProps = {
	confirmationMessage: 'Restaurant saved!'
}
export default NewRestaurantForm
