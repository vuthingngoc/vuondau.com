import React, { useState } from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';

import { Button, Card, CardTitle, Form, Input, Container, Row, Col, CardImg } from 'reactstrap';
import { useAuth } from 'contexts/AuthContext';
import { useHistory } from 'react-router';
import { loginByPath } from 'services/auth.service';
import { NotificationManager } from 'react-notifications';
import jwtDecode from 'jwt-decode';

export default function LoginPage() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentUser } = useAuth();

  const { login, signInWithGoogle } = useAuth();

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    if (currentUser !== null && localStorage.getItem('accessToken') !== null) {
      const role = jwtDecode(localStorage.getItem('accessToken')).ROLE;
      if (role === '2') {
        history.push('/admin/home');
      } else {
        history.push('/home');
      }
    }
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });

  async function loginWithAccessToken(accessToken) {
    const res = await loginByPath('api/v1/login', accessToken);
    if (res.status === 200) {
      if (localStorage) {
        localStorage.setItem('accessToken', res.data);
        NotificationManager.success('Welcome', 'Login Success', 3000);
        console.log('jwt', jwtDecode(res.data));
        const role = jwtDecode(res.data).ROLE;
        setIsSubmitting(false);
        if (role === '2') {
          history.push('/admin/home');
        } else {
          history.push('/home');
        }
      }
    } else {
      NotificationManager.warning('Server is busy now! Pleasy try againt', 'Server Error', 3000);
    }
  }

  const handleErrorLogin = (request) => {
    switch (request) {
      case 'Firebase: Error (auth/user-not-found).':
        NotificationManager.warning("Email wasn't register", 'Login Error', 3000);
        break;
      case 'Firebase: Error (auth/wrong-password).':
        NotificationManager.warning('Wrong Email or Password', 'Login Error', 3000);
        break;
      default:
        NotificationManager.warning('Something Wrong', 'Login Error', 3000);
    }
  };
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
                    <img
                      alt="..."
                      className="img"
                      src={require('assets/img/iconVuondau.png').default}
                      style={{ width: '180px', height: '200px', display: 'block', margin: 'auto' }}
                    />
                  </CardImg>
                  <CardTitle className="text-center" tag="h3" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
                    Login
                  </CardTitle>
                  <Form
                    className="register-form"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setIsSubmitting(true);
                      login(email, password)
                        .then((response) => {
                          loginWithAccessToken(response.user.accessToken);
                        })
                        .catch((error) => {
                          handleErrorLogin(error.message);
                          setPassword('');
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
                    <Button disabled={isSubmitting} type="submit" block className="btn-round" color="default">
                      Login
                    </Button>
                    <div className="division">
                      <div className="line l" />
                      <span>or</span>
                      <div className="line r" />
                    </div>
                    <div className="social">
                      <Button
                        className="btn-just-icon mr-1"
                        onClick={() =>
                          signInWithGoogle()
                            .then((response) => {
                              console.log(response);
                              setIsSubmitting(false);
                              loginWithAccessToken(response.user.accessToken);
                            })
                            .catch((error) => {
                              handleErrorLogin(error.message);
                              setPassword('');
                              setIsSubmitting(false);
                            })
                        }
                        color="google"
                      >
                        <i className="fa fa-google" />
                      </Button>
                    </div>
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
