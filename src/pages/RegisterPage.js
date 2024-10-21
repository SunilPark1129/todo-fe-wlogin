import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import api from "../utils/api";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const secpassword = e.target.secpassword.value;

    try {
      // 안전성(?)을 위해 서버에도 밑과 같은 절차 로직을 만들었습니다
      // 만들게 된 이유
      // 1. 백엔드에서 Schema의 password를 required: true로 해놨지만, 어째서인지 클라이언트에서 password를 안보내도 가입이 가능해지는 현상을 찾음
      // 2. 영어로 된 error message가 아닌 한글로 값을 반환
      if (name === "" || password === "" || email === "") {
        throw new Error("필요한 정보를 입력해 주세요");
      }

      if (password !== secpassword) {
        throw new Error("패스워드가 일치하지 않습니다 다시 입력해주세요");
      }
      const response = await api.post("/user", { name, email, password });
      if (response.status === 200) {
        setError(null);
        navigate("/login");
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="display-center">
      <Form
        className="display-center__content display-center__content--reg"
        onSubmit={submitHandler}
      >
        <h1>회원가입</h1>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="string"
            name="name"
            placeholder="Name"
            autoComplete="off"
          />
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>re-enter the password</Form.Label>
          <Form.Control
            type="password"
            name="secpassword"
            placeholder="re-enter the password"
          />
        </Form.Group>
        {error && <div className="red-error">{error}</div>}
        <div className="btn-box">
          <Button className="button-primary" type="submit">
            회원가입
          </Button>
          <Link className="button-link" to="/login">
            취소
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
