import React, { Component } from 'react'
import Header from '../Header/Header'
import LogInForm from '../LogInForm/LogInForm'
import LogOut from '../LogOut/LogOut'
import SignUpFrom from '../SignUpForm/SignUpForm'
import RestaurantList from '../RestaurantList/RestaurantList'
import RestaurantSummary from '../RestaurantSummary/RestaurantSummary'
import Section from '../Section/Section'
import UnfavoritedRestaurant from '../UnfavoritedRestaurant'
import axios from 'axios'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'
import backend from '../BackendVariable'
import './App.css'

class App extends Component {
	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Restaurants</h1>
				</header>
			</div>
		)
	}
}

export default App
