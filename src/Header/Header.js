import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = ({ ...props }) => {
	return (
		<div className="navs">
			<div className="logo">
				<Link to="/"> Logo</Link>
			</div>
			<div className="nav_links">
				<Link to="/">Restaurants</Link>
				<Link to="/">Saved Restaurants</Link>
				<Link to="/logout"> Log Out </Link>
				<Link to="/Login"> Log In </Link>
			</div>
		</div>
	)
}

export default Header
