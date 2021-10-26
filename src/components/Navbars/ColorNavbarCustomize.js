import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useHistory } from 'react-router';
// nodejs library that concatenates strings
import classnames from 'classnames';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import { Button, Collapse, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Navbar, NavItem, Nav, Container } from 'reactstrap';
import { useAuth } from 'contexts/AuthContext';
// core components

const dataNavbar = [
  {
    title: 'Category',
    child: [
      { name: 'All Productions', src: '/production' },
      { name: 'Vegetable', src: '/production#vegetable' },
      { name: 'Fruit', src: '/production#fruit' },
    ],
  },
  {
    title: 'Havests',
    child: [
      { name: 'Spring', src: '/havests/spring' },
      { name: 'Summer', src: '/havests/summer' },
      { name: 'Fall', src: '/havests/fall' },
      { name: 'Winter', src: '/havests/winter' },
    ],
  },
  {
    title: 'Farms',
    child: [
      { name: 'Miền Nam', src: '/farms' },
      { name: 'Miền Trung', src: '/farms' },
      { name: 'Miền Bắc', src: '/farms' },
    ],
  },
];

function ColorNavbar() {
  const [navbarColor, setNavbarColor] = React.useState('navbar-transparent');
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();

  const history = useHistory();
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    // initialise
    headroom.init();
    const updateNavbarColor = () => {
      if (document.documentElement.scrollTop > 50 || document.body.scrollTop > 50) {
        setNavbarColor('');
      } else if (document.documentElement.scrollTop < 50 || document.body.scrollTop < 50) {
        setNavbarColor('navbar-transparent');
      }
    };
    window.addEventListener('scroll', updateNavbarColor);
    return function cleanup() {
      window.removeEventListener('scroll', updateNavbarColor);
    };
  });
  return (
    <>
      {bodyClick ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle('nav-open');
            setBodyClick(false);
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={classnames('fixed-top', navbarColor)} expand="lg" id="navbar-main">
        <Container>
          <div>
            <img alt="..." src={require('assets/img/logoVuonDau.png').default} width="110px" height="50px" onClick={() => history.push('/home')} />
            <div
              className="text-center"
              style={{
                fontFamily: '"Montserrat", "Helvetica", Arial, sans-serif',
                fontWeight: 300,
                WebkitFontSmoothing: 'antialiased',
                color: 'white',
              }}
            >
              Enjoy Fresh Product From Our Farm
            </div>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {dataNavbar.map((ele, index) => {
                return (
                  <UncontrolledDropdown nav inNavbar key={`UD-${index}`}>
                    <DropdownToggle className="mr-2" color="default" caret nav>
                      {ele.title}
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-danger" right>
                      {ele.child.map((child, index) => {
                        return (
                          <DropdownItem to={child.src} tag={Link} key={`DI-${index}`}>
                            {child.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              })}
              {currentUser !== null ? (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle color="default" caret nav>
                    {currentUser.email}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-danger" right>
                    <DropdownItem to="/profile" tag={NavLink}>
                      <i className="nc-icon nc-circle-10" />
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      to="/login"
                      tag={Link}
                      onClick={async (e) => {
                        logout();
                        if (localStorage) {
                          localStorage.clear('accessToken');
                        }
                      }}
                    >
                      <i className="nc-icon nc-button-power" />
                      Logout
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle color="default" caret nav>
                    Account
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-danger" right>
                    <DropdownItem to="/login" tag={NavLink}>
                      <i className="nc-icon nc-circle-10" />
                      Login
                    </DropdownItem>
                    <DropdownItem to="/register" tag={NavLink}>
                      <i className="nc-icon nc-badge" />
                      Register
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              <NavItem>
                <Button className="btn-round" color="danger" href="/shoppingcart">
                  <i className="nc-icon nc-cart-simple" /> Your Cart
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorNavbar;
