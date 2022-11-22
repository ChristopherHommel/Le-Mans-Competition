import React, { useRef, useState } from 'react';
import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import '../css/style.css'

export default function Support() {
  // needed for when the form is implemented
  const [loading, setLoading] = useState(false)

  const forenameReference = useRef()
  const surnameReference = useRef()

  return (
    <div>

      {/* gradient image */}
      <div style={{ marginTop: '90px' }}>
        <div className='support-grad'></div>
        <h1 className='support-grad-info'><b>Support</b></h1>
      </div>

      {/* Info block 1 */}
      <div className='info-block white'>
        <Container>
          <Row className="justify-content-center align-items-center">

            {/* column 1 */}
            <Col lg id='pad-r-30'>
              <h3><b>Download and Play</b></h3>
              <p>
                Navigate to the download page<br />
                The download will be in your downloads folder once completed<br />
                Extract the files<br />
                Run Project 424.exe</p>
            </Col>

            {/* column 2 */}
            <Col lg>
              <h3><b>Uploading your lap</b></h3>
              <p>
                The simulator will create two files when you complete a lap. A .csv file and a .metadata file. These files are stored in:<br />
                C:\Users\*user*\Documents\PERRINN 424\Lap Data<br />
                Make sure you upload both files to the leaderboard to ensure your lap passes the automated validation.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Info block 2 */}
      <div className='info-block grey'>
        <Container>
          <Row className="justify-content-center align-items-center text-white">

            {/* column 1 */}
            <Col lg id='pad-r-30'>
              <h3><b>Default Controls</b></h3>
              <p>Throttle: W<br />
                Left: A<br />
                Right: D<br />
                Gear up: Page up<br />
                Gear down: Page down<br />
                Customize controls: I<br />
                Change View: C<br />
                DRS: Right Shift<br />
                Toggle Interface: Space<br />
                Toggle Telemetry: T<br />
                Auto Pilot: Q<br /></p>
            </Col>

            {/* column 2 */}
            <Col lg>
              <h3><b>How to Drive the 424</b></h3>
              <p>
                <b>1. </b> Press I to open the input settings.<br />
                The first time it shows the default keyboard mappings.<br />
                <b>2. </b> Click the inputs and follow the instructions to map the inputs to your device. <br />
                Currently keyboard and DirectInput devices (with or without force feedback) are supported. Your settings will be saved and remembered.<br />
                <b>3. </b> Press the <b>Gear Up</b> input to engage the D (drive) mode. ( “1” Key )<br />
                <b>4. </b> Drive!
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* info block 3 */}
      {/* should be implemented to send an email with a message to an account */}
      <div className='info-block dark-blue'>
        <Container className='d-flex justify-content-center align-items-center text-white'>
          <div>
            <h1 className='d-flex justify-content-center'><b>Contact Support</b></h1>
            <Form onSubmit={'#'} style={{ marginBottom: '10px' }}>
              <Row className='mb-3'>
                <Form.Group id='forename' as={Col}>
                  <Form.Control type='text' required ref={forenameReference} placeholder='First Name' id='auth-pad-10'></Form.Control>
                </Form.Group>
                <Form.Group id='surname' as={Col}>
                  <Form.Control type='text' required ref={surnameReference} placeholder='Last Name' id='auth-pad-10'></Form.Control>
                </Form.Group>
              </Row>
              <Form.Group id='message' as={Col} className='marg-bot-15'>
                <Form.Control as='textarea' rows={5} required ref={surnameReference} placeholder='Message' id='auth-pad-10'></Form.Control>
              </Form.Group>
              <Form.Group>
                {/* Change 'disabled' to 'disabled={loading}' when implemented */}
                <Button className='w-100 auth-pad-15' disabled type='submit' id='auth-pad-15'>SUBMIT</Button>
              </Form.Group>
            </Form>
            <Alert variant='danger'>Not currently implemented</Alert>
          </div>
        </Container>
      </div>
      
    </div>
  );
};
