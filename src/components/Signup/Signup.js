import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Signup() {
  const [userdata, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userdata, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userdata);
  };
  return (
    <Fragment>
      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <Col xs={11} sm={10} md={10} lg={6}>
            <div className="form-box">
              <form action="submit" onSubmit={handleSubmit} className="form">
                <span class="title">Sign up</span>
                <span class="subtitle">Create your Account</span>
                <div className="form-container">
                  <input
                    type="text"
                    placeholder="First name"
                    className="input"
                    name="firstName"
                    onChange={handleChange}
                  />
                  <inputA
                    type="text"
                    placeholder="Last name"
                    className="input"
                    name="lastName"
                    onChange={handleChange}
                  />
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                  <input
                    className="input"
                    placeholder="password"
                    type="password"
                    name="password"
                    autocomplete="current-password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Sign up</button>
              </form>
              <div className="form-section"></div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Signup;
