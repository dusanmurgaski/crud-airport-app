import React from "react";
import styled from "styled-components";
import GoogleMaps from "./GoogleMaps";
import ClearIcon from "@mui/icons-material/Clear";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { update } from "../redux/airportSlice";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Container = styled.div`
  border: 0.2px black solid;
  margin-top: 10px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: aliceblue;
  border-radius: 30px;
`;

const Name = styled.div`
  font-size: 20px;
  margin-left: 15px;
  min-width: 170px;
`;

const Country = styled.div`
  min-width: 100px;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  min-width: 280px;
  justify-content: space-around;
`;
const Coordinates = styled.div`
  min-width: 240px;
`;

const MapContainer = styled.div`
  position: absolute;
  top: 500px;
`;

const Airlines = styled.div`
  min-width: 100px;
`;

const AirlineName = styled.p``;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  width: 110px;
  justify-content: space-around;
`;

const AirportCard = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [airlines, setAirlines] = useState([]);
  const [map, setMap] = useState(false);
  const dispatch = useDispatch();

  const handleChange = () => {
    let i = props.change.slice(-1);
    i++;
    props.setChange([...props.change, i]);
  };

  const openMapHandler = () => {
    setMap(true);
  };
  const closeMapHandler = () => {
    setMap(false);
  };
  useEffect(() => {
    setId(props.id);
    setName(props.name);
    setCountry(props.country);
    setLatitude(props.lat);
    setLongitude(props.lng);
    setAirlines(props.airlines);
  }, []);
  // Taking data from the airport that user clicks
  const handleEdit = () => {
    dispatch(update({ name, country, id, latitude, longitude, airlines }));
  };
  // Deleting an airport
  const handleClick = async (value) => {
    setId(value);
    try {
      await axios.delete(`http://localhost:5000/api/airports/${id}`);
      handleChange();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Container>
        <Name> {props.name}</Name>
        <Country>{props.country}</Country>
        <Location>
          <Coordinates>
            <div>Latitude: {props.lat}</div>
            <div>Longitude: {props.lng}</div>
          </Coordinates>
          <LocationOnIcon
            style={{
              cursor: "pointer",
            }}
            onClick={openMapHandler}
          />

          {map && (
            <MapContainer>
              <ClearIcon onClick={closeMapHandler} />
              <GoogleMaps
                lat={props.lat}
                lng={props.lng}
                width={"800px"}
                height={"200px"}
              />
            </MapContainer>
          )}
        </Location>
        <Airlines>
          {props.airlines.map((item) => (
            <AirlineName key={item}>{item}</AirlineName>
          ))}
        </Airlines>
        <RightSide>
          <Link
            to={`/updateairport/${id}`}
            style={{ textDecoration: "none", color: "white" }}
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
      </Container>
    </>
  );
};

export default AirportCard;
