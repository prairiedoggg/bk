import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ReactComponent as LogoSVG } from "../../../src/assets/icons/Logo.svg";

const NavbarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
`;

const LogoContainer = styled(Link)`
  margin-right: auto;
`;

const StyledLogo = styled(LogoSVG)`
  width: 210px;
  height: 58.48px;
`;

const NavButton = styled.button`
  font-family: "SUITE";
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? "700" : "400")};
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
    <NavbarContainer>
      <LogoContainer to={"/"} onClick={handleLogoClick}>
        <StyledLogo />
      </LogoContainer>
      <ButtonContainer>
        <Link to={"/library"}>
          <Button
            isActive={activeButton === "library"}
            onClick={() => handleButtonClick("library")}
          >
            도서관찾기
          </Button>
        </Link>
        <Link to={"/board"}>
          <Button
            isActive={activeButton === "board"}
            onClick={() => handleButtonClick("board")}
          >
            게시판
          </Button>
        </Link>
        <Link to={"/mypage"}>
          <Button
            isActive={activeButton === "mypage"}
            onClick={() => handleButtonClick("mypage")}
          >
            마이페이지
          </Button>
        </Link>
        <Link to={"/logout"}>
          <Button
            isActive={activeButton === "logout"}
            onClick={() => handleButtonClick("logout")}
          >
            로그아웃
          </Button>
        </Link>
      </ButtonContainer>
    </NavbarContainer>
  );
}

export default Navbar;
