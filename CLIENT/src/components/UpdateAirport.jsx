import React from "react";
import styled from "styled-components";
import GoogleMaps from "./GoogleMaps";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 100;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 500px;
  height: 45px;
  font-size: 15px;
  margin-bottom: 15px;
`;

const UpdateAirport = () => {
  const [airport, setAirport] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [assoAirlines, setAssoAirlines] = useState([]);
  const [countries, setCountries] = useState([]);
  const [airlines, setAirlines] = useState([]);

  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/countries");
        setCountries(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCountries();
  }, []);

  const airportData = useSelector((state) => state.airport);

  console.log(assoAirlines);

  useEffect(() => {
    setAirport(airportData.name);
    setCountry(airportData.country);
    setLatitude(airportData.latitude);
    setLongitude(airportData.longitude);
    setAssoAirlines(airportData.airlines);
  }, [airportData]);

  // Updating airport in DB
  const handleClick = async () => {
    try {
      axios.put(`http://localhost:5000/api/airports/${airportData.id}`, {
        name: airport,
        country: country,
        latitude: latitude,
        longitude: longitude,
        airlines: assoAirlines,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/airports");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Update airport:</Title>
        <Form>
          <Label>Airport name: </Label>
          <Input
            type="text"
            placeholder={airportData.name}
            onChange={(e) => setAirport(e.target.value)}
          />
          <Label>Country: </Label>
          <FormControl
            sx={{ m: 0, minWidth: 120 }}
            style={{ marginTop: "10px" }}
          >
            <InputLabel id="demo-simple-select-helper-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={country}
              label="Country"
              onChange={(e) => setCountry(e.target.value)}
            >
              {countries.map((item) => (
                <MenuItem key={item._id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Label>Select location:</Label>
          <GoogleMaps
            lat={airportData.latitude}
            lng={airportData.longitude}
            width={"400px"}
            height={"400px"}
            setLat={setLatitude}
            setLng={setLongitude}
          />
          <Label>
            lat: {latitude}, lng: {longitude}
          </Label>
          <Label>Associated airlines:</Label>
          {assoAirlines.map((item) => (
            <FormControl
              key={item}
              sx={{ m: 0, minWidth: 120 }}
              style={{ marginTop: "10px" }}
            >
              <InputLabel id="demo-simple-select-helper-label">
                Airline
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={item}
                label="Country"
                onChange={(e) => setAssoAirlines(e.target.value)}
              >
                {airlines.map((item) => (
                  <MenuItem key={item._id} value={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Form>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{
            marginTop: "15px",
          }}
        >
          Submit airport
        </Button>
      </Wrapper>
    </Container>
  );
};

export default UpdateAirport;
