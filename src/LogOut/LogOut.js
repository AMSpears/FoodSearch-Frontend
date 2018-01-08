import React, { Component } from 'react'

class LogOut extends Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
	}
	logout() {
		localStorage.token = ''
		this.props.history.push(`/`)
	}
	componentDidMount() {
		this.logout()
	}
	render() {
		return <div />
	}
}
export default LogOut
