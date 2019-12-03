import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			description: '',
			duration: 0,
			date: new Date(),
			users: [],
		};
	}

	async componentWillMount() {
		try {
			let usersResults = await axios.get('http://10.119.170.245:5000/users');

			if (usersResults.data.length > 0) {
				this.setState({
					users: usersResults.data.map(user => user.username),
					username: usersResults.data[0].username,
				});
			}
		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.setState({
			users: ['jamie', 'jd', 'kim'],
			username: 'test',
		});
	}

	onChangeUsername = e => {
		this.setState({
			username: e.target.value,
		});
	};

	onChangeDescription = e => {
		this.setState({
			description: e.target.value,
		});
	};

	onChangeDuration = e => {
		this.setState({
			duration: e.target.value,
		});
	};

	onChangeDate = date => {
		this.setState({
			date: date,
		});
	};

	onSubmit = async e => {
		e.preventDefault();

		const exercise = {
			username: this.state.username,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.date,
		};

		try {
			let result = await axios.post(
				'http://10.119.170.245:5000/exercises/add',
				exercise,
			);
			console.log(result.data);
		} catch (e) {
			console.error(e);
		}

		window.location = '/';
	};

	render() {
		return (
			<div className='main-page-container'>
				<h3>Create New Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className='form-group'>
						<label>Username: </label>
						<select
							ref='userInput'
							required
							className='form-control'
							value={this.state.username}
							onChange={this.onChangeUsername}>
							{this.state.users.map(function(user) {
								return (
									<option key={user} value={user}>
										{user}
									</option>
								);
							})}
						</select>
					</div>
					<div className='form-group'>
						<label>Description: </label>
						<input
							type='text'
							required
							className='form-control'
							value={this.state.description}
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className='form-group'>
						<label>Duration (in minutes): </label>
						<input
							type='text'
							className='form-control'
							value={this.state.duration}
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className='form-group'>
						<label>Date: </label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>

					<div className='form-group'>
						<input
							type='submit'
							value='Create Exercise Log'
							className='btn btn-primary'
						/>
					</div>
				</form>
			</div>
		);
	}
}
