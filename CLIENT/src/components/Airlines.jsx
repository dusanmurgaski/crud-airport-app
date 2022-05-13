import React from "react";
import styled from "styled-components";
import AirlineCard from "./AirlineCard";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const WrapperHelper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
`;

const AirlineCardWrapper = styled.div`
  width: 700px;
`;

const Text = styled.p`
  font-size: 30px;
`;

const Airlines = () => {
  const [airlines, setAirlines] = useState([]);
  const [change, setChange] = useState([0]);

  // Getting all airlines that are in DB with useEffect
  useEffect(() => {
    const getAirlines = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/airlines");
        setAirlines(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAirlines();
  }, [change]);

  if (airlines.length <= 0)
    return (
      <WrapperHelper>
        <Text
          style={{
            margin: "30px",
          }}
        >
          There are no airlines
        </Text>
        <Link
          to="/createairline"
          style={{
            textDecoration: "none",
            margin: "10px",
          }}
        >
          <Button variant="contained"> Add airline</Button>
        </Link>
      </WrapperHelper>
    );
  return (
    <>
      <WrapperHelper>
        <Text
          style={{
            marginTop: "12px",
          }}
        >
          AIRLINES
        </Text>
        <Container>
          <AirlineCardWrapper>
            {airlines.map((item) => (
              <AirlineCard
                key={item._id}
                name={item.name}
                country={item.country}
                id={item._id}
                setChange={setChange}
                change={change}
              />
            ))}
          </AirlineCardWrapper>
        </Container>
        <Container>
          <Wrapper>
            <Link
              to="/createairline"
              style={{
                textDecoration: "none",
              }}
            >
              <Button variant="contained" style={{ marginTop: "25px" }}>
                Add airline
              </Button>
            </Link>
          </Wrapper>
        </Container>
      </WrapperHelper>
    </>
  );
};

export default Airlines;
