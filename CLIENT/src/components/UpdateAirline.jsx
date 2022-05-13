import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

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

const Option = styled.option``;

const UpdateAirline = () => {
  const [airline, setAirline] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const navigate = useNavigate();

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

  const airlineData = useSelector((state) => state.airline);

  useEffect(() => {
    setAirline(airlineData.name);
    setCountry(airlineData.country);
  }, [airlineData]);

  // Updating airline in DB
  const handleClick = async () => {
    try {
      await axios.put(`http://localhost:5000/api/airlines/${airlineData.id}`, {
        name: airline,
        country: country,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/airlines");
  };

  return (
    <Container>
      <Wrapper>
        <Title>Update airline</Title>
        <Form>
          <Label>Airline name: </Label>
          <Input
            type="text"
            placeholder={airlineData.name}
            onChange={(e) => setAirline(e.target.value)}
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
        </Form>
        <Button variant="contained" onClick={handleClick}>
          Update airline
        </Button>
      </Wrapper>
    </Container>
  );
};

export default UpdateAirline;
