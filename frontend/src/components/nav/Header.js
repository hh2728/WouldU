import styled from "styled-components";
import { Link } from "react-router-dom";
import logo2 from "assets/img/logo2.png";
import Menu from "components/nav/Menu";

export default function Header() {
  return (
    <StyledWrapper>
      <div id="container">
        <Link to="/">
          <div id="logo">
            <img id="logo-image" src={logo2} alt="logo" />
          </div>
        </Link>
        <Menu />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  #container {
    width: 90%;
    height: 100px;
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 5px 0px;
  }
  a {
    text-decoration: none;
    color: black;
  }
  #logo {
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  #logo-image {
    width: 150px;
    height: 100px;
`;
