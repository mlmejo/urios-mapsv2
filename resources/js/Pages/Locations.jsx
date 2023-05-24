import Navbar from "@/Components/Navbar";
import { Box, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { Select } from "chakra-react-select";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";
import { FaBuilding, FaCamera, FaUtensils } from "react-icons/fa";
import Map, { Marker, NavigationControl } from "react-map-gl";

export default function Locations({ auth, establishments }) {
  const [popupEstablishment, setPopupEstablishment] = useState(null);

  const [viewState, setViewState] = useState({
    longitude: 125.5172,
    latitude: 8.9422,
    zoom: 15.0,
  });

  const markerBorder = (establishment) => {
    switch (establishment.category) {
      case "Restaurant":
        return "orange.500";

      case "Hotel":
        return "blue.500";

      case "Tourist Spot":
        return "green.500";
    }
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Map" />

      <Box mb={4}>
        <Select
          placeholder="Search an establishment"
          isSearchable
          isClearable
          options={establishments.map((e) => {
            return {
              label: e.name,
              value: e.id,
            };
          })}
          onChange={(e) => {
            const establishment = establishments.find(
              (obj) => obj.id === e.value
            );
            setViewState({
              ...viewState,
              longitude: establishment.location.longitude,
              latitude: establishment.location.latitude,
            });
          }}
        />
      </Box>

      <Map
        {...viewState}
        style={{ height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken="pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA"
        onMove={(e) => setViewState(e.viewState)}
      >
        <NavigationControl />
        <Stack
          bg={"white"}
          p={4}
          m={6}
          position={"fixed"}
          fontSize={"large"}
          rounded="md"
        >
          <strong>Legend</strong>:
          <Flex alignItems="center">
            <FaUtensils color="orange" />
            <Text ml={2}>Restaurant</Text>
          </Flex>
          <Flex alignItems="center">
            <FaBuilding color="blue" />
            <Text ml={2}>Hotel</Text>
          </Flex>
          <Flex alignItems="center">
            <FaCamera color="green" />
            <Text ml={2}>Tourist Spot</Text>
          </Flex>
        </Stack>
        {establishments.map((establishment) => {
          return (
            <div key={establishment.id}>
              <Marker
                longitude={parseFloat(establishment.location.longitude)}
                latitude={parseFloat(establishment.location.latitude)}
                onClick={() => setPopupEstablishment(establishment)}
              >
                <Text
                  background={markerBorder(establishment)}
                  p="1"
                  rounded="3px"
                  color="white"
                >
                  {establishment.name}
                </Text>
                <Image
                  src={`/${establishment.image.path}`}
                  rounded="full"
                  boxSize="100"
                  border="4px"
                  borderColor={markerBorder(establishment)}
                />
              </Marker>
            </div>
          );
        })}
        {/* {popupEstablishment ? (
          <Popup
            longitude={popupEstablishment.location.longitude}
            latitude={popupEstablishment.location.latitude}
            onClose={() => setPopupEstablishment(null)}
            closeOnClick={false}
            offset={40}
          >
            {popupEstablishment.name}
          </Popup>
        ) : (
          <></>
        )} */}
      </Map>
    </Navbar>
  );
}
