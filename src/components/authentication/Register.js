import React, { useRef, useState } from 'react'
import { Button, Form, Col, Row, Alert, Container } from 'react-bootstrap'
import DriverImage from '../../images/DriverTiaNorfleet.png'
import { useAuth } from '../../contexts/AuthContexts'
import CountrySelect from 'react-bootstrap-country-select';
import { Link, useNavigate } from 'react-router-dom'
import '../../css/style.css'

export default function Register() {
	//Create constants
	const emailReference = useRef()
	const forenameReference = useRef()
	const surnameReference = useRef()
	const passwordReference = useRef()
	const passwordConfirmReference = useRef()
	const { register, currentUser } = useAuth();
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [countryReference, setCountry] = useState(null);
	const navigate = useNavigate()
	const [branchReference, setBranch] = useState(null)

	//function to submit to the authentication service
	async function submitHandle(e) {
		e.preventDefault()
		setError('')
		//check if the two passwords match
		if (passwordReference.current.value !== passwordConfirmReference.current.value) {
			return setError('Passwords do not match')
		}
		if (countryReference === null) {
			return setError('Country is empty')
		}
		try {
			setError('')
			setLoading(true)
			await register(emailReference.current.value, passwordConfirmReference.current.value, forenameReference.current.value, surnameReference.current.value, countryReference, branchReference)
			console.log(currentUser);
			navigate('/user-profile')

		}
		catch (e) {
			console.log(e)
			var errorString = e.toString()
			if (errorString.includes('(auth/email-already-in-use)')) {
				setError('Email already exists. Login instead.')
			}
			else if (errorString.includes('(auth/weak-password)')) {
				setError('Password is too short. Must be at least 8 characters.')
			}
			else if (errorString.includes('(auth/invalid-email)')) {
				setError('Email is invalid.')
			}
			else {
				setError('Failed to create an account')
			}
		}
		setLoading(false)
	}

	const handleBranchChange = (e) => {
		setBranch(e.target.value)
	}

	// The code to return that gets displayed
	return (
		<div className='login-grad '>
			<Container className='d-flex align-items-center justify-content-center h-100' style={{ padding: '14vh 0px 14vh 0px' }}>
				<Row>

					{/* The picture of the person */}
					<Col md='4'>
						<img src={DriverImage} title='The Challenge' width='100%' />
					</Col>

					{/* The form */}
					<Col md='6'>
						<div style={{ maxWidth: '550px' }}>
							<h1 className='text-center mb-4'><b>Register for the Competition</b></h1>
							{error && <Alert variant='danger'>{error}</Alert>}

							{/* The form */}
							<Form onSubmit={submitHandle} style={{ marginBottom: '10px' }}>
								<Form.Group id='email' className='padding-bottom'>
									<Form.Control type='email' required ref={emailReference} placeholder='Email' id='auth-pad-10'></Form.Control>
								</Form.Group>
								<Row className='mb-3'>
									<Form.Group id='forename' as={Col}>
										<Form.Control type='text' required ref={forenameReference} placeholder='First Name' id='auth-pad-10'></Form.Control>
									</Form.Group>
									<Form.Group id='surname' as={Col}>
										<Form.Control type='text' required ref={surnameReference} placeholder='Last Name' id='auth-pad-10'></Form.Control>
									</Form.Group>
								</Row>
								<Form.Group id='password' className='padding-bottom'>
									<Form.Control type='password' required ref={passwordReference} placeholder='Password' id='auth-pad-10'></Form.Control>
								</Form.Group>
								<Form.Group id='passwordConfirm' className='padding-bottom'>
									<Form.Control type='password' required ref={passwordConfirmReference} placeholder='Confirm Password' id='auth-pad-10'></Form.Control>
								</Form.Group>
								<Form.Group id='country' className='padding-bottom'>
									<CountrySelect value={countryReference} onChange={setCountry} matchNameFromStart={false} matchAbbreviations required />
								</Form.Group>
								<Form.Group id='branch' className='branch-box'>
									<Form.Label><b>Select Branch</b></Form.Label>
									{['radio'].map((type) => (
										<div key={`inline-${type}`} className="mb-3">
											<Form.Check
												inline
												label="Driving"
												name="group1"
												type={type}
												id={`inline-${type}-1`}
												required
												onChange={handleBranchChange}
												value='Driving'
											/>
											<Form.Check
												inline
												disabled
												label="Engineering"
												name="group1"
												type={type}
												id={`inline-${type}-2`}
												required
												onChange={handleBranchChange}
												value='Engineering'
											/>
										</div>
									))}
								</Form.Group>
								<Form.Group>
									<Button disabled={loading} className='w-100 auth-pad-15' type='submit' id='auth-pad-15'>REGISTER</Button>
								</Form.Group>
							</Form>
							<div style={{ color: 'white' }}>
								Already have an account? <Link to='/login' className='text-link'>Login</Link>.
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}
