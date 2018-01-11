import React, { Component } from 'react'
import RestaurantSummary from '../RestaurantSummary/RestaurantSummary'
import './RestaurantList.css'
import Section from '../Section/Section'

class RestaurantList extends Component {
	render() {
		let restaurants = this.props.restaurants.map((restaurant, i) => {
			return (
				<div className="restaurant-list" key={i}>
					<p className="restaurant" key={i}>
						{
							<RestaurantSummary
								restaurant={restaurant}
								onClick={this.props.onViewChange}
							/>
						}
					</p>
				</div>
			)
		})
		return (
			<Section>
				<div>
					<p>{restaurants}</p>
				</div>
			</Section>
		)
	}
}

export default RestaurantList
