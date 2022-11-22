import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { database } from '../database/Firebase.js';
import { Card, Col, Row, Container, Image, Alert } from 'react-bootstrap';
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Pagination from "@mui/material/Pagination"
import { visuallyHidden } from '@mui/utils'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '../contexts/AuthContexts'
import FlagCheckeredIcon from '../icons/flag-checkered-solid.png'
import StopwatchIcon from '../icons/stopwatch.png'
import { Link } from 'react-router-dom'
import Grid from "@mui/material/Grid";
import Login from './authentication/Login'
import OctoberUpdateImage from '../images/Perrin424_1.png'

import '../css/style.css';
import Verification from './verification.js';


export default function Leaderboard() {
	// Declare constants
	const [leaderboard, setLeaderboard] = useState([]);
	const [order, setOrder] = useState('asc')
	const [orderBy, setOrderBy] = useState('calories')
	const [page, setPage] = useState(1)
	const [error, setError] = useState('')
	const { currentUser } = useAuth()
	const rowsPerPage = 10
	const [currentUserData, setCurrentUserData] = useState({ forename: '', surname: '', country: '', branch: '' })

	// Retrieve the user table from firebase
	async function getUserData(user) {
		const userData = await getDoc(doc(database, 'users', user))
		setCurrentUserData(userData.data())
	}

	// Make the leaderboard
	useEffect(() => {
		if (currentUser !== null) { getUserData(currentUser.uid) }
		getLeaderboard();
	}, []);

	// Retrieve the leaderboard data from Firebase
	function getLeaderboard() {
		const leaderboardRef = collection(database, "leaderboard");
		var leaderboardData
		getDocs(leaderboardRef).then(response => {
			const data = response.docs.map(doc => ({
				data: doc.data(),
				id: doc.id
			}))
			setLeaderboard(data);
			leaderboardData = data
		}).catch(error => (console.log(error.message)));

		// Retrieve the users table from firebase
		const usersRef = collection(database, "users");
		getDocs(usersRef).then(response => {
			const data = response.docs.map(doc => ({
				data: doc.data(),
				id: doc.id
			}))
			var finalArray = []
			// iterate through all users
			data.map(user => {
				console.log(leaderboardData)
				leaderboardData.map(entry => {
					if (entry.data.uid === user.id) {
						// save the entry to dictionary
						var leaderboardDict = {
							position: 0,
							name: user.data.forename + " " + user.data.surname,
							country: user.data.country.name,
							car: entry.data.car,
							time: convertToMinutes(entry.data.time),
							numericTime: entry.data.time,
							version: entry.data.version,
							uid: entry.data.uid
						}
						// add dictionary to array
						finalArray.push(leaderboardDict)
					}
				})
			})
			let leaderboardPos = 0;
			// sort the table and set the position
			finalArray.sort((a, b) => a.time > b.time ? 1 : -1).forEach(item => item.position = ++leaderboardPos)
			setLeaderboard(finalArray)
		}).catch(error => (console.log(error.message)));
	}

	// Get the suffix of a number e.g. 3rd 1st 92nd....
	function getSuffix(rank) {
		var j = rank % 10, k = rank % 100;
		if (j === 1 && k !== 11) {
			return rank + "st";
		}
		if (j === 2 && k !== 12) {
			return rank + "nd";
		}
		if (j === 3 && k !== 13) {
			return rank + "rd";
		}
		return rank + "th";
	}

	// Find the first time the user appears in the leaderboard
	function findTopPos() {
		for (var i = 0; i < leaderboard.length; i++) {
			if (leaderboard[i].uid === currentUser.uid) {
				console.log(leaderboard[i].uid)
				console.log(leaderboard)
				return getSuffix(leaderboard[i].position)
			}
		}
	}

	// find the first time the user appears in the leaderboard
	function findTopTime() {
		for (var i = 0; i < leaderboard.length; i++) {
			if (leaderboard[i].uid === currentUser.uid) {
				return parseFloat(leaderboard[i].numericTime)
			}
		}
	}

	// Find the average of all the users entries in the leaderboard
	function findAverageTime() {
		var arrayOfTime = []
		for (var i = 0; i < leaderboard.length; i++) {
			if (leaderboard[i].uid === currentUser.uid) {
				arrayOfTime.push(parseFloat(leaderboard[i].numericTime))
			}
		}
		return arrayOfTime.reduce((a, b) => a + b, 0) / arrayOfTime.length
	}

	// i know this is stupid, its the only way i could get it to work
	function findGapToFastest() {
		for (var i = 0; i < leaderboard.length; i++) {
			return findTopTime() - leaderboard[0].numericTime
		}
	}

	// Convert a decimal time into minutes seconds and milliseconds e.g. 335.645 => 5:35.645
	function convertToMinutes(timeInSeconds) {
		var milliseconds = parseFloat(timeInSeconds) * 1000
		var minutes = Math.floor((milliseconds / 1000 / 60) << 0)
		var seconds = (Math.floor((milliseconds / 1000) % 60) + ((milliseconds / 1000) % 1)).toFixed(3)
		return minutes + ":" + seconds.padStart(6, '0')
	}


	// Sort the table
	const handleSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	// Change the page
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 1 ? Math.max(0, (1 + page) * rowsPerPage - leaderboard.length - rowsPerPage) : 0


	console.log('Count: ' + Math.ceil(leaderboard.length / rowsPerPage))
	// Initialise the leaderboard
	return (
		<>
			{/* Extremely spastic indentation */}
			{/* the gist of it is theres a bunch of nested shit that creates a table and works 90% of the time its a bit spastic
		sometimes but meh its fine. ive tried to add comments where a column or row is but its still a bitch to read */}
			<Container fluid className='d-flex align-items-center justify-content-center dark-blue' style={{ paddingTop: '110px' }}>
				<div style={{ margin: '5px' }}>

					{/* entire table */}
					<Grid container>
						{currentUser !== null &&
							// first big column
							<Grid container direction='column' item md='6' sm='12' xs='12' className='auth-pad-10'>

								{/* row 1 */}
								<Grid container direction='row' item md='2'>

									{/* column inside of row */}
									{/* fastest lap box */}
									<Grid item className='auth-pad-10' md='6' sm='12' xs='12'>
										<div className='d-flex align-items-center justify-content-center' >
											<Card className='w-100'>
												<Container fluid className='auth-pad-10'>
													<Row className='align-items-center'>
														<Col>
															<Card className='max-height-100 d-flex align-items-center justify-content-center auth-pad-10 white'>
																<Image src={StopwatchIcon} width='100%' className='max-size-h-w-80' />
															</Card>
														</Col>
														<Col>
															<div>
																<h2 className='text-light-blue marg-bot--5'><b>{convertToMinutes(findTopTime())}</b></h2>
																<p className='text-14'>My Fastest Lap</p>
															</div>
														</Col>
													</Row>
												</Container>
											</Card>
										</div>
									</Grid>

									{/* column inside of row */}
									{/* Rank box */}
									<Grid item className='auth-pad-10' md='6' sm='12' xs='12'>
										<div className='d-flex align-items-center justify-content-center'>
											<Card className='w-100'>
												<Container fluid className='auth-pad-10'>
													<Row className='align-items-center'>
														<Col>
															<Card className='max-height-100 d-flex align-items-center justify-content-center auth-pad-10 white'>
																<Image src={FlagCheckeredIcon} width='100%' className='max-size-h-w-80' />
															</Card>
														</Col>
														<Col>
															<div>
																<h2 className='text-light-blue marg-bot--5'><b>{findTopPos()}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
																<p className='text-14'>My Rank</p>
															</div>
														</Col>
													</Row>
												</Container>
											</Card>
										</div>
									</Grid>
								</Grid>
								{/* End of row 1 */}

								{/* row 2 */}
								<Grid container direction='row' item md='2'>

									{/* column 1 inside of row 2 */}
									{/* fastest lap box */}
									<Grid item className='auth-pad-10' md='6' sm='12' xs='12'>
										<div className='d-flex align-items-center justify-content-center' >
											<Card className='w-100'>
												<Container fluid className='auth-pad-10'>
													<Row className='align-items-center'>
														<Col>
															<Card className='auth-pad-10 white max-height-100 d-flex align-items-center justify-content-center'>
																<Image src={StopwatchIcon} width='100%' className='max-size-h-w-80' />
															</Card>
														</Col>
														<Col>
															<div>
																<h2 className='text-light-blue marg-bot--5'><b>{convertToMinutes(findAverageTime())}</b></h2>
																<p className='text-14'>My Average Time</p>
															</div>
														</Col>
													</Row>
												</Container>
											</Card>
										</div>
									</Grid>

									{/* column 2 */}
									{/* gap to fastest box */}
									<Grid item className='auth-pad-10' md='6' sm='12' xs='12'>
										<div className='d-flex align-items-center justify-content-center'>
											<Card className='w-100'>
												<Container fluid className='auth-pad-10'>
													<Row className='align-items-center'>
														<Col>
															<Card className='auth-pad-10 white max-height-100 d-flex align-items-center justify-content-center'>
																<Image src={FlagCheckeredIcon} width='100%' className='max-size-h-w-80' />
															</Card>
														</Col>
														<Col>
															<div>
																<h2 className='text-light-blue marg-bot--5'><b>{convertToMinutes(findGapToFastest())}</b></h2>
																<p className='text-14'>My Gap To Fastest</p>
															</div>
														</Col>
													</Row>
												</Container>
											</Card>
										</div>
									</Grid>
								</Grid>
								{/* end of row */}


								{/* big row */}
								{/* the user profile bit */}&nbsp;
								<Grid container direction='row' item md='7' >
									<Grid item className='auth-pad-10' md='12' sm='12' xs='12'>
										<div className='d-flex align-items-center justify-content-center h-100 w-100'>
											<Card className='d-flex align-items-center justify-content-center h-100 w-100 login-grad marg-bot-40 pad-top-bot-40'>
												<Container className='d-flex align-items-center justify-content-center'>
													<div className='w-100 max-w-500'>
														<h1 className='text-center mb-4'><b>Driver Profile</b></h1>
														{error && <Alert variant='danger'>{error}</Alert>}
														<div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #bdbdbd', marginBottom: '15px' }}><strong>Email:</strong> {currentUser.email}<br /></div>
														<div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #bdbdbd', marginBottom: '15px' }}><strong>Name:</strong> {currentUserData.forename} {currentUserData.surname}<br /></div>
														<div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #bdbdbd', marginBottom: '15px' }}><strong>Country:</strong> {currentUserData.country.name}<br /></div>
														<div style={{ padding: '5px', backgroundColor: 'white', borderRadius: '5px', border: '1px solid #bdbdbd', marginBottom: '15px' }}><strong>Branch:</strong> {currentUserData.branch}</div>
														<Link to='/update-profile' className='btn btn-primary w-100 mt-3'>Update Profile</Link>
													</div>
												</Container>
											</Card>
										</div>
									</Grid>
								</Grid>
							</Grid>
						}

						{/* shown if a user isnt logged in */}
						{/* the login component is put in here */}
						{/* known bug doesn't always go where it should */}
						{currentUser === null &&
							<Grid container direction='column' item md='6' className='pad-20'>
								<Grid item md='12' className='h-100'>
									<div className='d-flex align-items-center justify-content-center h-100' >
										<Card className='h-100 w-100'>
											<Container className='h-100 w-100'>
												<div className='marg-l-r--15 h-100'>
													<Login title='Login to display your stats' />
												</div>
											</Container>
										</Card>
									</div>
								</Grid>
							</Grid>
						}

						{/* Leaderboard column */}
						<Grid container direction='column' item md='6'>
							<Grid item md='12'>
								<div>
									<Card className='black text-white marg-20' style={{ backgroundColor: 'black' }}>
										<Card.Body style={{ marginBottom: '-25px' }}>
											<h3 style={{ marginBottom: '-10px' }}><b>LEADERBOARD</b></h3>
											<hr style={{ border: '1px solid #0087E8', opacity: '1', backgroundColor: '#0087E8' }}></hr>
										</Card.Body>
										<Card style={{ padding: '20px 0px 20px 0px' }}>
											<Container >
												<TableContainer >
													<Table size={'medium'}>
														<TableHeader
															order={order}
															orderBy={orderBy}
															sortTable={handleSort}
															rowCount={leaderboard.length}
														/>
														<TableBody>
															{leaderboard.slice().sort(getComparator(order, orderBy)).slice(page * rowsPerPage - rowsPerPage, page * rowsPerPage).map((row, index) => {
																return (
																	<TableRow hover>
																		<TableCell align="left">{row.position}</TableCell>
																		<TableCell align="left">{row.name}</TableCell>
																		<TableCell align="left">{row.country}</TableCell>
																		<TableCell align="left">{row.time}</TableCell>
																	</TableRow>
																)
															})}
															{emptyRows > 0 && (
																<TableRow style={{ height: (33) * emptyRows, }}>
																	<TableCell colSpan={4} />
																</TableRow>
															)}
														</TableBody>
													</Table>
												</TableContainer>
												<Container fluid className='d-flex align-items-center justify-content-center'>
													<Pagination page={page} onChange={handleChangePage} count={Math.ceil(leaderboard.length / rowsPerPage)} showFirstButton showLastButton />
												</Container>
											</Container>
										</Card>
									</Card></div>
							</Grid>

						</Grid>

						{/* Only displays the upload if user is logged in */}
						{currentUser !== null &&
							<Grid item md='12' sm='12' xs='12'>
								<div style={{ margin: '10px' }}><Verification /></div>
							</Grid>
						}

						{/* Info? idk what is wanted here */}
						<Grid item md='12' sm='12' xs='12'>
							<Row className='pad-20'>
								<Col md='4' className='marg-bot-15'>
									<Card className='h-100'>
										<Card.Body>
											<img src={OctoberUpdateImage} width='100%' />
											<h3><b>October Update</b></h3>
											<p>"Lorem ipsum dolor si amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. deserunt...</p>
											<Link to='#' className='float-right text-link-blue'>learn more</Link>
										</Card.Body>
									</Card>
								</Col>

								<Col md='4' className='marg-bot-15'>
									<Card className='h-100'>
										<Card.Body>
											<img src={OctoberUpdateImage} width='100%' />
											<h3><b>September Update</b></h3>
											<p>"Lorem ipsum dolor si amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. deserunt...</p>
											<Link to='#' className='float-right text-link-blue'>learn more</Link>
										</Card.Body>
									</Card>
								</Col>
								<Col md='4' className='marg-bot-15'>
									<Card className='h-100'>
										<Card.Body>
											<img src={OctoberUpdateImage} width='100%' />
											<h3><b>August Update</b></h3>
											<p>"Lorem ipsum dolor si amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. deserunt...</p>
											<Link to='#' className='float-right text-link-blue'>learn more</Link>
										</Card.Body>
									</Card>
								</Col>
							</Row>
						</Grid>
					</Grid>
				</div>
			</Container>
		</>
	);
}


// -----------------------------------------------------------------------------------------------------------------------------------------


// Order the table by a row ascending or descending
function descendingComparator(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) { return -1 }
	if (b[orderBy] > a[orderBy]) { return 1 }
	return 0
}

function getComparator(order, orderBy) {
	return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)
}

const headCells = [
	{ id: 'position', numeric: true, disablePadding: false, label: 'Rank', },
	{ id: 'name', numeric: false, disablePadding: false, label: 'Driver', },
	{ id: 'country', numeric: false, disablePadding: false, label: 'Country', },
	{ id: 'time', numeric: false, disablePadding: false, label: 'Laptime', }
]

// The header of the table
function TableHeader(props) {
	const { order, orderBy, sortTable } = props
	const handleSort = (property) => (event) => {
		sortTable(event, property)
	}
	return (
		<TableHead>
			<TableRow>
				{/* Iterate through the headCells */}
				{headCells.map((headCell) => (
					<TableCell key={headCell.id} align='left' padding={headCell.disablePadding ? 'none' : 'normal'} sortDirection={orderBy === headCell.id ? order : false}>
						<TableSortLabel active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : 'asc'} onClick={handleSort(headCell.id)}>
							<b>{headCell.label}</b>
							{orderBy === headCell.id ? (<Box component="span" sx={visuallyHidden}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>) : null}
						</TableSortLabel>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	)
}
