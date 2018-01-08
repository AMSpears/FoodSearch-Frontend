import React from 'react'
import PropTypes from 'PropTypes'

const Label = ({ labelName, require }) => {
	let requiredStyle = { color: 'rgb(255,0,0)' }
	const fieldRequired = <span style={requiredStyle}>*</span>
	return (
		<label>
			{labelName} {required && fieldRequired}
		</label>
	)
}

label.PropTypes = {
	labelName: PropTypes.string.inRequired,
	required: PropTypes.bool
}

export default Label
