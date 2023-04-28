import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Head } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import { Box, SimpleGrid } from "@chakra-ui/react";
import UserEstablishments from "./Partials/UserEstablishments";

export default function Edit({ auth, establishments }) {
  return (
    <Navbar user={auth.user}>
      <Head title="Profile" />

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
        <Box p={6} boxShadow="md" rounded="md">
          <UpdateProfileInformationForm />
        </Box>

        {auth.user.roles.some((role) => role.name === "admin") ? (
          <></>
        ) : (
          <Box
            gridColumn={{ lg: "2 / span 2" }}
            boxShadow="md"
            p={6}
            rounded="md"
          >
            <UserEstablishments establishments={establishments} />
          </Box>
        )}
      </SimpleGrid>
    </Navbar>
  );
}
