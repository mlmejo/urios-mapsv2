import Navbar from "@/Components/Navbar";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import Create from "./Establishments/Create";
import { FaUtensils } from "react-icons/fa";

function renderEstablishmentIcon(category) {
  switch (category) {
    case "Restaurant":
      return (
        <HStack color={"orange"} alignItems={"center"} spacing={1}>
          <FaUtensils />
          <Text>Restaurant</Text>
        </HStack>
      );
  }
}

export default function UserEstablishments({ auth, establishments }) {
  return (
    <Navbar user={auth.user}>
      <Head title="My Establishments" />
      <HStack alignItems={"start"}>
        <Create user={auth.user} />
        <Stack>
          <Heading as="h2" size="md">
            My Establishments
          </Heading>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={{ base: 0, md: 4 }}>
            {establishments.map((establishment) => {
              return (
                <Box
                  key={establishment.id}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  overflow="hidden"
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

                    <Text color="gray.600" fontSize="sm" mb={2} noOfLines={5}>
                      {establishment.description}
                    </Text>

                    <Flex
                      alignItems="center"
                      mt={4}
                      justifyContent="space-between"
                    >
                      <Link href="#" fontWeight="bold" color="teal.500">
                        View Details
                      </Link>

                      {establishment.active ? (
                        <Box
                          bg="teal.500"
                          color="white"
                          fontWeight="bold"
                          borderRadius="md"
                          px={2}
                          py={1}
                          fontSize="sm"
                        >
                          Approved
                        </Box>
                      ) : (
                        <Box
                          bg="red.500"
                          color="white"
                          fontWeight="bold"
                          borderRadius="md"
                          px={2}
                          py={1}
                          fontSize="sm"
                        >
                          Not Yet Approved
                        </Box>
                      )}
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        </Stack>
      </HStack>
    </Navbar>
  );
}
