import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Button, Alert } from 'react-bootstrap';
import { database } from '../database/Firebase'
import { doc, getDoc } from 'firebase/firestore'
import thrill_capital from '../images/thrillcapital-logo.png';

import '../css/style.css';
import { useAuth } from '../contexts/AuthContexts'

function NavBar() {
	const navigate = useNavigate()
	const [error, setError] = useState('')
	const { currentUser, logout } = useAuth()

	const [currentUserData, setCurrentUserData] = useState({ forename: '', surname: '', country: '', branch: '' })

	async function getUserData(user) {
		const userData = await getDoc(doc(database, 'users', user))
		setCurrentUserData(userData.data())
	}

	useEffect(() => {
		if (currentUser !== null) { getUserData(currentUser.uid) }
	}, [])

	async function handleLogout() {
		setError('')
		try {
			await logout()
			navigate('/login')
		}
		catch {
			setError('Failed to log out.')
		}
	}

	function handleLogin() {
		navigate('/login')
	}
	console.log(currentUserData.forename)
	return (
		<>
			{error && <Alert variant='danger'>{error}</Alert>}
			<Navbar className='fixed-top' collapseOnSelect expand='xl' bg='light' variant='default' style={{ padding: '0px 80px 0px 80px' }}>
				<Container fluid>
					<Navbar.Brand href='https://thrillcapital.com'>
						<img src={thrill_capital} className='perrinn-logo' maxHeight={'80'} alt='Perrinn Logo' />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav' />
					<Navbar.Collapse id='responsive-navbar-nav align-middle' style={{ padding: '20px' }}>
						<Nav className='justify-content-end' style={{ width: "100%", justifyContent: 'center' }}>
							<Nav.Item>
								<Nav.Link href='/home' id='nav-link'>HOME</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href='/competition' id='nav-link'>COMPETITION</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href='/leaderboard' id='nav-link'>LEADERBOARD</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href='/about' id='nav-link'>ABOUT</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href='/download' id='nav-link'>DOWNLOAD SIM</Nav.Link>
							</Nav.Item>
							<Nav.Item>
								<Nav.Link href='/support' id='nav-link'>SUPPORT</Nav.Link>
							</Nav.Item>
							{currentUser === null &&
								<Nav.Item className='d-flex align-items-center'>
									<Button variant='outline-primary' onClick={handleLogin}>Login/Register</Button>
								</Nav.Item>
							}
							{currentUser !== null &&
								<NavDropdown title={(currentUserData.forename).toUpperCase() + ' '} menuVariant="default" id='nav-link'>
									<NavDropdown.Item href='/user-profile'>Leaderboard</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item href="/update-profile">Manage Account</NavDropdown.Item>
									<NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
								</NavDropdown>
							}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	)
}

export default NavBar;