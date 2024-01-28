import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

function TopBar() {
  let navigate = useNavigate();

  return (
    <div >
      <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            Library Management Application
          </Navbar.Brand>
          &nbsp;
          &nbsp;
          &nbsp;
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
              &nbsp;
              &nbsp;
              <Nav.Link onClick={() => navigate("/books")}>
                BookRecords
              </Nav.Link>
              &nbsp;
              &nbsp;
              <Nav.Link onClick={() => navigate("/author")}>
                AuthorRecords
              </Nav.Link>
              &nbsp;
              &nbsp;
              <Nav.Link onClick={() => navigate("/create-book")}>
                Create-BookRecord
              </Nav.Link>
              &nbsp;
              &nbsp;
              <Nav.Link onClick={() => navigate("/create-author")}>
                Create-AuthorRecord
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TopBar;
