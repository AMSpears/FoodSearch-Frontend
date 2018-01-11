import React from 'react'

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
					Home
				</Link>
				<Link to="/new-restaurant" onClick={props.onViewChange}>
					Add Restaurant
				</Link>

				{localStorage.token && localStorage.token.length > 10 ? (
					<Link to="/signout" onClick={props.onViewChange}>
						Sign Out
					</Link>
				) : (
					<Link to="/signin" onClick={props.onViewChange}>
						Sign In
					</Link>()
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
