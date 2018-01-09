import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import TextInput from '../TextInput/TextInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import backend from '../BackendVariable'
import Section from '../Section/Section'
import Alert from '../Alert/Alert'
import './SignUpForm.css'

class SignUpForm extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: {
				email: '',
				password: '',
				confirmPassword: ''
			},
			errors: {},
			submitted: false
		}
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
	}

	onChange(event) {
		const user = this.state.user
		user[event.target.name] = event.target.value
		this.setState({ user })
	}

	passwordStrength(password) {
		if (!password) return null
		if (password.length >= this.props.minPasswordLength) return 100
		const percentOfMinLength = parseInt(
			password.length / this.props.minPasswordLength * 100,
			10
		)
		return percentOfMinLength
	}

	validate({ email, password, confirmPassword }) {
		const errors = {}
		const { minPasswordLength } = this.props
		const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

		if (!email) errors.email = 'Email required.'
		if (!emailRegex.test(email)) errors.email = 'Email must be valid.'
		if (password.length < minPasswordLength)
			errors.password = `Password must be at least ${minPasswordLength} characters.`
		if (password !== confirmPassword) errors.password = `Passwords must match`

		this.setState({ errors })
		const formIsValid = Object.getOwnPropertyNames(errors).length === 0
		return formIsValid
	}

	onSubmit(event) {
		event.preventDefault()
		const formIsValid = this.validate(this.state.user)
		if (formIsValid) {
			this.props.onSubmit(this.state.user)
			this.setState({ submitted: true })
		}
		axios
			.post(`${backend}api/signup`, {
				email: this.state.user.email,
				password: this.state.user.password
			})
			.then(response => {
				localStorage.token = response.data.token
				this.props.setMessage('Signed in successfully!')
				this.props.alertToggle(true)
				this.props.retrieveRestaurants()
				this.props.history.push('/')
			})
			.catch(err => {
				this.props.setMessage('Sorry, unable to create account.')
				console.log(err)
			})
	}

	render() {
		const { errors, submitted } = this.state
		const { email, password, confirmPassword } = this.state.user

		return (
			<Section>
				<div className="form-style">
					<h2>Sign Up </h2>

					<TextInput
						htmlId="signup-form-email"
						labelName="Email"
						name="email"
						required
						error={errors.email}
						onChange={this.onChange}
					/>

					<PasswordInput
						htmlId="signup-form-password"
						name="password"
						strengthPercentage={this.passwordStrength(password)}
						showVisibilityToggle
						maxLength={24}
						error={errors.password}
						onChange={this.onChange}
					/>
					<PasswordInput
						htmlId="signup-form-password"
						name="confirmPassword"
						showVisibilityToggle
						maxLength={24}
						error={errors.password}
						onChange={this.onChange}
						labelName="Confirm Password"
					/>
					<input type="submit" value="Sign Up" onClick={this.onSubmit} />
					<div className="login-msg">
						<p>Already have an account?</p>
						<Link
							to="/signin"
							style={Object.assign({
								fontSize: '16px',
								fontWeight: 'bold',
								textDecoration: 'underline'
							})}
						>
							Sign In Here
						</Link>
					</div>
				</div>
			</Section>
		)
	}
}
SignUpForm.propTypes = {
	confirmationMessage: PropTypes.string,
	onSubmit: PropTypes.func.isRequired,
	minPasswordLength: PropTypes.number
}
SignUpForm.defaultProps = {
	confirmationMessage: <Alert msg={'Thanks for signing up!'} />,
	minPasswordLength: 8
}

export default SignUpForm
