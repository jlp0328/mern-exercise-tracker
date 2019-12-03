import React, { Component, Link } from 'react';
import Exercise from './Exercise';
import axios from 'axios';

export default class ExerciseList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exercises: [],
		};
	}

	async componentDidMount() {
		try {
			let exerciseList = await axios.get(
				'http://10.119.170.245:5000/exercises',
			);

			this.setState({
				exercises: exerciseList.data,
			});
		} catch (error) {
			console.error(error);
		}
	}

	deleteExercise = async id => {
		try {
			await axios.delete('http://10.119.170.245:5000/exercises/' + id);

			this.setState({
				exercises: this.state.exercises.filter(el => el._id !== id),
			});
		} catch (error) {
			console.error(error);
		}
	};

	exerciseList = () => {
		return this.state.exercises.map(current => {
			return (
				<Exercise
					exercise={current}
					deleteExercise={this.deleteExercise}
					key={current._id}
				/>
			);
		});
	};

	render() {
		return (
			<div className='main-page-container'>
				<h3>Logged Exercises</h3>
				<table className='table'>
					<thead className='thead-light'>
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exerciseList()}</tbody>
				</table>
			</div>
		);
	}
}
