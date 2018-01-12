import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch
} from 'react-router-dom'

import Header from '../Header/Header'
import YelpRestaurantList from '../YelpRestaurantList/YelpRestaurantList'
import './App.css'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			restaurants: [],
			userId: '',
			alertOn: true
		}

		this.alertToggle = this.alertToggle.bind(this)
		this.onViewChange = this.onViewChange.bind(this)
	}

	alertToggle(status) {
		this.setState({
			alertOn: status
		})
	}

	onViewChange() {
		this.alertToggle(false)
	}

	render() {
		return (
			<Router>
				<div className="App">
					<nav>
						<Header
							alertOn={this.state.alertOn}
							alertToggle={this.alertToggle}
							onViewChange={this.onViewChange}
						/>
					</nav>
					<Switch>
						<Route
							path="/"
							render={props => {
								return (
									<YelpRestaurantList
										alertOn={this.state.alertOn}
										alertToggle={this.alertToggle}
										{...props}
									/>
								)
							}}
						/>

						<Route
							path="/*"
							render={props => {
								return <Redirect to="/restaurants" />
							}}
						/>
					</Switch>
				</div>
			</Router>
		)
	}
}

export default App
