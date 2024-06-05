import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContainer from '../components/auth/AuthContainer';
import SignUpDistrict from '../components/auth/SignUpDistrict';
import Districts from '../components/auth/Districts';

const SignUpPage = () => (
  <AuthContainer title='회원가입' component={<SignUp />} />
);

export default SignUpPage;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [name, setName] = useState('');
  const [checkEmailText, setCheckEmailText] = useState('');
  const [checkPasswordText, setCheckPasswordText] = useState('');
  const navigate = useNavigate();

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const emailCheck = (email) => {
    const isValid = emailRegEx.test(email);
    if (!isValid) {
      setCheckEmailText('이메일 형식이 일치하지 않습니다.');
    } else {
      setCheckEmailText('');
    }
    return isValid;
  };

  const passwordCheck = (password, checkPassword) => {
    if (password !== checkPassword) {
      setCheckPasswordText('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setCheckPasswordText('');
    }
  };

  return (
    <>
      <InputContainer>
        <LabelContainer>
          <Label>이메일</Label>
          <CheckText>{checkEmailText}</CheckText>
        </LabelContainer>
        <Input
          label='이메일'
          type='email'
          placeholder='이메일 입력'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            emailCheck(e.target.value);
          }}
        />
        <Label>비밀번호</Label>
        <Input
          label='비밀번호'
          type='password'
          placeholder='비밀번호 입력'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <LabelContainer>
          <Label>비밀번호 확인</Label>
          <CheckText>{checkPasswordText}</CheckText>
        </LabelContainer>
        <Input
          label='비밀번호 확인'
          type='password'
          placeholder='비밀번호 입력'
          value={checkPassword}
          onChange={(e) => {
            setCheckPassword(e.target.value);
            passwordCheck(password, e.target.value);
          }}
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
      <TextButton onClick={() => navigate('/login')}>
        로그인하러 가기
      </TextButton>
    </>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: #191619;
  margin-bottom: 6px;
`;

const CheckText = styled.p`
  font-size: 0.8rem;
  color: #ca3636;
  margin-bottom: 5px;
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
