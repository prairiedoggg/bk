import React, { useState } from 'react';
import styled from 'styled-components';
import { postFindPassword } from '../../api/Auth';

const FindPasswordForm = ({ setFormType }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleFindPassword = async () => {
    const data = {
      email: email
    };
    try {
      const response = await postFindPassword(data);
      console.log('비밀번호 찾기 성공', response);
    } catch (error) {
      console.error('비밀번호 찾기 실패:', error);
      setEmailError('가입되지 않은 이메일입니다.');
    }
  };

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
        {emailError && <ErrorText>{emailError}</ErrorText>}
      </InputContainer>
      <FindButton onClick={handleFindPassword}>이메일 전송</FindButton>
      <ButtonContainer>
        <TextButton onClick={() => setFormType('로그인')}>
          로그인하러 가기
        </TextButton>
      </ButtonContainer>
    </>
  );
};

export default FindPasswordForm;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -10px;
`;

const Label = styled.p`
  font-size: 0.9rem;
  color: #191619;
  margin: 45px 0px 6px 0px;
`;

const Input = styled.input`
  width: 22rem;
  height: 2.1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 5px 12px 5px 12px;
  margin-bottom: 7px;

  &::placeholder {
    color: #bababa;
  }
`;

const TextButton = styled.button`
  background: none;
  border: none;
  color: #868686;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0 8px;
  margin-top: 30px;
`;

const ErrorText = styled.p`
  font-size: 0.9rem;
  color: #ca3636;
  align-self: center;
  margin-bottom: -10px;
`;

const FindButton = styled.button`
  width: 13rem;
  height: 2.7rem;
  background-color: #563c0a;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 35px;
  font-size: 1rem;
  font-weight: 500;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;
