import Navbar from "@/Components/Navbar";
import {
  Box,
  Card,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { FaBuilding, FaCamera, FaUtensils } from "react-icons/fa";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";


function renderEstablishmentIcon(category) {
  switch (category) {
    case "Restaurant":
      return (
        <HStack color={"orange"} alignItems={"center"} spacing={1}>
          <FaUtensils />
          <Text>Restaurant</Text>
        </HStack>
      );
    case "Hotel":
      return (
        <HStack color={"blue"} alignItems={"center"} spacing={1}>
          <FaBuilding />
          <Text>Hotel</Text>
        </HStack>
      );
    case "Tourist Spot":
      return (
        <HStack color={"green"} alignItems={"center"} spacing={1}>
          <FaCamera />
          <Text noOfLines={1}>Tourist Spot</Text>
        </HStack>
      )
  }
}

function renderPrice(pricing) {
  switch (pricing) {
    case "low":
      return "₱";
    case "medium":
      return "₱₱";
    case "high":
      return "₱₱₱";
  }
}

export default function Index({ auth, establishments }) {
  const [_establishments, setEstablishments] = useState(establishments);

  const [filters, setFilters] = useState({
    category: "",
    pricing: "",
  })

  const handleChange = (e) => {
    if (e === null) {
      setFilters({
        ...filters,
        category: "",
      });
      return;
    }

    setFilters({ ...filters, category: e.value });
  }

  const handlePriceFilter = (e) => {
    if (e === null) {
      setFilters({
        ...filters,
        pricing: "",
      });
      return;
    }

    setFilters({ ...filters, pricing: e.value });
  }

  useEffect(() => {
    setEstablishments(establishments.filter((establishment) => {
      if (!filters.category && !filters.pricing) return true;

      for (let key in filters) {
        if (filters[key] !== "" && establishment[key] !== filters[key]) {
          return false;
        }
      }

      return true;
    }))
  }, [filters]);

  return (
    <Navbar user={auth.user}>
      <Head title="Establishments" />

      <Stack m={4} spacing={4}>
        <HStack>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select placeholder="Filter Category" isClearable options={[
              { label: "Restaurant", value: "Restaurant" },
              { label: "Hotel", value: "Hotel" },
              { label: "Tourist Spot", value: "Tourist Spot" },
            ]} onChange={handleChange} />
          </FormControl>

          <FormControl>
            <FormLabel>Pricing</FormLabel>
            <Select placeholder="Filter Price" isClearable options={[
              { label: "₱", value: "low" },
              { label: "₱₱", value: "medium" },
              { label: "₱₱₱", value: "high" },
            ]} onChange={handlePriceFilter} />
          </FormControl>
        </HStack>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4}>
          {_establishments.map((establishment) => {
            return (
              <Box
                key={establishment.id}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                _hover={{
                  shadow: "md",
                }}
              >
                <Image
                  src={establishment.image.path}
                  alt="Establishment Image"
                  objectFit="cover"
                  w="100%"
                  h={{ base: "200px", md: "250px" }}
                />
                <Box p={4}>
                  <Flex justify={"space-between"} mb={2}>
                    <Stack spacing={0}>
                      <Heading size="md">{establishment.name}</Heading>
                      <Text color="gray.400" fontSize="sm">
                        {establishment.address}
                      </Text>
                    </Stack>

                    <Stack spacing={0}>
                      {renderEstablishmentIcon(establishment.category)}

                      <Text fontSize="sm" color="gray.400">
                        {establishment.opening_days}
                      </Text>

                      <Text fontSize="sm" color="gray.400">
                        {establishment.opening_time}
                        {" - "}
                        {establishment.closing_time}
                      </Text>
                    </Stack>
                  </Flex>

                  <Text color="gray.600" fontSize="sm" mb={2} noOfLines={5} >
                    {establishment.description}
                  </Text>

                  <Flex
                    mt={4}
                    justifyContent="space-between"
                  >
                    <Link href={route("establishments.show", establishment.id)} fontWeight="bold" color="teal.500">
                      View Details
                    </Link>

                    <Text fontWeight={"bold"}>{renderPrice(establishment.pricing)}</Text>
                  </Flex>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Navbar>
  );
}
