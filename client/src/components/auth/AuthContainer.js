import React from 'react';
import styled from 'styled-components';
import Logo from '../../assets/icons/Logo.svg';

const AuthContainer = ({ title, component }) => {
  return (
    <Container>
      <LogoImage src={Logo} alt='Logo' />
      <Title>{title}</Title>
      {component}
    </Container>
  );
};

export default AuthContainer;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 18rem;
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 30px;
  color: #191619;
`;
