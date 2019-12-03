import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
		};
	}

	onChangeUsername = e => {
		this.setState({
			username: e.target.value,
		});
	};

	onSubmit = async e => {
		e.preventDefault();

		const newUser = {
			username: this.state.username,
		};

		try {
			let result = await axios.post(
				'http://10.119.170.245:5000/users/add',
				newUser,
			);
			result = result.data;
			console.log('RESULT ', result);
		} catch (error) {
			console.error(error);
		}

		this.setState({
			username: '',
		});
	};

	render() {
		return (
			<div className='main-page-container'>
				<h3>Create New User</h3>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Username: </label>
						<input
							type='text'
							required
							className='form-control'
							value={this.state.username}
							onChange={this.onChangeUsername}
						/>
					</div>
					<div className='form-group'>
						<input
							type='submit'
							value='Create User'
							className='btn btn-primary'
						/>
					</div>
				</form>
			</div>
		);
	}
}
