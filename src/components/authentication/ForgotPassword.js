import React, { useRef, useState } from 'react'
import { Row, Col, Button, Form, Alert, Container } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContexts'
import { Link } from 'react-router-dom'
import DriverImage from '../../images/DriverTiaNorfleet.png'
import '../../css/style.css'

export default function ForgotPassword() {
	//Create constants
	const emailReference = useRef()
	const { resetPassword } = useAuth();
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	//function to submit to the authentication service
	async function submitHandle(e) {
		e.preventDefault()
		setError('')
		try {
			setError('')
			setMessage('')
			setLoading(true)
			await resetPassword(emailReference.current.value)
			setMessage('Check your inbox for futher instructions')
		}
		catch {
			setError('Failed to reset password')
		}
		setLoading(false)
	}

	return (
		<>
			<div className='login-grad '>
				{/* Container for the login form bootstrap to make it centred */}
				<Container className='d-flex align-items-center justify-content-center h-100 auth-pad'>
					<Row>
						{/* The picture */}
						<Col md='4'>
							<img src={DriverImage} title='The Challenge' width='100%' />
						</Col>

						{/* The login form */}
						<Col md='6' className='justify-content-center d-flex align-items-center'>
							<div className='w-100'>
								<h1 className='text-center mb-4'><b>Reset Password</b></h1>
								{/* Show error if one happens */}
								{error && <Alert variant='danger'>{error}</Alert>}
								{message && <Alert variant='success'>{message}</Alert>}

								{/* The form */}
								<Form onSubmit={submitHandle}>
									<Form.Group id='email' className='padding-bottom'>
										<Form.Control type='email' required ref={emailReference} placeholder='Email' className='auth-pad-10'></Form.Control>
									</Form.Group>
									<Form.Group>
										<Button disabled={loading} className='w-100 auth-pad-15' type='submit' >Reset Password</Button>
									</Form.Group>
								</Form>

								{/* Links to go to other places */}
								<Row className='mt-3'>
									<Col style={{ color: 'white' }}>
										<div>
											Need an account? <Link to='/register' className='text-link'>Register here</Link>.
										</div>
									</Col>
									<Col>
										<div style={{ float: 'right' }}>
											<Link to='/login' className='text-link'>Login</Link>
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
