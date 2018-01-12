import React from 'react'

import { Link } from 'react-router-dom'
import Img from '../Img/FS-logo.png'
import './Header.css'

const Header = () => {
	return (
		<div className="navs">
			<Link to="/">
				<img className="logo" src={Img} alt="logo" />
			</Link>
			<h2>Food Search </h2>
		</div>
	)
}

export default Header
