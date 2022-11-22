import React from 'react'
import { Row, Col, Button, Alert } from "react-bootstrap";
import WindowsIcon from '../icons/windows.png'
import AppleIcon from '../icons/apple.png'
import LinuxIcon from '../icons/linux.png'
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

export default function Download() {
	const navigate = useNavigate()
	const downloadWindows = 'https://firebasestorage.googleapis.com/v0/b/perrinn-424-thrill-capital.appspot.com/o/test%2FBuild%20COMPX374%20PERRINN%20424%20Windows.zip?alt=media&token=ed7973bf-6b76-4066-b425-4caaa316e041'
	const downloadApple = 'https://firebasestorage.googleapis.com/v0/b/perrinn-424-thrill-capital.appspot.com/o/test%2FBuild%202022-07-12%20PERRINN%20424%20Mac%20OS%20X.app.zip?alt=media&token=8a3f9652-40dd-4a03-99cb-8929fef71f0b'

	// go to the login page
	function navToLogin() {
		navigate('/user-profile')
	}

	// go to the support page
	function navToSupport() {
		navigate('/support')
	}

	return (
		<div>

			{/* the picture on top */}
			<div>
				<div className='down-grad' />
				<div className='down-grad-info'>
					<h1><b>Download</b></h1>
					<h1><b>Centre</b></h1>
				</div>
			</div>

			{/* info block 1 */}
			<div className="info-block">
				<Row className="justify-content-center align-items-center">

					{/* column 1 */}
					<Col lg id='pad-r-30'>
						<h3><b>Windows</b></h3>
						<p>Install the Simulation driver (Windows) application to setup your car and start driving on your machine now.</p>
						<Button variant='primary' href={downloadWindows} onClick={navToSupport} download>
							<img src={WindowsIcon} style={{ width: '20px', height: 'auto', display: 'inline', marginRight: '10px' }} />
							Download now
						</Button>
						<Alert variant='light' style={{ color: 'white' }}>.</Alert>
					</Col>

					{/* column 2 */}
					<Col lg id='pad-r-30'>
						<h3><b>MacOS</b></h3>
						<p>Install the Simulation driver (Mac) application to setup your car and start driving on your machine now.</p>
						<Button variant='primary' href={downloadApple} download disabled>
							<img src={AppleIcon} style={{ width: '20px', height: 'auto', display: 'inline', marginRight: '10px' }} />
							Download now
						</Button>
						<Alert variant='danger'>No MacOS download available</Alert>
					</Col>

					{/* column 3 */}
					<Col lg>
						<h3><b>Linux</b></h3>
						<p>Install the Simulation driver (Linux) application to setup your car and start driving on your machine now.</p>
						<Button variant='primary' onClick={'#!'} disabled>
							<img src={LinuxIcon} style={{ width: '20px', height: 'auto', display: 'inline', marginRight: '10px' }} />
							Download now
						</Button>
						<Alert variant='danger'>No Linux download available</Alert>
					</Col>
				
				</Row>
			</div>

			{/* Info block 2 */}
			<div className="info-block grey text-white">
				<Row className="justify-content-center align-items-center">
					<Col lg='4' id='pad-r-30'>
						<h3><b>Hardware requirements to run the simulation in Full HD:</b></h3>
					</Col>
					<Col lg='8' id='pad-r-30'>
						<p>CPU: minimum Intel Core i5-7400 or Quad Core i3-10100/ AMD Ryzen 5 1600</p>
						<p>RAM: at least 8GB</p>
						<p>Graphics Card: Nvidia GeForce GTX 960 / AMD Radeon RX 560 or higher</p>
						<p>Of course if you face any technical issue, don't hesitate to leave a message on ThrillCapital.com and
							PERRINN.com, our developers will be happy to help!</p>
						<Button variant='primary' onClick={navToLogin}>Join Competition</Button>
					</Col>
				</Row>
			</div>
			
		</div>
	);
}
