import React, { useState } from "react";
import styled from "styled-components";
import AuthContainer from "../components/login/AuthContainer";
import InvisibleIcon from "../assets/icons/InvisibleIcon.svg";
import VisibleIcon from "../assets/icons/VisibleIcon.svg";

const LoginPage = () => <AuthContainer title='로그인' component={<Login />} />;

export default LoginPage;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <InputContainer>
        <Label>이메일</Label>
        <Input
          label='이메일'
          type='email'
          placeholder='이메일 입력'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Label>비밀번호</Label>
        <PasswordInputContainer>
          <Input
            label='비밀번호'
            type={isPasswordVisible ? "text" : "password"}
            placeholder='비밀번호 입력'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <VisibilityIcon
            src={isPasswordVisible ? VisibleIcon : InvisibleIcon}
            alt='PasswordVisibility'
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </PasswordInputContainer>
      </InputContainer>
      <LoginButton>로그인</LoginButton>
      <ButtonContainer>
        <TextButton>아이디 찾기</TextButton>
        <Divider>|</Divider>
        <TextButton>비밀번호 찾기</TextButton>
        <Divider>|</Divider>
        <TextButton>회원가입</TextButton>
      </ButtonContainer>
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: #191619;
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 22rem;
  height: 2rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 8px 12px 8px 12px;
  margin-bottom: 15px;

  &::placeholder {
    color: #bababa;
  }
`;

const PasswordInputContainer = styled.div`
  position: relative;
`;

const VisibilityIcon = styled.img`
  position: absolute;
  right: 1rem;
  top: 1.2rem;
  width: 1.2rem;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 10rem;
  height: 2.5rem;
  background-color: #563c0a;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 45px;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: #868686;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0 8px;
`;

const Divider = styled.span`
  color: #d7d7d7;
  margin: 0 4px;
`;
