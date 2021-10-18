import ColorNavbar from 'components/Navbars/ColorNavbar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, CardTitle, Form, Input, Container, Row, Col, CardImg } from 'reactstrap';

import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router';

export default function RegisterPage() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();

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
                  <CardTitle className="text-center" tag="h3" style={{ marginBottom: '30px' }}>
                    Register
                  </CardTitle>
                  <Form
                    className="register-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      register(email, password)
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
                      autoComplete="password"
                      placeholder="Password"
                      type="password"
                      required
                    />
                    <Input
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      type="password"
                      required
                    />
                    <Button disabled={isSubmitting} block className="btn-round" color="default">
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
                © {new Date().getFullYear()}, from vuondau with <i className="fa fa-heart heart" />
              </h6>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
