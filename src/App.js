import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Nav from './components/NavBar';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';
import ExerciseList from './components/ExerciseList';
import EditExercise from './components/EditExercise';

function App() {
	return (
		<Router>
			<Nav />
			<Route exact path='/' component={ExerciseList} />
			<Route path='/user' component={CreateUser} />
			<Route path='/create' component={CreateExercise} />
			<Route path='/edit/:id' component={EditExercise} />
		</Router>
	);
}

export default App;
