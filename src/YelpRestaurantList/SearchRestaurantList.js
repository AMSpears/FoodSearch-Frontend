// import React, { Component } from 'react'
// import axios from 'axios'
// import $ from 'jquery'
//
// import TextInput from '../TextInput/TextInput'
// import Section from '../Section/Section'
// import backend from '../BackendVariable'
//
// class SearchRestaurantList {
// 	constructor(props) {
// 		super(props)
// 		this.setState = {
// 			term: '',
// 			restaurants: {}
// 		}
// 	}
//
// 	handleChange(e) {
// 		this.setState({
// 			term: e.target.value
// 		})
// 	}
// 	handleSearch(e) {
// 		e.preventDefault()
// 		let url = `${backend}api/search/` + this.state.term
// 		$.ajax({
// 			url,
// 			method: 'GET',
// 			dataType: 'jsonp'
// 		}).then(response => {
// 			this.setState({ term: response })
// 		})
// 	}
// }
