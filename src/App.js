import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import Nav from './components/NavBar';
import CreateExercise from './components/CreateExercise';
import CreateUser from './components/CreateUser';

function App() {
	return (
		<div>
			<Router>
				<Nav />
				<Route path='/user' component={CreateUser} />
				<Route path='/create' component={CreateExercise} />
			</Router>
		</div>
	);
}

export default App;
