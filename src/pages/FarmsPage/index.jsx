import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import FooterEcommerce from 'components/Footers/FooterEcommerce';

import { NavLink, Card, Nav, Container, Row, Col } from 'reactstrap';

export default function FarmsPage() {
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
            backgroundImage: 'url(' + require('assets/img/sections/FarmsPage2.jpg').default + ')',
          }}
        >
          <div>
            <Container>
              <Row>
                <Col md="4">
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Nông Trại Thảo Điền
                    </div>
                    <Nav>
                      <NavLink href="/farms/farmdetail">
                        <img alt="..." src={require('assets/img/sections/farms/NongTrai.jpg').default} />
                      </NavLink>
                    </Nav>
                  </Card>
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Vườn Rau Cô Hai
                    </div>
                    <NavLink href="/farms/farmdetail">
                      <img alt="..." src={require('assets/img/sections/farms/VuonRau.jpg').default} />
                    </NavLink>
                  </Card>
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Salad Garden
                    </div>
                    <NavLink href="/farms/farmdetail">
                      <img alt="..." src={require('assets/img/sections/farms/SaladGarden.jpg').default} />
                    </NavLink>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Nông Trại Cần Thơ
                    </div>
                    <NavLink href="/farms/farmdetail" tag={NavLink}>
                      <img alt="..." src={require('assets/img/sections/farms/VuonTraiCay.jpg').default} />
                    </NavLink>
                  </Card>
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Nông Trại Bác Bảy
                    </div>
                    <NavLink href="/farms/farmdetail" tag={NavLink}>
                      <img alt="..." src={require('assets/img/sections/farms/VuonCaChua3.jpg').default} />
                    </NavLink>
                  </Card>
                </Col>
                <Col md="4">
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Vườn Cà chua Mặt Trời
                    </div>
                    <NavLink href="/farms/farmdetail">
                      <img alt="..." src={require('assets/img/sections/farms/VuonCaChua.jpg').default} />
                    </NavLink>
                  </Card>
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Vườn Nho Phan Thiết
                    </div>
                    <NavLink href="/farms/farmdetail">
                      <img alt="..." src={require('assets/img/sections/farms/VuonNho.jpg').default} />
                    </NavLink>
                  </Card>
                  <Card className="card-image">
                    <div style={{ marginLeft: 15, marginTop: 10 }} className="details-text">
                      Nông Trại Rau Củ
                    </div>
                    <NavLink href="/farms/farmdetail">
                      <img alt="..." src={require('assets/img/sections/farms/NongTraiRauCu.jpg').default} />
                    </NavLink>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
      <FooterEcommerce />
    </>
  );
}