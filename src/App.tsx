import React from 'react'
import './styles/global.scss'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/screens/Home/Home'
function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<Navigate to={"/users"} replace/>} />
				<Route path='/users' element={<Home />} />
				<Route path='/users/:id' element={<div>Product page</div>} />

				<Route path='*' element={<div>Not found</div>} />
			</Routes>
		</div>
	)
}

export default App
