import Navbar from "@/Components/Navbar";
import { Box, Button, Flex, HStack, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { Select } from "chakra-react-select";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Map, { Marker, NavigationControl } from "react-map-gl";

export default function Locations({ auth, establishments }) {
  const [viewState, setViewState] = useState({
    longitude: 125.5172,
    latitude: 8.9422,
    zoom: 15.0,
  })

  const renderPrice = (establishment) => {
    switch (establishment.pricing) {
      case "low":
        return 1
      case "medium":
        return 2
      case "high":
        return 3
    }
  }

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

  const [price, setPrice] = useState(0);

  const { data, setData, post, reset } = useForm({
    "establishments": [],
    "price": 0,
  });

  useEffect(() => {
    setData("price", price / 150);
  }, [price]);

  const submit = () => {
    post(route("itineraries.store"), { onSuccess: () => reset() });
  }

  return (
    <Navbar user={auth.user}>
      <Head title="Map" />
      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
        <Box padding={6}>
          <Flex flexDirection={{ base: "column", lg: "row" }} justifyContent={{ base: "left", lg: "space-between" }}>
            <Heading size="md" mb={4}>Create Itinerary</Heading>
            <Text><strong>Estimated Budget Allotment: ₱{price}</strong></Text>
          </Flex>
          <Box maxHeight={500} overflow={"auto"}>
            {data.establishments.map((establishment) => {
              return <Stack key={establishment.id} bg="gray.100" p={6} rounded="md" mb={4}>
                <Box>
                  <Flex alignItems="center" justifyContent="space-between">
                    <Text>
                      <strong>Establishment</strong>:
                    </Text>
                    <Box _hover={{ border: "2px solid gray", rounded: "md" }}>
                      <FaTimes onClick={() => {
                        setData("establishments", data.establishments.filter((e) => e.id !== establishment.id));
                        setPrice(() => price - renderPrice(establishment) * 150);
                      }} />
                    </Box>
                  </Flex>
                  {establishment.name}
                </Box>
                <Text>
                  <strong>Pricing</strong>: <br />
                  ₱{renderPrice(establishment) * 150}
                </Text>
              </Stack>
            })}
          </Box>
          <Flex justifyContent="flex-end">
            <Button colorScheme="blue" onClick={submit}>Confirm</Button>
          </Flex>
        </Box>
        <Stack gridColumn={"span 2"}>
          <Box mb={4}>
            <Select placeholder="Search an establishment" options={establishments.map((e) => {
              return {
                label: e.name,
                value: e.id,
              }
            })} onChange={(e) => {
              const establishment = establishments.find((obj) => obj.id === e.value);
              setViewState({
                ...viewState,
                longitude: establishment.location.longitude,
                latitude: establishment.location.latitude,
              })
            }} />
          </Box>

          <Map
            {...viewState}
            style={{ height: "100vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA"
            onMove={(e) => setViewState(e.viewState)}
          >
            <NavigationControl />
            {establishments.map((establishment) => {
              return (
                <div key={establishment.id}>
                  <Marker
                    longitude={parseFloat(establishment.location.longitude)}
                    latitude={parseFloat(establishment.location.latitude)}
                    onClick={() => {
                      if (data.establishments.includes(establishment)) return;
                      setData("establishments", [...data.establishments, establishment]);
                      setPrice(() => price + renderPrice(establishment) * 150);
                    }}
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
        </Stack>
      </SimpleGrid>
    </Navbar>
  );
}
