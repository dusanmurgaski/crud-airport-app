import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { login, reset } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

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
  background-color: white;
  height: 380px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 10px;
  background-color: aliceblue;
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
  width: 99%;
  margin-bottom: ${(props) => props.marginB};
`;

const InsideWrapper = styled.div`
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
  margin-bottom: 10px;
  cursor: pointer;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
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
  justify-content: space-around;
  gap: 122px;
`;

const Error = styled.span`
  color: red;
`;

const LoginModal = (props) => {
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
      password,
    };
    dispatch(login(userData));
  };

  const registerModal = () => {
    props.setShowLoginModal(false);
    props.setShowRegModal(true);
  };

  if (!props.showLoginModal) {
    return null;
  }
  return (
    <Container>
      <Wrapper>
        <Text>Log in</Text>
        <Hr marginB="30px" />

        <InsideWrapper>
          <HelperWrapper>
            <SecondText opacity="60%" size="13px">
              log in with username
            </SecondText>
          </HelperWrapper>

          <Input
            marginB="20px"
            type="text"
            placeholder="Username "
            onChange={(e) => setUsername(e.target.value)}
            required={true}
          />
          <Input
            marginB="5px"
            type="password"
            placeholder="Password"
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SecHelperWrapper>
            <Button onClick={handleClick}>Log in</Button>
            {isLoading && <p>loading</p>}
            {isError && <Error>Something went wrong.</Error>}
          </SecHelperWrapper>
          <Hr marginB="9px" />
          <SecondText>
            Don't have an account? <Span onClick={registerModal}>Sign up</Span>
          </SecondText>
        </InsideWrapper>
      </Wrapper>
    </Container>
  );
};

export default LoginModal;
