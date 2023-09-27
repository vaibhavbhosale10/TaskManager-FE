import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("user", user);
  };
  const OnLogin = () => {
    navigate("/data");
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
              <form onSubmit={handleSubmit} action="submit" className="form">
                <span className="title">Login</span>
                <span className="subtitle">Login to your account</span>
                <div className="form-container">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                  />
                  <input
                    style={{ marginTop: "5px" }}
                    type="password"
                    className="input"
                    name="password"
                    onChange={handleChange}
                    placeholder="Password"
                  />
                </div>
                <button type="submit" onClick={OnLogin}>
                  Login
                </button>
              </form>
              <div className="form-section">
                <p>
                  Have an account? <a href="">Sign up</a>{" "}
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default Login;
