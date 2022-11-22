import React from 'react'
import { Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContexts'

// Only let people go places if theyre logged in
export default function PrivateRoute({ component: Component, ...rest }) {
	const { currentUser } = useAuth()
	return currentUser ? <Component /> : <Navigate to='/login' />
}