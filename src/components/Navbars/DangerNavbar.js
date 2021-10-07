import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from 'headroom.js';
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  UncontrolledTooltip,
} from 'reactstrap';
// core components

const dataNavbar = [
  {
    title: 'Category',
    child: [
      { name: 'All Productions', src: '/production' },
      { name: 'Vegetable', src: '/production/vegetable' },
      { name: 'Fruit', src: '/production/fruit' },
      { name: 'Meat', src: '/production/meat' },
      { name: 'Fish', src: '/production/fish' },
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

function WhiteNavbar() {
  const [bodyClick, setBodyClick] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  React.useEffect(() => {
    let headroom = new Headroom(document.getElementById('navbar-main'));
    // initialise
    headroom.init();
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
      <Navbar className="fixed-top" expand="lg" id="navbar-main" color="danger">
        <Container>
          <div className="navbar-translate">
            <NavbarBrand id="navbar-brand" to="/home" tag={Link}>
              VuonDau
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              <img alt="..." src={require('assets/img/iconVuondau.png').default} width="100px" height="100px" />
            </UncontrolledTooltip>
            <button
              className="navbar-toggler"
              id="navigation"
              type="button"
              onClick={() => {
                document.documentElement.classList.toggle('nav-open');
                setBodyClick(true);
                setCollapseOpen(true);
              }}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              {dataNavbar.map((ele) => {
                return (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle className="mr-2" color="default" caret nav>
                      {ele.title}
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-danger" right>
                      {ele.child.map((child) => {
                        return (
                          <DropdownItem to={child.src} tag={NavLink}>
                            {child.name}
                          </DropdownItem>
                        );
                      })}
                    </DropdownMenu>
                  </UncontrolledDropdown>
                );
              })}
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
                    register
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Nav className="ml-auto" navbar>
                <Button className="btn-neutral" color="link" href="/" onClick={(e) => e.preventDefault()}>
                  News
                </Button>
              </Nav>
              <Nav className="ml-auto" navbar>
                <Button className="btn-neutral" color="link" href="/" onClick={(e) => e.preventDefault()}>
                  Contact
                </Button>
              </Nav>
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

export default WhiteNavbar;
