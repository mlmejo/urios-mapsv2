import Navbar from "@/Components/Navbar";
import {
  Box,
  Card,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { FiUser } from "react-icons/fi";

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
              <Card
                marginBottom={{ base: "4", md: "0" }}
                borderRadius="xl"
                overflow="hidden"
                _hover={{ boxShadow: "md" }}
                transition="all 0.2s ease-in-out"
              >
                <Image
                  src={"/" + establishment.image.path}
                  alt="Establishment Logo"
                  borderRadius="none"
                  boxSize="auto"
                  objectFit="cover"
                  h="200px"
                  w="100%"
                />
                <Box p={4}>
                  <Stack spacing="3">
                    <Heading size="md" fontWeight="semibold">
                      {establishment.name}
                    </Heading>
                    <Text noOfLines={4}>{establishment.description}</Text>
                    <Stack direction="row" spacing="4" alignItems="center">
                      <Icon as={FiUser} />
                      <Text fontWeight="semibold">
                        {establishment.user.name}
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Card>
            </Link>
          );
        })}
      </SimpleGrid>
    </Navbar>
  );
}
