import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Paper from "@mui/material/Paper";
import "./home.css";
import Button from "react-bootstrap/Button";
import { Link, Navigate } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ReactTask</Navbar.Brand>
          <Nav className="ms-auto me-3 my-2 my-lg-0">
            <Link className="navbarlink">Home</Link>
            <Link className="navbarlink">Features</Link>
            <Link className="navbarlink" to="/Login">
              Login
            </Link>
            <Link className="navbarlink" to="/Signup">
              Signup
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col>
            <div class="container">
              <div class="row">
                <div class="col-md-12 text-center">
                  <h1 class="animate-charcter"> Manage your tasks.</h1>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              simplify your work by organizing and tracking tasks, enhancing
              productivity.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <button class="learn-more">
              <span class="circle" aria-hidden="true">
                <span class="icon arrow"></span>
              </span>
              <span class="button-text">Learn More</span>
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Homepage;
