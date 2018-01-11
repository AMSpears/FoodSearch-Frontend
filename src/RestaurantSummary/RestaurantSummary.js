import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './RestaurantSummary.css'

class RestaurantSummary extends Component {
	render() {
		return (
			<div className="restaurant-summary">
				<Link
					className="content-link"
					to={`/restaurants/${this.props.restaurant._id}`}
				>
					<div className="restaurant-summary__description">
						<div className="restaurant-summary__address">
							<p>
								{this.props.restaurant.image_url}
								{this.props.restaurant.food}, <br />
								{this.props.restaurant.location}
							</p>
						</div>
					</div>
				</Link>
			</div>
		)
	}
}

export default RestaurantSummary
