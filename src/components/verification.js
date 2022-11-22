
import React, { useState } from 'react';
import Papa from "papaparse";
import { connectStorageEmulator, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../database/Firebase";
import { Card, Container, Button, Alert, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { database } from '../database/Firebase'
import { useAuth } from '../contexts/AuthContexts'

import { addDoc, collection } from 'firebase/firestore'
import '../css/style.css'

var returnMessage = "";



export default function Verification() {
	const fileArray = [];
	const metafileArray = [];
	const [error, setError] = useState('')
	const [reason, setReason] = useState('')
	const navigate = useNavigate()
	const { currentUser } = useAuth()

	function navToSupport() {
		navigate('/support')
	}

	const uploadFiles = (file) => {
		if (!file) return;
		const storageRef = ref(storage, `images/${file.name}`);
		uploadBytesResumable(storageRef, file);
	};

	const handle = (e) => {
		setError('')
		setReason('')
		e.preventDefault();
		const file = e.target[0].files[0];
		const metafile = e.target[0].files[1];

		if (e.target[0].files.length < 1) { setError('No files submitted'); return }
		if (e.target[0].files.length < 2) { setError('Only one file submitted'); return }
		if (e.target[0].files.length > 2) { setError('Too many files submitted'); return }

		if (!file || !metafile) {
			setError('No files submitted')
			return
		}

		Papa.parse(file, {
			header: true,
			skipEmptyLines: true,
			complete: function (results) {

				results.data.map((d) => {
					fileArray.push(Object.values(d));
				});

				Papa.parse(metafile, {
					header: true,
					skipEmptyLines: true,
					complete: function (results) {

						results.data.map((d) => {
							metafileArray.push(Object.values(d));
						});

						// If validation is passed, can upload the files to the Firebase
						var lapTime = validate(fileArray, metafileArray)
						if (lapTime > -1) {
							//uploadFiles(file);
							returnMessage = "File uploaded successfully.";
							addDoc(collection(database, 'leaderboard'), {
								car: "null",
								time: lapTime,
								uid: currentUser.uid,
								version: 'null'
							}).then(response => {
								console.log(response)
							}).catch(err => {
								console.log(err.message)
							})
							navigate('/user-profile')
						}
						else {
							returnMessage = "Failed verification. Error code: " + lapTime;
						}
						setError(returnMessage)
						setReason('If you think this is an error, please contact support.')
						console.log(returnMessage);
					}
				});

			}
		});

		return;
	};

	return (
		<>
			<Container fluid>
				<Card className='d-flex align-items-center justify-content-center login-grad'>
					<div className='verification d-flex align-items-center justify-content-center' style={{ padding: '20px' }}>
						<Form onSubmit={handle}>
							<h1 className='text-center mb-4'><b>Upload your lap</b></h1>
							{error && <Alert variant='danger'>{error}</Alert>}
							<Form.Group controlId="formFileMultiple" className="mb-3">
								<Form.Control type="file" multiple />
							</Form.Group>
							<Button type='submit'>Upload</Button>
							<div style={{ margin: '2% 20%' }}>
								<p style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', border: '1px solid #bdbdbd', marginBottom: '15px', textAlign: 'left' }}>Both the .csv and .csv.metadata files are required for uploading. They can be found at C:\Users\*user*\Documents\PERRINN 424\Lap Data</p>
							</div>
							{reason &&
								<div>
									<Alert variant='danger'>{reason}</Alert>
									<Button variant='primary' onClick={navToSupport}>Contact support</Button>
								</div>
							}
						</Form>

					</div>
				</Card>
			</Container>
		</>

	);
}

function validate(lapData, metaData) {
	var frame = -1;
	var time;
	var dist;
	var totTime;
	var totDist;
	var segNum;
	var sector;
	var markers;
	var markerTime;
	var markerFlag;
	var positionX;
	var positionY;
	var positionZ;
	var rotationX;
	var rotationY;
	var rotationZ;
	var steeringAngle;
	var throttle;
	var brakePressure;
	var gear;
	var rawSteer;
	var rawThrottle;
	var rawBreak;
	var autoGear;
	var aerodrspos;
	var rowCount = 0;
	var index = getLapIndex(metaData);
	var timeAtSector1 = 0;
	var timeAtSector2 = 0;
	var timeAtSector3 = 0;
	var timeAtSector4 = 0;

	for (let i = 1; i < lapData.length; i++) {

		// row exist check
		if (lapData[i] == null) {
			continue;
		}

		let row = lapData[i];
		//console.log(row)

		// check row length
		if (row.length < 24) {
			continue;
		}

		//console.log('frame: ' + frame)
		// all but first row checks
		if (frame > 0) {
			//console.log('entered if')
			// Check frame dif
			if (frame - row[0] !== -10) {
				return generateFailCode(-1, i + 1);
			}

			// Check dist dif
			var calculatedDist = 0;
			calculatedDist += Math.pow(row[10] - positionX, 2);
			calculatedDist += Math.pow(row[11] - positionY, 2);
			calculatedDist += Math.pow(row[12] - positionZ, 2);
			calculatedDist = Math.sqrt(calculatedDist);

			calculatedDist -= row[2] - dist;

			if (Math.abs(calculatedDist) > 0.15) {
				return generateFailCode(-2, i + 1);
			}

			// Check time dif
			var timeDif = row[1] - time;
			if (timeDif <= 0) {
				return generateFailCode(-3, i + 1);
			}
			if (timeDif > 0.1) {
				return generateFailCode(-3, i + 1);
			}

			// segNum check
			if (index * 1 !== row[5] * 1) {
				return generateFailCode(-4, i + 1);
			}

			// marker checks
			if (parseInt(row[8]) !== 0) {
				return generateFailCode(-5, i + 1);
			}

			if (parseInt(row[9]) !== 0) {
				return generateFailCode(-5, i + 1);
			}

			// sector check
			if (row[6] !== sector) {
				var calcTime = 0;
				calcTime += 1 * timeAtSector1;
				calcTime += 1 * timeAtSector2;
				calcTime += 1 * timeAtSector3;

				if (row[6] * 1 === 1) {
					timeAtSector1 = 1 * row[1] - calcTime;
				}
				else if (row[6] * 1 === 2) {
					timeAtSector2 = 1 * row[1] - calcTime;
				}
				else if (row[6] * 1 === 3) {
					timeAtSector3 = 1 * row[1] - calcTime;
				}
				else if (row[6] * 1 === 4) {
					timeAtSector4 = 1 * row[1] - calcTime;
				}
			}
		}
		else {
			// Start time check
			if (row[1] > 0) {
				console.log('row[1]: ' + row[1])
				return generateFailCode(-6, 1);
			}

			// Start dist check
			if (row[2] > 0) {
				return generateFailCode(-7, 1);
			}

			// Lap Index check
			if (index < 1) {
				return generateFailCode(-8, 1);
			}

			if (index !== 1) {
				// Start totTime check
				if (row[3] < 60) {
					return generateFailCode(-6, 1);
				}

				// Start totDist check
				if (row[4] < 20500) {
					return generateFailCode(-7, 1);
				}
			}
		}

		// update new vars
		frame = row[0];
		time = row[1];
		dist = row[2];
		totTime = row[3];
		totDist = row[4];
		segNum = row[5];
		sector = row[6];
		markers = row[7];
		markerTime = row[8];
		markerFlag = row[9];
		positionX = row[10];
		positionY = row[11];
		positionZ = row[12];
		rotationX = row[13];
		rotationY = row[14];
		rotationZ = row[15];
		steeringAngle = row[16];
		throttle = row[17];
		brakePressure = row[18];
		gear = row[19];
		rawSteer = row[20];
		rawThrottle = row[21];
		rawBreak = row[22];
		autoGear = row[23];
		aerodrspos = row[24];
		rowCount++;
	}

	// Final sector
	calcTime = 0;
	calcTime += 1 * timeAtSector1;
	calcTime += 1 * timeAtSector2;
	calcTime += 1 * timeAtSector3;
	calcTime += 1 * timeAtSector4;
	var timeAtSector5 = time - calcTime;

	// Sector dif
	var sec1Dif = timeAtSector1 - getSectorTime(metaData, 1);
	var sec2Dif = timeAtSector2 - getSectorTime(metaData, 2);
	var sec3Dif = timeAtSector3 - getSectorTime(metaData, 3);
	var sec4Dif = timeAtSector4 - getSectorTime(metaData, 4);
	var sec5Dif = timeAtSector5 - getSectorTime(metaData, 5);

	// Dif checks
	if (Math.abs(sec1Dif) > 0.1) {
		console.log(Math.abs(sec1Dif))
		console.log('died in sector 1')
		return generateFailCode(-9, 0);
	}
	if (Math.abs(sec2Dif) > 0.1) {
		console.log('died in sector 2')
		return generateFailCode(-9, 0);
	}
	if (Math.abs(sec3Dif) > 0.1) {
		console.log('died in sector 3')
		return generateFailCode(-9, 0);
	}
	if (Math.abs(sec4Dif) > 0.1) {
		console.log('died in sector 4')
		return generateFailCode(-9, 0);
	}
	if (Math.abs(sec5Dif) > 0.1) {
		console.log('died in sector 5')
		return generateFailCode(-9, 0);
	}

	// final dist check
	if (dist < 20500) {
		return generateFailCode(-10, 0);
	}

	// meta file check 1
	if (!metaNecessities(metaData)) {
		return generateFailCode(-11, 0);
	}

	// meta file check 2
	if (!metaConditionals(metaData, time, rowCount)) {
		return generateFailCode(-12, 0);
	}

	console.log('got to end')
	return getFinalLapTime(metaData);
}

function metaNecessities(metaData) {
	var ctn = false; // Contains Track Name
	var cfv = false; // Contains File Format Version
	var cct = false; // Contains Completed Check
	var ccs = false; // Contains Completed Sectors
	var cif = false; // Contains Ideal check
	var cso = false; // Contains Sector Origins

	for (let i = 0; i < metaData.length; i++) {
		var stringLine = metaData[i].toString()
		if (stringLine.includes('"trackName": "424 Nordschleife Scene",')) ctn = true;
		else if (stringLine.includes('"fileFormatVersion": 1,')) cfv = true;
		else if (stringLine.includes('"completed": true,')) cct = true;
		else if (stringLine.includes('"completedSectors": 5.0,')) ccs = true;
		else if (stringLine.includes('"ideal": false,')) cif = true;
		else if (stringLine.includes('"idealSectorOrigin": []')) cso = true;
	}
	return (ctn & cfv & cct & ccs & cif & cso) === 1;
}

function metaConditionals(metaData, lapTime, rowCount) {
	for (let i = 0; i < metaData.length; i++) {

		// Check lap time matches up with CSV data
		if ((metaData[i].toString()).includes('"lapTime":')) {
			console.log(metaData[i].toString())
			let time = (metaData[i].toString()).substring(15, 24);
			console.log(time)
			time -= lapTime;
			if (Math.abs(time) > 0.1) {
				console.log('returned false')
				return false;
			}
		}

		// Check 5 sector times exist
		if ((metaData[i].toString()).includes('"sectorsTime":')) {
			console.log(metaData[i + 6].toString())
			if (!(metaData[i + 6].toString()).includes('],')) {
				console.log('returned false')
				return false
			}
		}

		// Check sector sum is lap time
		if ((metaData[i].toString()).includes('"sectorsTime":')) {
			console.log(metaData[i + 1].toString())
			let tTime = 0;
			tTime += (metaData[i + 1].toString()).substring(8, 17);
			tTime += (metaData[i + 2].toString()).substring(8, 17);
			tTime += (metaData[i + 3].toString()).substring(8, 17);
			tTime += (metaData[i + 4].toString()).substring(8, 17);
			tTime += (metaData[i + 5].toString()).substring(8, 17);
			tTime -= lapTime;
			if (Math.abs(tTime) > 0.1) {
				console.log('returned false')
				return false;
			}
		}

		// Check count vs rows
		if ((metaData[i].toString()).includes('"count":')) {
			console.log(metaData[i].toString())
			let count = parseInt((metaData[i].toString()).substring(13, 18));
			console.log(count)
			console.log(rowCount)
			if (rowCount - count > 2) {
				console.log('returned false')
				return false;
			}
		}

		// Check file name
		if ((metaData[i].toString()).includes('"csvFile":')) {
			console.log(metaData[i].toString())
			if ((metaData[i].toString()).includes("ideal")) {
				return false;
			}
			if ((metaData[i].toString()).includes("unfinished")) {
				return false;
			}
		}
	}
	console.log('returned true')
	return true;
}

function getLapIndex(metaData) {
	for (let i = 0; i < metaData.length; i++) {
		var stringLine = metaData[i].toString()
		if (stringLine.includes('"lapIndex":')) {
			let index = stringLine.substring(16, 17);
			return parseInt(index);
		}
	}
	return -1;
}

function getSectorTime(metaData, sectorIndex) {
	for (let i = 0; i < metaData.length; i++) {
		var stringLine = metaData[i].toString()
		if (stringLine.includes('"sectorsTime":')) {
			return (metaData[i + sectorIndex].toString()).substring(8, 16);
		}
	}
	return -1;
}

function getFinalLapTime(metaData) {
	for (let i = 0; i < metaData.length; i++) {
		if ((metaData[i].toString()).includes('"lapTime":')) {
			console.log(metaData[i].toString())
			return (metaData[i].toString()).substring(15, 22);
		}
	}
	return -1;
}

function generateFailCode(failCode, line) {
	return failCode + "." + line
}

// function convertFailCode(failCode, includeLine) {
// 	var failID = Math.ceil(failCode);
// 	var errorMessage = "ERROR: ";
// 	switch (failID) {
// 		case -1:
// 			errorMessage += "Inconsistent frame rate";
// 			break;
// 		case -2:
// 			errorMessage += "Inconsistent movement";
// 			break;
// 		case -3:
// 			errorMessage += "Inconsistent time stamps";
// 			break;
// 		case -4:
// 			errorMessage += "Inconsistent segments";
// 			break;
// 		case -5:
// 			errorMessage += "Inconsistent markers";
// 			break;
// 		case -6:
// 			errorMessage += "Invalid start time";
// 			break;
// 		case -7:
// 			errorMessage += "Invalid start position";
// 			break;
// 		case -8:
// 			errorMessage += "Invalid lap";
// 			break;
// 		case -9:
// 			errorMessage += "Invalid segment times in meta file";
// 			break;
// 		case -10:
// 			errorMessage += "Lap not completed with intended route";
// 			break;
// 		case -11:
// 			errorMessage += "Meta file is missing crucial information";
// 			break;
// 		case -12:
// 			errorMessage += "Meta file contains inconsistent information";
// 			break;
// 	}
// 	if (includeLine) {
// 		// The line is stored after the decimal, first we need to invert the number as it is negative
// 		var line = failCode * -1;
// 		// Next we only want the number after the decimal so we use modulo 1
// 		line = line % 1;
// 		// Now we remove the 0. preceeding our number
// 		line = (line + "").substring(2);
// 		// Next we make sure our number is not 0, as there cannot be a line 0, then we add it to the error message
// 		if (line !== 0) errorMessage += " on line " + line;
// 	}
// 	return errorMessage + ".";
// }