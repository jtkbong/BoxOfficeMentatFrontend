import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="blue accent-3" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">About</h5>
            <ul>
            <li className="list-unstyled">
                <a href="#!">Jeremy Bong</a>
              </li>
              <li className="list-unstyled">
                <a href="https://github.com/jtkbong">JBong's GitHub</a>
              </li>
              <li className="list-unstyled">
                <a href="https://en.wikipedia.org/wiki/Dune_(novel)">Dune</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Unpaid Careers</a>
              </li>
            </ul>
          </MDBCol>
          <MDBCol md="6">
            <h5 className="title">Data Sources</h5>
            <ul>
              <li className="list-unstyled">
                <a href="https://www.boxofficemojo.com/">Box Office Mojo</a>
              </li>
              <li className="list-unstyled">
                <a href="https://www.rottentomatoes.com/">Rotten Tomatoes</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright (not really)
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;