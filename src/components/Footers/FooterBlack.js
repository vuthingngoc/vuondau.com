/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row } from "reactstrap";

// core components

function FooterBlack() {
  return (
    <>
      <footer className="footer footer-black footer-white">
        <Container>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="/" className="mr-1">
                    TRANG CHỦ
                  </a>
                </li>
                <li>
                  <a href="/" className="mr-1">
                    TIN TỨC
                  </a>
                </li>
                <li>
                  <a href="/">LIÊN HỆ</a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <span className="copyright">
                © {new Date().getFullYear()}
                , from vuondau with <i className="fa fa-heart heart" />
              </span>
            </div>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default FooterBlack;
