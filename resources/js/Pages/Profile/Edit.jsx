import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Itirenaries from "./Partials/Itineraries";

export default function Edit({ auth, establishments, bookings, itineraries }) {
  return (
    <Navbar user={auth.user}>
      <Head title="Profile" />

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
        <Box p={6} boxShadow="md" rounded="md">
          <UpdateProfileInformationForm />
        </Box>
        <Box boxShadow="md" p={6} rounded="md">
          <Heading size="md">Bookings</Heading>
          <Stack mt={4} spacing={4}>
            {bookings.map((booking) => {
              return (
                <Box
                  key={booking.id}
                  mb={4}
                  borderRadius="md"
                  boxShadow="sm"
                  p={2}
                  _hover={{ bg: "gray.200" }}
                >
                  <Link href="#">
                    <Flex alignItems="center" justifyContent="space-between">
                      <Avatar
                        name={booking.user.name}
                        src={`/${booking.user.image.path}`}
                        size="sm"
                        mr={2}
                      />
                      <Text fontWeight="medium">
                        {booking.establishment.name}
                      </Text>
                      <Box>
                        <Text fontWeight="bold" fontSize="sm"></Text>
                        <Text fontSize="xs">
                          {new Date(booking.date).toLocaleDateString()}
                        </Text>
                      </Box>
                    </Flex>
                  </Link>
                </Box>
              );
            })}
          </Stack>
        </Box>
        <Box w={"100%"} boxShadow={"md"} p={6} rounded={"md"}>
          <Itirenaries itineraries={itineraries} />
        </Box>
      </SimpleGrid>
    </Navbar>
  );
}
