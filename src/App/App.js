import React, { Component } from 'react'

import axios from 'axios'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'
import Header from '../Header/Header'
import LogInForm from '../LogInForm/LogInForm'
import LogOut from '../LogOut/LogOut'
import SignUpForm from '../SignUpForm/SignUpForm'
import RestaurantList from '../RestaurantList/RestaurantList'
import RestaurantShow from '../RestaurantShow/RestaurantShow'
import NewRestaurantForm from '../NewRestaurantForm/NewRestaurantForm'
import EditRestaurantForm from '../EditRestaurantForm/EditRestaurantForm'
import Section from '../Section/Section'
import YelpRestaurantList from '../YelpRestaurantList/YelpRestaurantList'
import UnfavoriteRestaurant from '../UnfavoriteRestaurant'

import backend from '../BackendVariable'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			restaurants: [],
			userId: '',
			alertOn: true,
			msg: ''
		}
		this.retrieveRestaurants = this.retrieveRestaurants.bind(this)
		this.alertToggle = this.alertToggle.bind(this)
		this.setMessage = this.setMessage.bind(this)
		this.onViewChange = this.onViewChange.bind(this)
	}
	retrieveRestaurants() {
		if (localStorage.token) {
			axios
				.get(`${backend}api/restaurants`, {
					headers: { token: localStorage.token }
				})
				.then(response => {
					this.setState({
						restaurants: response.data.restaurants,
						userId: response.data.userid
					})
				})
				.catch(err => {
					console.log(err)
				})
		} else {
			axios
				.get(`${backend}api/restaurants`)
				.then(response => {
					console.log('It works!')
					this.setState({
						restaurants: response.data.restaurants,
						userId: response.data.userid
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
	alertToggle(status) {
		this.setState({
			alertOn: status
		})
	}

	onViewChange() {
		this.alertToggle(false)
	}

	setMessage(message) {
		this.setState({
			msg: message
		})
	}

	componentDidMount() {
		this.retrieveRestaurants()
	}
	render() {
		return (
			<Router>
				<div className="App">
					<nav>
						<Header
							msg={this.state.msg}
							alertOn={this.state.alertOn}
							alertToggle={this.alertToggle}
							onViewChange={this.onViewChange}
						/>
					</nav>
					<main>
						<Switch>
							<Route
								path="/search"
								render={props => {
									return (
										<YelpRestaurantList
											retrieveRestaurants={this.retrieveRestaurants}
											onSubmit={() => console.log('Submitted!')}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											{...props}
										/>
									)
								}}
							/>
							<Route
								path="/new-restaurant"
								render={props => {
									return (
										<NewRestaurantForm
											retrieveRestaurants={this.retrieveRestaurants}
											onSubmit={() => console.log('Submitted!')}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											{...props}
										/>
									)
								}}
							/>
							<Route
								exact
								path="/restaurants"
								render={props => {
									return (
										<RestaurantList
											userId={this.state.userId}
											restaurants={this.state.restaurants}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											onViewChange={this.onViewChange}
											{...props}
										/>
									)
								}}
							/>
							<Route
								path="/restaurants/:id/delete"
								render={props => {
									return (
										<UnfavoriteRestaurant
											userId={this.state.userId}
											restaurants={this.state.restaurants}
											retrieveRestaurants={this.retrieveRestaurants}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											{...props}
										/>
									)
								}}
							/>
							<Route
								path="/restaurants/:id/edit"
								render={props => {
									return (
										<EditRestaurantForm
											retrieveRestaurants={this.retrieveRestaurants}
											userId={this.state.userId}
											restaurants={this.state.restaurants}
											onSubmit={() => console.log('Submitted!')}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											{...props}
										/>
									)
								}}
							/>
							<Route
								path="/restaurants/:id"
								render={props => {
									return (
										<RestaurantShow
											userId={this.state.userId}
											restaurants={this.state.restaurants}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											{...props}
										/>
									)
								}}
							/>
							<Route
								path="/signin"
								render={props => {
									return (
										<LogInForm
											{...props}
											onSubmit={() => console.log('submitted!')}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											retrieveRestaurants={this.retrieveRestaurants}
										/>
									)
								}}
							/>
							<Route
								path="/signup"
								render={props => {
									return (
										<SignUpForm
											{...props}
											onSubmit={() => console.log('submitted!')}
											msg={this.state.msg}
											alertOn={this.state.alertOn}
											alertToggle={this.alertToggle}
											setMessage={this.setMessage}
											retrieveRestaurants={this.retrieveRestaurants}
										/>
									)
								}}
							/>

							<Route
								path="/signout"
								render={props => {
									return <Section children={<LogOut {...props} />} />
								}}
								msg={this.state.msg}
								alertOn={this.state.alertOn}
								alertToggle={this.alertToggle}
								setMessage={this.setMessage}
							/>
							
							<Route
								path="/*"
								render={props => {
									return <Redirect to="/restaurants" />
								}}
							/>
						</Switch>
					</main>
				</div>
			</Router>
		)
	}
}

export default App
