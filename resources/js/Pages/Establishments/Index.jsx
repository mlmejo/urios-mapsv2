import Navbar from "@/Components/Navbar";
import {
  Box,
  Card,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { FaUtensils } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import MessagesSection from "../Inquiries/Partials/MessagesSection";

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

export default function Index({ auth, establishments }) {
  return (
    <Navbar user={auth.user}>
      <Head title="Establishments" />

      <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing={4} m={4}>
        {establishments.map((establishment) => {
          return (
            <Link
              href={route("establishments.show", establishment.id)}
              key={establishment.id}
            >
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
                  </Flex>
                </Box>
              </Box>
            </Link>
          );
        })}
      </SimpleGrid>
    </Navbar>
  );
}
