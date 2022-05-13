import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
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

const Submit = styled.button``;

const CreateAirline = () => {
  const [airline, setAirline] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [warning, setWarning] = useState(false);

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

  // Creating airline in DB
  const handleClick = async () => {
    if (airline) {
      if (country) {
        try {
          await axios.post("http://localhost:5000/api/airlines/createairline", {
            name: airline,
            country: country,
          });
        } catch (err) {
          console.log(err);
        }

        navigate("/airlines");
      } else {
        setWarning(true);
      }
    } else {
      setWarning(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create airline</Title>
        <Form>
          <Label>Airline name: </Label>
          <Input type="text" onChange={(e) => setAirline(e.target.value)} />
          <Label>Select airline country: </Label>
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
            <FormHelperText>
              {warning && <span>You have to fill all inputs</span>}
            </FormHelperText>
          </FormControl>
          {/* <Select
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Select country"
          >
            <Option value="" disabled selected>
              Select your country
            </Option>
            {countries.map((item) => (
              <Option key={item._id}>{item.name}</Option>
            ))}
          </Select> */}
        </Form>

        <Button
          variant="contained"
          onClick={handleClick}
          style={{
            marginTop: "15px",
          }}
        >
          Submit airline
        </Button>
      </Wrapper>
    </Container>
  );
};

export default CreateAirline;
