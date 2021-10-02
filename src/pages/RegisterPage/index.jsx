import ColorNavbar from 'components/Navbars/ColorNavbar';
import React from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, CardTitle, Form, Input, Container, Row, Col } from 'reactstrap';

export default function RegisterPage() {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });
  return (
    <>
      <ColorNavbar />
      <div className="wrapper">
        <div
          className="page-header"
          style={{
            backgroundImage: 'url(' + require('assets/img/sections/Login-background.jpg').default + ')',
          }}
        >
          <div className="filter" />
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" lg="4" md="6" sm="6">
                <Card className="card-register">
                  <CardTitle className="text-center" tag="h3">
                    Register
                  </CardTitle>
                  <div className="social">
                    <Button className="btn-just-icon mr-1" color="facebook">
                      <i className="fa fa-facebook" />
                    </Button>
                    <Button className="btn-just-icon mr-1" color="google" style={{ marginLeft: '20px' }}>
                      <i className="fa fa-google" />
                    </Button>
                  </div>
                  <div className="division">
                    <div className="line l" />
                    <span>or</span>
                    <div className="line r" />
                  </div>
                  <Form className="register-form">
                    <Input placeholder="Email" type="text" />
                    <Input placeholder="Password" type="password" />
                    <Input placeholder="Confirm Password" type="password" />
                    <Button
                      block
                      className="btn-round"
                      color="default"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Register
                    </Button>
                  </Form>
                  <div className="login">
                    <p>
                      Already have an account? <Link to="/login">Log in</Link>.
                    </p>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="demo-footer text-center">
              <h6>
                © {new Date().getFullYear()}, made with <i className="fa fa-heart heart" /> by vuondau
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
