import React, { useState } from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';

import { Button, Card, CardTitle, Form, Input, Container, Row, Col, CardImg } from 'reactstrap';
import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router';

export default function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

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
                  <CardImg top tag="div">
                    <img alt="..." className="img" src={require('assets/img/iconVuondau.png').default} />
                  </CardImg>
                  <CardTitle className="text-center" tag="h3" style={{ marginBottom: '20px' }}>
                    Login
                  </CardTitle>
                  <Form
                    className="register-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      login(email, password)
                        .then((response) => {
                          console.log(response);
                          history.push('/home');
                        })
                        .catch((error) => {
                          console.log(error.message);
                          setIsSubmitting(false);
                        })
                        .finally(() => setIsSubmitting(false));
                    }}
                  >
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Email"
                      required
                    />
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      placeholder="Password"
                      type="password"
                      autoComplete="password"
                      required
                    />
                    <div className="division">
                      <div className="line l" />
                      <span>or</span>
                      <div className="line r" />
                    </div>
                    <div className="social">
                      <Button className="btn-just-icon mr-1" color="google">
                        <i className="fa fa-google" />
                      </Button>
                    </div>
                    <Button disabled={isSubmitting} type="submit" block className="btn-round" color="default">
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
