import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";

const LoginPage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await api.post("/user/login", { email, password });

      if (response.status === 200) {
        setUser(response.data.user);
        sessionStorage.setItem("token", response.data.token);

        // 토큰 값을 해더에 넣어서 GET을 해준다
        api.defaults.headers["authorization"] = `Bearer ${response.data.token}`;
        console.log(response.data.token);

        setError(null);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  }
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="display-center">
      <Form
        className="display-center__content display-center__content--login"
        onSubmit={submitHandler}
      >
        <h1>로그인</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="red-error">{error}</div>
        <div className="button-box">
          <Button type="submit" className="button-primary">
            Login
          </Button>
          <span>
            계정이 없다면? <Link to="/register">회원가입 하기</Link>
          </span>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
