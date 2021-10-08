import React from "react";

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components

function FooterEcommerce() {
  return (
    <>
      <div className="subscribe-line subscribe-line-black">
        <Container>
          <Row>
            <Col md="9" sm="8">
              <Form>
                <FormGroup>
                  <Input defaultValue="" placeholder="Enter your email..." type="text" />
                </FormGroup>
              </Form>
            </Col>
            <Col md="3" sm="4">
              <Button block className="btn-neutral" color="default" size="lg" type="button">
                Nhận Khuyến Mãi
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer footer-big">
        <Container>
          <Row>
            <Col md="6" sm="9">
              <div className="links">
                <ul className="uppercase-links">
                  <li className="mr-1">
                    <a href="/" onClick={(e) => e.preventDefault()}>
                      Trang chủ
                    </a>
                  </li>
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Tin tức
                    </a>
                  </li>
                  <li className="mr-1">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      Liên hệ
                    </a>
                  </li>
                </ul>
                <hr />
                <div className="copyright">
                  © {new Date().getFullYear()}, from vuondau with <i className="fa fa-heart heart" />.
                </div>
              </div>
            </Col>
            <Col className="ml-auto" md="4" sm="2">
              <div className="social-area">
                <Button className="btn-round btn-just-icon mr-1" color="facebook" href="/" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-facebook" />
                </Button>
                <Button className="btn-just-icon btn-round mr-1" color="twitter" href="/" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-twitter" />
                </Button>
                <Button className="btn-just-icon btn-round mr-1" color="google" href="/" onClick={(e) => e.preventDefault()}>
                  <i className="fa fa-google-plus" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterEcommerce;
