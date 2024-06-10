import React from 'react';
import styled from 'styled-components';

export const InputComponent = ({
  title,
  type,
  placeholder,
  value,
  onChange,
  checkText
}) => {
  return (
    <InputContainer>
      {title && <Label>{title}</Label>}
      <StyledInput
        label={title}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {checkText && <CheckText>{checkText}</CheckText>}
    </InputContainer>
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

const StyledInput = styled.input`
  width: 22rem;
  height: 2.1rem;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  padding: 5px 12px;
  margin-bottom: 7px;

  &::placeholder {
    color: #bababa;
  }
`;

const CheckText = styled.p`
  font-size: 0.8rem;
  color: #ca3636;
  margin-top: 4px;
`;
