import React, { useContext, useEffect, useState } from 'react'
import { auth, database } from '../database/Firebase'
import { doc, setDoc, updateDoc } from 'firebase/firestore'

const AuthContext = React.createContext()

export function useAuth() {
	return useContext(AuthContext)
}

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)
	const [currentUserData, setCurrentUserData] = useState()

	async function register(email, password, UserForename, UserSurname, UserCountry, UserBranch) {
		const doAuth = auth.createUserWithEmailAndPassword(email, password)
		auth.onAuthStateChanged(user => {
			if (user.uid !== null) {
				setDoc(doc(database, 'users', user.uid), {
					branch: UserBranch,
					country: UserCountry,
					forename: UserForename,
					surname: UserSurname
				}).then(response => {
					console.log(response)
				}).catch(err => {
					console.log(err.message)
				})
			}
		})
		return doAuth
	}

	function logout() {
		return auth.signOut()
	}

	function resetPassword(email) {
		return auth.sendPasswordResetEmail(email)
	}

	function updateEmail(email) {
		return currentUser.updateEmail(email)
	}

	function updatePassword(password) {
		return currentUser.updatePassword(password)
	}

	async function updateForename(newForename) {
		const updateForename = await updateDoc(doc(database, 'users', currentUser.uid), { forename: newForename })
		return updateForename
	}

	async function updateSurname(newSurname) {
		const updateSurname = await updateDoc(doc(database, 'users', currentUser.uid), { surname: newSurname })
		return updateSurname
	}

	async function updateCountry(newCountry) {
		const updateCountry = await updateDoc(doc(database, 'users', currentUser.uid), { country: newCountry })
		return updateCountry
	}

	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	useEffect(() => {
		const stopListen = auth.onAuthStateChanged(user => {
			setCurrentUser(user)
			setLoading(false)
		})
		return stopListen
	}, [])


	const value = { currentUser, currentUserData, register, login, logout, resetPassword, updateEmail, updatePassword, updateForename, updateSurname, updateCountry }
	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	)
}
