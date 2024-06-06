import React from 'react';
import styled from 'styled-components';

const MypageContainer = ({ icon, title, component }) => {
  return (
    <Container>
      <TitleBox>
        <Icon src={icon} alt='icon' />
        <Title>{title}</Title>
      </TitleBox>
      {component}
    </Container>
  );
};

export default MypageContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ececec;
  border-radius: 10px;
  box-shadow: 0px 3px 18px rgba(0, 0, 0, 0.06);
  height: 40%;
  width: 36rem;
  padding: 20px;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const Icon = styled.img`
  padding-right: 15px;
`;

const Title = styled.p`
  font-size: 1.2rem;
  color: #191619;
`;
