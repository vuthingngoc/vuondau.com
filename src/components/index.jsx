import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, BrowserRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faUserAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Container } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.scss';

import vuondauLogo from '../assets/image/vuondauLogo.png';

const Top = styled.div`
  background-color: #2ed12e;
  display: inline-block;
  width: 100%;
  height: 6vh;
`;

const TextBar = styled.div`
  display: flex;
  width: 90%;
  height: 100%;
  margin-top: 1vh;
  margin-left: 5%;
`;

const HotLine = styled.p`
  display: block;
  height: 100%;
  width: 30%;
  margin: auto;
  text-align: center;
  color: white;
  font-weight: bold;
  text-align: left;
`;

const LoginForm = styled.p`
  display: block;
  height: 100%;
  width: 40%;
  margin: auto;
  text-align: right;
  color: white;
`;

const ToolBar = styled.div`
  display: inline-flex;
  height: 13vh;
  width: 100%;
`;

const Logo = styled.img`
  display: flex;
  width: 25%;
  height: 100%;
  margin-left: 5%;
`;

const Navigation = styled.div`
  display: flex;
  width: fit-content;
  height: 60%;
  margin: auto;
`;

const NarElement = styled.div`
  display: block;
  width: fit-content;
  height: 100%;
  margin: auto;
  margin-left: 2%;
  border-radius: 10px;

  &:hover {
    color: white;
    background-color: #2ed12e;
  }
`;

const Info = styled.a`
  display: block;
  width: fit-content;
  border-radius: 10px;
  color: rgb(0, 0, 0);
  font-size: 1.5rem;
  white-space: nowrap;
  padding: 10px 16px 10px 16px;
  text-decoration: none;
  &:hover {
    color: white;
  }
`;

const Cart = styled.div`
  display: block;
  width: fit-content;
  height: 100%;
  margin: auto;
  margin-left: 1%;
  border-radius: 10px;
  background-color: #2ed12e;
`;

export default function Header() {
  const [showProduct, setShowProduct] = useState(false);
  const [showFarm, setShowFarm] = useState(false);
  const [data] = useState({
    products: ['Rau', 'Củ', 'Trái cây'],
    farms: ['Miền Nam', 'Miền Trung', 'Miền Bắc'],
  });

  const showProductDropdown = () => {
    setShowProduct(!showProduct);
  };
  const hideProductDropdown = () => {
    setShowProduct(false);
  };

  const showFarmDropdown = () => {
    setShowFarm(!showFarm);
  };
  const hideFarmDropdown = () => {
    setShowFarm(false);
  };

  return (
    <BrowserRouter>
      <Top>
        <TextBar>
          <HotLine>
            <FontAwesomeIcon icon={faMobileAlt} style={{ margin: '0px 5px' }} />
            Hotline: 0906892109
          </HotLine>
          <LoginForm>
            <FontAwesomeIcon icon={faUserAlt} style={{ margin: '0px 5px' }} />
            <NavLink
              to="/"
              activeStyle={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Đăng nhập
            </NavLink>{' '}
            hoặc{' '}
            <NavLink
              to="/"
              activeStyle={{
                textDecoration: 'none',
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              Đăng ký
            </NavLink>
          </LoginForm>
        </TextBar>
      </Top>
      <ToolBar>
        <Logo src={vuondauLogo} />
        <Navigation>
          <NarElement>
            <NavDropdown
              className="pr-2 py-2 align-text-top"
              title="Sản Phẩm"
              id="collasible-nav-dropdown"
              show={showProduct}
              onMouseEnter={showProductDropdown}
              onMouseLeave={hideProductDropdown}
            >
              <Container className="eventsNav pt-0 mt-0">
                {data.products.map((e, index) => {
                  return (
                    <Dropdown.Item key={`DropdownItemProduct-${index}`}>
                      <Link to="/" key={`Product-${index}`} style={{ textDecoration: 'none' }}>
                        <p>{e}</p>
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              </Container>
            </NavDropdown>
          </NarElement>
          <NarElement>
            <NavDropdown
              className="pr-2 py-2 align-text-top"
              title="Nông Trại"
              id="collasible-nav-dropdown"
              show={showFarm}
              onMouseEnter={showFarmDropdown}
              onMouseLeave={hideFarmDropdown}
            >
              <Container className="eventsNav pt-0 mt-0">
                {data.farms.map((e, index) => {
                  return (
                    <Dropdown.Item key={`DropdownItemFarm-${index}`}>
                      <Link to="/" key={`Farm-${index}`} style={{ textDecoration: 'none' }}>
                        <p>{e}</p>
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              </Container>
            </NavDropdown>
          </NarElement>
          <NarElement>
            <Info href="/">Tin tức</Info>
          </NarElement>
          <NarElement>
            <Info href="/">Giới thiệu</Info>
          </NarElement>
          <NarElement>
            <Info href="/">Liên hệ</Info>
          </NarElement>
          <Cart>
            <Info href="/">
              <FontAwesomeIcon icon={faShoppingCart} /> Giỏ hàng
            </Info>
          </Cart>
        </Navigation>
      </ToolBar>
    </BrowserRouter>
  );
}
