import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../redux/airlineSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

const Container = styled.div``;

const Wrapper = styled.div`
  border: 0.2px black solid;
  margin-top: 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;
  border-radius: 30px;
`;

const Name = styled.div`
  font-size: 20px;
  margin-left: 15px;
  min-width: 100px;
`;

const Country = styled.div``;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  justify-content: space-around;
`;

const AirlineCard = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  // const token = user.user.accessToken;

  const handleChange = () => {
    let i = props.change.slice(-1);
    i++;
    props.setChange([...props.change, i]);
  };

  useEffect(() => {
    setId(props.id);
    setName(props.name);
    setCountry(props.country);
  }, []);
  // Taking data from the airline that user clicks
  const handleEdit = () => {
    dispatch(update({ name, country, id }));
  };

  // Deleting an airline
  const handleClick = async (value) => {
    setId(value);
    try {
      await axios.delete(`http://localhost:5000/api/airlines/${id}`, {
        headers: { token: "Bearer" + " " + user.user.accessToken },
      });
      handleChange();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Name> {props.name}</Name>
          <Country>{props.country}</Country>
          <RightSide>
            <Link
              to={`/updateairline/${id}`}
              style={{
                textDecoration: "none",
                color: "white",
                width: "60px",
              }}
            >
              <Button onClick={() => handleEdit()} variant="contained">
                Edit
              </Button>
            </Link>

            <DeleteIcon
              style={{
                cursor: "pointer",
              }}
              onClick={() => handleClick(props.id)}
            />
          </RightSide>
        </Wrapper>
      </Container>
    </>
  );
};

export default AirlineCard;
