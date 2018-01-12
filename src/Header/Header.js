import React from 'react'

import { Link } from 'react-router-dom'
import Img from '../Img/FS-logo.png'
import './Header.css'

const Header = ({ ...props }) => {
	return (
		<div className="navs">
			<Link to="/">
				<img className="logo" src={Img} alt="logo" />
			</Link>
		</div>
	)
}

export default Header
