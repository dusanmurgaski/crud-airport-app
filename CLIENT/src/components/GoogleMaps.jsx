import React from "react";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const GoogleMaps = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA_JdF0AW9DT0SSo0BUyq99X3KIrYVqaXU",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      lat={props.lat}
      lng={props.lng}
      width={props.width}
      height={props.height}
      setLat={props.setLat}
      setLng={props.setLng}
    />
  );
};

const Map = (props) => {
  const handleClickedMap = (e) => {
    let latitude = e.latLng.lat();
    let longtitude = e.latLng.lng();
    props.setLat(latitude);
    props.setLng(longtitude);
  };

  const containerStyle = {
    width: props.width,
    height: props.height,
  };
  const center = useMemo(() => ({ lat: props.lat, lng: props.lng }), []);
  return (
    <GoogleMap
      onClick={handleClickedMap}
      zoom={13}
      center={center}
      mapContainerStyle={containerStyle}
      defaultOptions={{ mapTypeControl: false }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default GoogleMaps;
