import React, { Component } from 'react'
import axios from 'axios'
import backend from './BackendVariable'

class UnfavoriteRestaurant extends Component {
	constructor(props) {
		super(props)
		this.deleteRestaurant = this.deleteRestaurant.bind(this)
	}

	logout() {
		this.props.history.push(`/`)
	}

	componentDidMount() {
		this.deleteRestaurant()
	}

	deleteRestaurant() {
		axios
			.delete(`${backend}api/restaurants/${this.props.match.params.id}`, {
				headers: { token: localStorage.token }
			})
			.then(response => {
				this.props.retrieveRestaurants()
			})
			.then(() => {
				this.props.setMessage('Restaurant deleted')
				this.props.alertToggle(true)
				this.props.history.push(`/`)
			})
			.catch(err => {
				console.log(err)
			})
	}

	render() {
		return (
			<div>
				<p>Deleting...</p>
			</div>
		)
	}
}

export default UnfavoriteRestaurant
