import React from "react";
import styled from "styled-components";
import AirportCard from "../components/AirportCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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

const AirportCardWrapper = styled.div`
  width: 1000px;
`;

const Text = styled.p`
  font-size: 30px;
`;

const Airports = () => {
  const [airports, setAirports] = useState([]);
  const [change, setChange] = useState([0]);

  // Getting all airports that are in DB with useEffect
  useEffect(() => {
    const getAirports = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/airports");
        setAirports(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAirports();
  }, [change]);

  if (airports.length <= 0)
    return (
      <WrapperHelper>
        <Text
          style={{
            margin: "30px",
          }}
        >
          There are no airports
        </Text>
        <Link
          to="/createairport"
          style={{
            textDecoration: "none",
            margin: "10px",
          }}
        >
          <Button variant="contained"> Add airport</Button>
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
          AIRPORTS
        </Text>
        <Container>
          <AirportCardWrapper>
            {airports.map((item) => (
              <AirportCard
                id={item._id}
                key={item._id}
                name={item.name}
                country={item.country}
                lat={item.latitude}
                lng={item.longitude}
                airlines={item.airlines}
                setChange={setChange}
                change={change}
              />
            ))}
          </AirportCardWrapper>
        </Container>
        <Container>
          <Wrapper>
            <Link
              to="/createairport"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              <Button variant="contained" style={{ marginTop: "25px" }}>
                Add airport
              </Button>
            </Link>
          </Wrapper>
        </Container>
      </WrapperHelper>
    </>
  );
};

export default Airports;
