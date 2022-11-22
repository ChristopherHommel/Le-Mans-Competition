import React from 'react';
import { MDBFooter, MDBContainer, MDBCol, MDBRow, MDBRipple } from 'mdb-react-ui-kit';
import perrinn_logo from '../images/PERRINN_logo_Whiteback.png';
import segula_logo from '../images/SEGULA_Technologies_logo.png';
import thrill_capital from '../images/thrillcapital-logo.png';
import unity from '../images/unity.png';
import vpp_logo from '../images/VPP-Logo.png';
import waikato_logo from '../images/University-of-Waikato.png';
import wel_logo from '../images/WEL-Logo.png'
import '../css/style.css'

function Footer() {
	return (
		<MDBFooter className='text-center text-white dark-blue'>
			<MDBContainer className='p-4'>
				<section className=''>
					<MDBRow>
						<MDBCol>
							<MDBRipple rippleColor='light' className='bg-image hover-overlay shadow-1-strong rounded'>
								<img src={perrinn_logo} alt='Perrinn Logo' className='w-100' />
								<a href='https://thrillcapital.com'><div className='mask'></div></a>
							</MDBRipple>
						</MDBCol>
						<MDBCol>
							<MDBRipple rippleColor='light' className='bg-image hover-overlay shadow-1-strong rounded'>
								<img src={segula_logo} alt='Segula Logo' className='w-100' />
								<a href='https://www.segulatechnologies.com/en'><div className='mask'></div></a>
							</MDBRipple>
						</MDBCol>
						<MDBCol>
							<MDBRipple rippleColor='light' className='bg-image hover-overlay shadow-1-strong rounded'>
								<img src={thrill_capital} alt='Thrill Capital Logo' className='w-100' />
								<a href='https://thrillcapital.com'><div className='mask'></div></a>
							</MDBRipple>
						</MDBCol>
						<MDBCol>
							<MDBRipple rippleColor='light' className='bg-image hover-overlay shadow-1-strong rounded'>
								<img src={unity} alt='Unity Logo' className='w-100' />
								<a href='https://unity.com'><div className='mask'></div></a>
							</MDBRipple>
						</MDBCol>
						<MDBCol>
							<MDBRipple rippleColor='light' className='bg-image hover-overlay shadow-1-strong rounded'>
								<img src={vpp_logo} alt='VPP Logo' className='w-100' />
								<a href='https://vehiclephysics.com'><div className='mask'></div></a>
							</MDBRipple>
						</MDBCol>
						<MDBCol>
							<MDBRipple rippleColor='light' className='bg-image hover-overlay shadow-1-strong rounded'>
								<img src={wel_logo} alt='WEL networks Logo' className='w-100' />
								<a href='https://www.wel.co.nz'><div className='mask'></div></a>
							</MDBRipple>
						</MDBCol>
					</MDBRow>
				</section>
			</MDBContainer>

			<div className='transparent-black'>
				© 2022 Copyright:
				<a className='text-white' href='https://thrillcapital.com/'>
					ThrillCapital.com
				</a>
			</div>
		</MDBFooter>

	)
}

export default Footer;