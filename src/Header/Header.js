import React from 'react'

import { Link } from 'react-router-dom'

import Alert from '../Alert/Alert'
import './Header.css'

const Header = ({ ...props }) => {
	return (
		<div className="navs">
			<Link to="/">
				<h1>logo</h1>
			</Link>
			<div className="navs_links">
				<Link to="/" onClick={props.onViewChange}>
					Home
				</Link>
				<Link to="/new-restaurant" onClick={props.onViewChange}>
					Add Restaurant
				</Link>
				
				{localStorage.token && localStorage.token.length > 0 ? (
					<Link to="/signout" onClick={props.onViewChange}>
						SingOut
					</Link>
				) : (
					<Link to="/signin" onClick={props.onViewChange}>
						SignIn
					</Link>
				)}
			</div>

			{props.alertOn ? <Alert msg={props.msg} /> : <p />}
		</div>
	)
}

export default Header
