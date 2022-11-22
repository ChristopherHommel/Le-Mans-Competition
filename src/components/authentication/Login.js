import React, { useRef, useState } from 'react'
import { Row, Col, Button, Form, Alert, Container } from 'react-bootstrap'
import DriverImage from '../../images/DriverTiaNorfleet.png'
import { useAuth } from '../../contexts/AuthContexts'
import { Link, useNavigate } from 'react-router-dom'

import '../../css/style.css'

export default function Login(props) {
	//Create constants
	const emailReference = useRef()
	const passwordReference = useRef()
	const { login } = useAuth();
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	console.log(props.title)

	//function to submit to the authentication service
	async function submitHandle(e) {
		e.preventDefault()
		setError('')
		try {
			setError('')
			setLoading(true)
			await login(emailReference.current.value, passwordReference.current.value)
			navigate('/user-profile')
		}
		catch (err) {
			console.log(err)
			setError('Failed to sign in')
		}
		setLoading(false)
	}

	// Code returned to be displayed
	return (
		<>
			{/* Container */}
			<div className='login-grad h-100'>
				<Container className='d-flex align-items-center justify-content-center h-100 auth-pad'>
					<Row>

						{/* The picture of the person */}
						<Col md='4'>
							<img src={DriverImage} title='The Challenge' width='100%' />
						</Col>

						{/* The form */}
						<Col md='6' className='justify-content-center d-flex align-items-center'>
							<div style={{ maxWidth: '550px' }}>
								<h1 className='text-center mb-4'><b>{!props.title && 'Enter the Driver Dashboard'}</b></h1>
								<h1 className='text-center mb-4'><b>{props.title && props.title}</b></h1>
								{error && <Alert variant='danger'>{error}</Alert>}

								{/* The form */}
								<Form onSubmit={submitHandle}>
									<Row>
										<Col md>
											<Form.Group id='email' className='padding-bottom'>
												<Form.Control type='email' required ref={emailReference} placeholder='Email' className='auth-pad-10'></Form.Control>
											</Form.Group>
										</Col>
										<Col md>
											<Form.Group id='password' className='padding-bottom'>
												<Form.Control type='password' required ref={passwordReference} placeholder='Password' className='auth-pad-10'></Form.Control>
											</Form.Group>
										</Col>
									</Row>
									<Form.Group>
										<Button disabled={loading} className='w-100 auth-pad-15' type='submit'>Login</Button>
									</Form.Group>
								</Form>

								{/* The links to go places */}
								<Row className='mt-3'>
									<Col style={{ color: 'white' }}>
										<div>
											Need an account? <Link to='/register' style={{ textDecoration: 'underline', color: 'white' }}>Register here</Link>.
										</div>
									</Col>
									<Col>
										<div style={{ float: 'right' }}>
											<Link to='/forgot-password' style={{ textDecoration: 'underline', color: 'white' }}>Forgot password?</Link>
										</div>
									</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	)
}
