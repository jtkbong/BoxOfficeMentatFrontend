import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon } from 'mdbreact';

class BoxOfficeMentatNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {

    const logoStyle = {
      "marginRight": "10px",
      width: "10%"
    }

    return (
      <div>
        <header>
          <MDBNavbar color="blue accent-3" dark expand="md">
            <MDBNavbarBrand href="/">
              <img src="/boxofficementat.jpg" alt="Box Office Mentat" style={logoStyle} />
              <strong>Box Office Mentat</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBNavLink to="#"><MDBIcon fab icon="facebook-f" /></MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <a className="nav-link Ripple-parent" href="https://www.instagram.com/jbongstuff/">
                    <MDBIcon fab icon="instagram" />
                  </a>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}

export default BoxOfficeMentatNavbar;