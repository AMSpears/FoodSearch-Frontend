import React, { Component } from 'react'
import axios from 'axios'
import Img from '../Img/background_picture.png'
import backend from '../BackendVariable'
import './YelpRestaurantList.css'

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
	onChange(event) {
		this.setState({
			restaurant: {
				...this.state.restaurant,
				[event.target.name]: event.target.value
			}
		})
	}
	//request to retrieve data from the backend 
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
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		let restaurants
		if (this.state.yelpResults.length > 0) {
			restaurants = this.state.yelpResults.map((restaurant, i) => {
				return (
					<div className="restaurant" key={i}>
						<div>
							<img src={restaurant.image_url} alt="Restaurant" />
							<a href={restaurant.url} target="_blank">
								<h1>{restaurant.name}</h1>
							</a>
							<h2>
								{restaurant.location.city}, {restaurant.location.state}
							</h2>
							<br />
							<h3 />
						</div>
					</div>
				)
			})
		} else {
			restaurants = <img src={Img} alt="logo" />
		} 
		
		return (
			<div>
				<form className="form-style" onSubmit={this.onSubmit}>
					<div className="search">
						<h3>Search Restaurants:</h3>
					</div>
					<div className="term-input">
						<input
							name="term"
							type="text"
							placeholder="Type of Food"
							onChange={this.onChange}
						/>
					</div>
					<div className="location-input">
						<input
							name="location"
							type="text"
							placeholder="Located In"
							onChange={this.onChange}
						/>
					</div>
					<button className="button" type="submit">
						Show Results
					</button>
				</form>
				<div>
					<div className="restaurant-list"> {restaurants}</div>
				</div>
			</div>
		)
	}
}

export default YelpRestaurantList
