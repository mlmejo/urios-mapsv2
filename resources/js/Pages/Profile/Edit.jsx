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
import UserEstablishments from "./Partials/UserEstablishments";

export default function Edit({ auth, establishments, bookings }) {
  return (
    <Navbar user={auth.user}>
      <Head title="Profile" />

      <SimpleGrid columns={{ base: 1, lg: 4 }} spacing={4}>
        <Box p={6} boxShadow="md" rounded="md">
          <UpdateProfileInformationForm />
        </Box>

        {/* {auth.user.roles.some((role) => role.name === "admin") ? ( */}
        {/* <></> */}
        {/* ) : ( */}
        <>
          <Box
            gridColumn={{ lg: "2 / span 2" }}
            boxShadow="md"
            p={6}
            rounded="md"
          >
            <UserEstablishments establishments={establishments} />
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
        </>
        {/* )} */}
      </SimpleGrid>
    </Navbar>
  );
}
