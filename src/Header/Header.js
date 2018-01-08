import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Alert from '../Alert/Alert'
import './Header.css'

const Header = ({ ...props }) => {
	return (
		<div className="navs">
			<div className="logo">
				<Link to="/"> Logo</Link>
			</div>
			<div className="nav_links">
				<Link to="/" onClick={props.onViewChange}>
					Restaurants
				</Link>
				<Link to="/" onClick={props.onViewChange}>
					Saved Restaurants
				</Link>

				{localStorage.token && localStorage.token.length > 10 ? (
					<Link to="/logout" onClick={props.onViewChange}>
						Log Out
					</Link>
				) : (
					<Link to="/Login" onClick={props.onViewChange}>
						Log In
					</Link>
				)}
				<Link to="/signup" onClick={props.onViewChange}>
					Sign Up
				</Link>
			</div>
			{props.alertOn ? <Alert msg={props.msg} /> : <p />}
		</div>
	)
}

export default Header
