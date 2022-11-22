import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
import PerrinnLogo from '../images/PERRINN_logo_Whiteback.png'
import ThrillLogo from '../images/ThrillCapitalLOGO.png'
import P424Car from '../images/Perrin424_4.png'
import Nurburg from '../images/PERRINNNurburgring.png'
import david_tomlinson from '../images/David Tomlinson.png'
import '../css/style.css'


export default function About() {
	// Code to return to display
	return (
		<>
			{/* The image displayed at the top with blue gradient */}
			<div style={{ marginTop: '90px' }}>
				<div className='about-grad' />
				<div className='about-grad-info'>
					<h1><b>About Us</b></h1>
				</div>
			</div>

			{/* Info block 1 */}
			<div className="info-block light-blue">
				<Container>
					<Row className="justify-content-center align-items-center" >
						<Col md='6'>
							<img src={PerrinnLogo} width="100%" title='The Challenge' style={{ marginBottom: '20px' }} alt='Perrinn Logo' />
						</Col>
						<Col className='w-100 text-white'>
							<h2><b>PERRINN</b></h2>
							<p>P424 is an opensource car designed by F1, Le Mans and NIO EP9 Engineer Nic Perrin and seeded by angel investment out of Switzerland.<br /><br />
								A crowd sourced digital prototype of the car is currently being developed by the PERRINN Community worldwide.<br /><br />
								The PERRINN Community currently has over 1000 Members, many of which are talented designers, engineers, and simulation experts.</p>
							<Button variant='primary' href='https://discover.perrinn.com/'>Learn more</Button>
						</Col>
					</Row>
				</Container>
			</div>

			{/* Info block 2 */}
			<div className="info-block white">
				<Container>
					<Row className="justify-content-center align-items-center">
						<Col md='6' className='text-grey'>
							<h2><b>ThrillCapital</b></h2>
							<br />
							{/* david picture and name */}
							<Row className="justify-content-center align-items-center">
								<Col md='2'>
									<img src={david_tomlinson} title='David Tomlinson' height={85} alt='David Tomlinson' />
								</Col>
								<Col>
									<h5><b>David Tomlinson</b></h5>
									<h6><b>Founder</b></h6>
								</Col>
							</Row>
							<br />
							{/* blurb */}
							<p>ThrillCapital combines David’s passion for the Financial Markets and Motorsport.
								He is an active trader and previously traded his own Forex account with Westpac Institutional Bank. David holds a
								BEng (Electrical) from Auckland University New Zealand and a MBA from Rutgers University New Jersey.</p>
							<h5><b>ThrillCapital Motorsport Technology Fund</b></h5>
							<p>
								Monetising the development of racing technologies is the best way to get racing talent funded. We are actively
								looking to invest in early stage Motorsport Technology companies.
								<br /><br />
								Technologies of interest include; Gaming/Simulation – AI/AV – EV – VR/AR – Cloud based Design – Vehicle Dynamics –
								Composites.
								<br /><br />
								Target companies will seed a Racing Technology Fund and R&D Hub. The ThrillCapital Motorsport Technology Fund is a
								Private Equity Search Fund with search costs financed by ThrillCapital. We co-invest or have a carried interest in Fund
								portfolio companies. No Fund Management fees will be charged to investors.
								<br /><br />
								A cornerstone project for the Fund is the Perrinn 424 Le Mans Car. This is an incredibly exciting initiative to build
								the world’s fastest electric car. The Fund is actively seeking to engage with any technology, commercial, government or
								educational partners tangential to the Perrinn 424 project.
								<br /><br />
								Interested Companies, Accredited Investors or Partners can email <b>david@thrillcapital.com</b>
							</p>
							<Button variant='primary' href='https://thrillcapital.com/' style={{ marginBottom: '20px' }}>Learn more</Button>
						</Col>
						<Col className='w-100'>
							<img src={ThrillLogo} width="100%" title='The Challenge' alt='ThrillCapital Logo' />
						</Col>
					</Row>
				</Container>
			</div>

			{/* info block 3 */}
			<div className="info-block grey">
				<Container>
					<Row className="justify-content-center align-items-center">
						<Col md='6'>
							<img src={P424Car} title='The Challenge' width="100%" style={{ marginBottom: '20px' }} alt='P424' />
						</Col>
						<Col className='w-100 text-white'>
							<h2><b>P424 The Car</b></h2>
							<p>"The objective of Project 424 is to develop the fastest electric hypercar in the world and a source of
								inspiration for those who want to innovate, learn and collaborate."</p>
							<Button variant='primary' href='https://discover.perrinn.com/'>Learn more</Button>
						</Col>
					</Row>
				</Container>
			</div>

			{/* info block 4 */}
			<div className="info-block dark-blue" >
				<Container>
					<Row className="justify-content-center align-items-center">
						<Col md='6' className='text-white'>
							<h2><b>The Track</b></h2>
							<p>As the most intimidating race track on earth, the Nordschleife has become the world's defacto proving ground for high performamce prototypes.<br /><br />
								First as a digital prototype pushing the boundaries of what is acheivable in the digital realm, and then in the real world on the way to a Le Mans challenge.</p>
							<Button variant='primary' href='https://discover.perrinn.com/perrinn-com/our-project-424' style={{ marginBottom: '20px' }}>Learn more</Button>
						</Col>
						<Col className='w-100'>
							<img src={Nurburg} title='The Challenge' width="100%" alt='Nurburgring Track' />
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

