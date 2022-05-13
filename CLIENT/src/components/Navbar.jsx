import React from "react";
import styled from "styled-components";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Container = styled.div`
  width: 100%;
  height: 70px;
  background-color: #dadada;
  display: flex;
  justify-content: center;
`;

const Left = styled.div`
  height: 100%;
  width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  margin-right: 20px;
`;

const NavbarOptionWrapper = styled.div`
  flex: 3;
  display: flex;
`;

const NavbarOption = styled.div`
  color: #000000;
  font-size: 20px;
  margin-right: 30px;
  cursor: pointer;
`;

const Right = styled.div`
  height: 100%;
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
`;

// const Login = styled.div`
//   color: white;
//   cursor: pointer;
//   color: #000000;
//   font-size: 20px;
// `;
// const SignUp = styled.div`
//   color: white;
//   cursor: pointer;
//   color: #000000;
//   font-size: 20px;
// `;

const Logout = styled.div`
  color: white;
  cursor: pointer;
  color: #000000;
  font-size: 20px;
`;

const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Container>
      <Left>
        <Logo>
          <AirplanemodeActiveIcon style={{ fontSize: "60" }} />
        </Logo>
        <NavbarOptionWrapper>
          <Link to="/airlines" style={{ textDecoration: "none" }}>
            <NavbarOption>Airlines</NavbarOption>
          </Link>
          <Link to="/airports" style={{ textDecoration: "none" }}>
            <NavbarOption>Airports</NavbarOption>
          </Link>
        </NavbarOptionWrapper>
      </Left>
      <Right>{user && <Logout onClick={handleLogout}>Logout</Logout>}</Right>
    </Container>
  );
};

export default Navbar;
