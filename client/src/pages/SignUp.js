import React, { useState } from "react";
import styled from "styled-components";
import AuthContainer from "../components/auth/AuthContainer";
import SignUpDistrict from "../components/auth/SignUpDistrict";
import Districts from "../components/auth/Districts";

const SignUpPage = () => (
  <AuthContainer title='회원가입' component={<SignUp />} />
);

export default SignUpPage;

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [name, setName] = useState("");

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
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호 입력'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Label>비밀번호 확인</Label>
        <Input
          label='비밀번호 확인'
          type='password'
          placeholder='비밀번호 입력'
          value={checkPassword}
          onChange={(e) => setCheckPassword(e.target.value)}
        />
        <Label>이름</Label>
        <Input
          label='이름'
          type='name'
          placeholder='이름 입력'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Label>위치</Label>
        <DistrictContainer>
          <DefaultBox>서울특별시</DefaultBox>
          <SignUpDistrict options={Districts} />
        </DistrictContainer>
      </InputContainer>
      <SignUpButton>회원가입</SignUpButton>
      <TextButton>로그인하러 가기</TextButton>
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
  height: 2.1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 5px 12px 5px 12px;
  margin-bottom: 5px;

  &::placeholder {
    color: #bababa;
  }
`;

const SignUpButton = styled.button`
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

const TextButton = styled.button`
  margin-top: 20px;
  background: none;
  border: none;
  color: #868686;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0 8px;
`;

const DistrictContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DefaultBox = styled.div`
  width: 9.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #616161;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 8px 12px 8px 12px;
  margin: 0px 20px 10px 0px;
`;
