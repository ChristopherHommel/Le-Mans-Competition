import { Container, Row, Col, Button } from "react-bootstrap";
import LMP1Porsche from '../images/PORSCHE-JAPAN.jpg'
import Carousel424 from '../images/Unity9.png'
import Electric424 from '../images/Perrin424_4.png'
import Nurburgring from '../images/Nürburg.png'
import Podium from '../images/Perrinn team.jpeg'
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate()

  //Navigate to the competition page
  function navToComp() {
    navigate('/competition')
  }

  //Navigate to the about page
  function navToAbout() {
    navigate('/about')
  }

  //Navigate to the user page
  function navToLogin() {
    navigate('/user-profile')
  }

  // Code returned to display on the screen
  return (
    <>
      {/* The youtube video */}
      <div className="info-block big-pad-top black">
        <div>
          <iframe src="https://www.youtube.com/embed/t9O40ANfknE?autoplay=1&mute=1&start=5" title="YouTube video player" allowfullscreen width="100%" height="315" />
        </div>
      </div>

      {/* Info block 1  */}
      <div className="info-block dark-blue">
        <Container>
          <Row className="justify-content-center align-items-center">
            {/* Column for the picture */}
            <Col md='6'>
              <img src={LMP1Porsche} width="100%" title='The Challenge' alt="LMP1 Porsche" />
            </Col>
            {/* Column for the words */}
            <Col className='w-100 text-white'>
              <h2><b>Competition Details</b></h2>
              <p>You design and race a full spec Le Mans Hypercar as an Engineer or Sim Racer<br /><br />
                The best design work will be incorporated in the car<br /><br />
                Top Sim Racers will be considered for a PERRINN Team drive
              </p>
              {/* Button to go to the competition page */}
              <Button variant='primary' onClick={navToComp}>Learn more</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Info block 2 */}
      <div className="info-block white">
        <Container>
          <Row className="justify-content-center align-items-center">
            {/* Column for the words */}
            <Col md='6' className='text-grey'>
              <h2><b>Registration Details</b></h2>
              <p>Your Engineering or Sim Racing Team can register here.<br /><br />
                Teams can range in size from a single individual to multiple members.<br /><br />
                There is no limit to team size. Your team can compete in both categories. You decide.
              </p>
              {/* Button to go to the login page / user account */}
              <Button variant='primary' onClick={navToLogin}>Learn more</Button>
            </Col>
            {/* Column for the picture */}
            <Col className='w-100'>
              <img src={Carousel424} width="100%" title='The Challenge' alt="Nordschleife Carousel" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Info block 3 */}
      <div className="info-block grey">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md='6'>
              <img src={Electric424} width="100%" title='The Challenge' alt="P424" />
            </Col>
            <Col className='w-100 text-white'>
              <h2><b>ThrillCapital & PERRIN</b></h2>
              <p>We believe in democratisation of talent and open access<br /><br />
                Traditionally race teams like PERRINN have been a "closed shop" and costs to drive or engineer for a top tier race team have been prohibitive<br /><br />
                We want to provide an "open access" team where your talent has the chance to shine
              </p>
              <Button variant='primary' onClick={navToAbout}>Learn more</Button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Info block 4 */}
      <div className="info-block dark-blue">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md='6' className='text-white'>
              <h2><b>P424 Car & Track</b></h2>
              <p>P424 is an opensource car seeded by angel investment out of Switzerland.
                To date close to $2M USD has been spent on development.<br /><br />
                A crowd sourced digital prototype of the car is currently being developed by the PERRINN Community worldwide<br /><br />
                This digital prototype will set a "virtual lap record" for the Nordschleife at a high end simulation facilties
                in the UK and Australia before we build a real world prototype to attempt a track record at the Nordschleife in Nürburg Germany
              </p>
              <Button variant='primary' onClick={navToAbout}>Learn more</Button>
            </Col>
            <Col className='w-100'>
              <img src={Nurburgring} width="100%" title='The Challenge' alt="Nordschleife track map" />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Info block 5 */}
      <div className="info-block white">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col md='6'>
              <img src={Podium} width="100%" title='The Challenge' alt="Race engineers" />
            </Col>
            <Col className='w-100'>
              <h2><b>Prizes</b></h2>
              <p>As well as competing for places on the PERRINN team, engineers and drivers will compete for annual cash prizes of $50000 USD in each category.
              </p>
              <Button variant='primary' onClick={navToAbout}>Learn more</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

