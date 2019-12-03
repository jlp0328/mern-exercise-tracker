import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component {
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
	async componentDidMount() {
		try {
			const update = await axios.get(
				`http://10.119.170.245:5000/exercises/${this.props.match.params.id}`,
			);

			this.setState({
				username: update.data.username,
				description: update.data.description,
				duration: update.data.duration,
				date: new Date(update.data.date),
			});

			this.getUsers();
		} catch (error) {
			console.error(error);
		}
	}

	getUsers = async () => {
		try {
			const usersResults = await axios.get('http://10.119.170.245:5000/users');

			if (usersResults.data.length > 0) {
				this.setState({
					users: usersResults.data.map(user => user.username),
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

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

		await axios.post(
			`http://10.119.170.245:5000/exercises/update/${this.props.match.params.id}`,
			exercise,
		);

		window.location = '/';
	};

	render() {
		return (
			<div className='main-page-container'>
				<h3>Edit Exercise Log</h3>
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
							value='Edit Exercise Log'
							className='btn btn-primary'
						/>
					</div>
				</form>
			</div>
		);
	}
}
