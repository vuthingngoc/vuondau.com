import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';

import { Button, Card, CardTitle, Form, Input, Container, Row, Col } from 'reactstrap';

export default function LoginPage() {
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
                  <CardTitle className="text-center" tag="h3" style={{ marginBottom: '30px' }}>
                    Login
                  </CardTitle>
                  <Form className="register-form">
                    <Input placeholder="Email" type="text" />
                    <Input placeholder="Password" type="password" />
                    <Button block className="btn-round" color="default">
                      Login
                    </Button>
                  </Form>
                  <div className="forgot">
                    <Button className="btn-link" color="danger" href="/register">
                      Register
                    </Button>
                    <Button className="btn-link" color="danger" href="/forgot_password" onClick={(e) => e.preventDefault()}>
                      Forgot password?
                    </Button>
                  </div>
                </Card>
              </Col>
            </Row>
            <div className="demo-footer text-center">
              <h6>
                © {new Date().getFullYear()}, from vuonda with <i className="fa fa-heart heart" />
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
