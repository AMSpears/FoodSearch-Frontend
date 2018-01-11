import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import backend from '../BackendVariable'
import './RestaurantShow.css'
import Section from '../Section/Section'

class RestaurantShow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			restaurant: {
				id: '',
				owner_id: '',
				food: '',
				image_url: '',
				location: ''
			},
			errors: {},
			submitted: false,
			restaurantId: ''
		}
		this.getRestaurant = this.getRestaurant.bind(this)
	}
	componentDidMount() {
		this.getRestaurant()
	}
	getRestaurant() {
		axios
			.get(`${backend}api/restaurants/${this.props.match.params.id}`)
			.then(response => {
				this.setState({
					restaurant: response.data,
					restaurantId: response.data._id
				})
			})
	}

	render() {
		if (this.state.restaurant._id) {
			return (
				<Section>
					<div>
						<div className="restaurant-show">
							<div className="image">
								<h1>{this.state.restaurant.image_url}</h1>
							</div>
							<h1>{this.state.restaurant.food}</h1>
							<h3>{this.state.restaurant.location}</h3>
							<div className="button">
								<Link to={`/restaurants/${this.state.restaurant._id}/edit`}>
									Edit
								</Link>
								<Link to={`/restaurants/${this.state.restaurant._id}/delete`}>
									Delete
								</Link>
							</div>
						</div>
					</div>
				</Section>
			)
		} else {
			return (
				<Section>
					<p>Only User can access information</p>
				</Section>
			)
		}
	}
}

export default RestaurantShow
