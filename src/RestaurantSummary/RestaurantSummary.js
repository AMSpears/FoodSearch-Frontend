import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RestaurantSummary.css'
import Section from '../Section/Section'

class RestaurantSummary extends Component {
	render() {
		return (
			<Section>
				<div className="restaurant-summary">
					<div className="favorite-button">
						<i className="fa fa-heart-o" aria-hidden="true" />
					</div>
					<Link
						className="content-link"
						to={`/restaurants/${this.props.restaurant._id}`}
					>
						<div className="restaurant-summary_description">
							<div className="restaurant-summary_details">
								<img src={this.props.restaurant.image_url} alt="Restaurant" />
								<h3>{this.props.restaurant.name}</h3>
								<h4>{this.props.restaurant.location}</h4>
							</div>
						</div>
					</Link>
				</div>
			</Section>
		)
	}
}

export default RestaurantSummary
