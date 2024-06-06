import React from 'react';
import styled from 'styled-components';

const AuthContainer = ({ title, component }) => {
  return (
    <Container>
      <Title>{title}</Title>
      {component}
    </Container>
  );
};

export default AuthContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const Title = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #191619;
  margin-bottom: 30px;
`;
