import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { register, reset } from "../redux/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 650px;
  height: 500px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: aliceblue;
`;

const FirstInsideWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: aliceblue;
  width: 100%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Text = styled.p`
  display: flex;
  justify-content: space-around;
  gap: 500px;
  width: 600px;
  font-size: 25px;
  font-weight: 300;
  margin: 15px;
`;

const Hr = styled.hr`
  width: 99.5%;
  margin-bottom: ${(props) => props.marginB};
`;

const SecInsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: aliceblue;
`;
const SecondText = styled.p`
  font-size: ${(props) => props.size};
  opacity: ${(props) => props.opacity};
  cursor: ${(props) => props.pointer};
  margin-top: ${(props) => props.marginT};
`;
const Input = styled.input`
  width: 500px;
  height: 50px;
  margin-bottom: ${(props) => props.marginB};
`;
const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 80px;
  height: 40px;
  color: white;
  background-color: red;
  margin-bottom: 30px;
  margin-left: 71px;
  cursor: pointer;
  :hover {
    background-color: #aa0000;
  }
`;
const Span = styled.span`
  color: #bb0000;
  cursor: pointer;
  :hover {
    border-bottom: 1px solid red;
  }
`;

const HelperWrapper = styled.div`
  margin: 15px;
  display: flex;
  width: 100%;
  margin-left: 75px;
`;

const SecHelperWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: left;
`;

const RegisterModal = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navitate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      props.setShowLoginModal(false);
      props.setShowRegModal(false);
      navitate("/airlines");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch]);

  const handleClick = () => {
    const userData = {
      username,
      email,
      password,
    };
    dispatch(register(userData));

    props.setShowLoginModal(false);
    props.setShowRegModal(true);
  };

  const loginModal = () => {
    props.setShowLoginModal(true);
    props.setShowRegModal(false);
  };

  if (!props.showRegModal) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <FirstInsideWrapper>
          {isLoading && <p>loading</p>}
          <Text>Register</Text>
          <Hr marginB="30px" />
        </FirstInsideWrapper>
        <SecInsideWrapper>
          <HelperWrapper>
            <SecondText opacity="60%" size="13px">
              Sign up with your email
            </SecondText>
          </HelperWrapper>

          <Input
            marginB="20px"
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            marginB="20px"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            marginB="5px"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <SecHelperWrapper>
            <Button onClick={handleClick}>Sign up</Button>
          </SecHelperWrapper>

          <Hr marginB="9px" />
          <SecondText marginT="25px">
            Already having an account? <Span onClick={loginModal}>Log in</Span>
          </SecondText>
        </SecInsideWrapper>
      </Wrapper>
    </Container>
  );
};

export default RegisterModal;
