import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';
import { ReactComponent as LogoSVG } from '../../assets/icons/Logo.svg';

function Button({ children, isActive, onClick }) {
  return (
    <NavButton isActive={isActive} onClick={onClick}>
      {children}
    </NavButton>
  );
}

function Navbar() {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const handleLogoClick = () => {
    setActiveButton(null); // StyledLogo를 클릭하면 activeButton을 초기화합니다.
  };

  return (
    <>
      <GlobalStyle />
      <NavbarWrapper>
        <NavbarContainer>
          <LogoContainer to={'/'} onClick={handleLogoClick}>
            <StyledLogo />
          </LogoContainer>
          <ButtonContainer>
            <Link to={'/library'}>
              <Button
                isActive={activeButton === 'library'}
                onClick={() => handleButtonClick('library')}
              >
                도서관찾기
              </Button>
            </Link>
            <Link to={'/board'}>
              <Button
                isActive={activeButton === 'board'}
                onClick={() => handleButtonClick('board')}
              >
                게시판
              </Button>
            </Link>
            <Link to={'/mypage'}>
              <Button
                isActive={activeButton === 'mypage'}
                onClick={() => handleButtonClick('mypage')}
              >
                마이페이지
              </Button>
            </Link>
            <Link to={'/login'}>
              <Button
                isActive={activeButton === 'logout'}
                onClick={() => handleButtonClick('logout')}
              >
                로그아웃
              </Button>
            </Link>
          </ButtonContainer>
        </NavbarContainer>
      </NavbarWrapper>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
  }
`;

const NavbarWrapper = styled.div`
  width: 100%; /* 네브바가 전체 너비를 차지하도록 설정 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 너비 계산 */
  border-bottom: 1px solid #c4c4c4; /* 더 얇은 선 */
  margin: 0; /* 모든 마진 제거 */
  padding: 10px 0; /* 모든 패딩 제거 */
`;

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 20px; /* 원하는 패딩 값을 설정 */
  max-width: 1200px; /* 중앙 정렬을 위한 최대 너비 설정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const LogoContainer = styled(Link)`
  margin-right: auto;
`;

const StyledLogo = styled(LogoSVG)`
  width: 210px;
  height: 58.48px;
`;

const NavButton = styled.button`
  font-family: 'SUITE';
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? '700' : '400')};
  font-size: 18px;
  line-height: 16px;
  text-align: center;
  color: #543d20;
  border: none;
  background-color: transparent;
  margin: 0 15px;
  cursor: pointer;

  &:hover {
    font-weight: 700;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export default Navbar;
