import React, { useRef, useState, useEffect } from 'react'
import { Card, Button, Form, Col, Row, Alert, Container } from 'react-bootstrap'
import DriverImage from '../../images/DriverTiaNorfleet.png'
import { useAuth } from '../../contexts/AuthContexts'
import CountrySelect from 'react-bootstrap-country-select';
import { Link, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { database } from '../../database/Firebase'


export default function Register() {
	//Create constants
	const emailReference = useRef()
	const forenameReference = useRef()
	const surnameReference = useRef()
	const passwordReference = useRef()
	const passwordConfirmReference = useRef()
	const branchReference = useRef()
	const { currentUser, updatePassword, updateEmail, updateForename, updateSurname, updateCountry } = useAuth();
	const [currentUserData, setCurrentUserData] = useState({ forename: '', surname: '', country: '', branch: '' })
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const [countryReference, setCountryValue] = useState('');
	const navigate = useNavigate()


	useEffect(() => {
		getUserData(currentUser.uid)
		setCountryValue(currentUserData.country.id)
	}, [])

	async function getUserData(user) {
		const userData = await getDoc(doc(database, 'users', user))
		setCurrentUserData(userData.data())
		
	}

	//function to submit to the authentication service
	function submitHandle(e) {
		e.preventDefault()
		setError('')
		setLoading(true)
		//check if the two passwords match
		if (passwordReference.current.value !== passwordConfirmReference.current.value) {
			return setError('Passwords do not match')
		}
		if (countryReference === null) {
			return setError('Country is empty')
		}

		const promises = []
		if (emailReference !== currentUser.email) {
			promises.push(updateEmail(emailReference.current.value))
		}
		if (passwordReference.current.value) {
			promises.push(updatePassword(passwordReference.current.value))
		}
		if (forenameReference.current.value) {
			promises.push(updateForename(forenameReference.current.value))
		}
		if (surnameReference.current.value) {
			promises.push(updateSurname(surnameReference.current.value))
		}
		if (countryReference) {
			promises.push(updateCountry(countryReference))
		}

		Promise.all(promises).then(() => {
			navigate('/user-profile')
		}).catch(() => {
			setError('Failed to update profile')
		}).finally(() => {
			setLoading(false)
		})
	}

	return (
		<div className='login-grad '>
			<Container className='d-flex align-items-center justify-content-center h-100 auth-pad'>
				<Row>

					{/* The picture of the person */}
					<Col md='4'>
						<img src={DriverImage} title='The Challenge' width='100%' />
					</Col>

					{/* The form */}
					<Col md='6'>
						<div className='w-100'>
						<h1 className='text-center mb-4'><b>Update Profile</b></h1>
							{error && <Alert variant='danger'>{error}</Alert>}
							<Form onSubmit={submitHandle}>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={2}>
										<b>Email:</b>
									</Form.Label>
									<Form.Group id='email' as={Col}>
										<Form.Control type='email' required ref={emailReference} placeholder='Email' margin='dense' defaultValue={currentUser.email}></Form.Control>
									</Form.Group>
								</Form.Group>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={3}>
										<b>First Name:</b>
									</Form.Label>
									<Form.Group id='forename' as={Col}>
										<Form.Control type='text' required ref={forenameReference} placeholder='First Name' defaultValue={currentUserData.forename}></Form.Control>
									</Form.Group>
								</Form.Group>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={3}>
										<b>Last Name:</b>
									</Form.Label>
									<Form.Group id='surname' as={Col}>
										<Form.Control type='text' required ref={surnameReference} placeholder='Last Name' defaultValue={currentUserData.surname}></Form.Control>
									</Form.Group>
								</Form.Group>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={4}>
										<b>Password:</b>
									</Form.Label>
									<Form.Group id='password' as={Col}>
										<Form.Control type='password' ref={passwordReference} placeholder='Leave blank to keep the same'></Form.Control>
									</Form.Group>
								</Form.Group>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={4}>
										<b>Confirm Password:</b>
									</Form.Label>
									<Form.Group id='passwordConfirm' as={Col}>
										<Form.Control type='password' ref={passwordConfirmReference} placeholder='Leave blank to keep the same'></Form.Control>
									</Form.Group>
								</Form.Group>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={3}>
										<b>Country:</b>
									</Form.Label>
									<Form.Group id='country' as={Col}>
										<CountrySelect value={countryReference} onChange={setCountryValue} matchNameFromStart={false} matchAbbreviations required defaultValue={currentUserData.country.id} />
									</Form.Group>
								</Form.Group>
								<Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
									<Form.Label column sm={3}>
										<b>Branch:</b>
									</Form.Label>
									<Form.Group id='branch' className='padding-top' ref={branchReference} as={Col}>
										{['radio'].map((type) => (
											<div key={`inline-${type}`} className="mb-3">
												<Form.Check
													inline
													label="Driving"
													name="group1"
													type={type}
													id={`inline-${type}-1`}
													required
													checked='true'
													disabled
												/>
												<Form.Check
													inline
													disabled
													label="Engineering"
													name="group1"
													type={type}
													id={`inline-${type}-2`}
													required
												/>
											</div>
										))}
									</Form.Group>
								</Form.Group>
								<Form.Group>
									<Button disabled={loading} className='w-100' type='submit'>Update</Button>
								</Form.Group>
							</Form>
						</div>
						<div className='w-100 text-center mt-2'>
							<Link to='/user-profile' className='text-link'>Cancel</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</div>




	)
}
