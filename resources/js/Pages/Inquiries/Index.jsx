import Navbar from "@/Components/Navbar";
import { Box, Flex, Avatar, Text, Button, Input } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import MessagesSection from "./Partials/MessagesSection";

export default function Index({ auth, establishment, inquiries }) {
  return (
    <Navbar user={auth.user}>
      <Head title="Inquiries" />

      <Box h="100vh">
        <Flex h="100%" maxH="100vh">
          <Box bg="white" w="18rem" boxShadow="xs" overflowY="scroll">
            <Box p={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Recent Conversations
              </Text>
              <Box
                mb={4}
                borderRadius="md"
                boxShadow="sm"
                p={2}
                _hover={{ bg: "gray.200" }}
              >
                <Flex alignItems="center">
                  <Avatar name="John Doe" size="sm" mr={2} />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">
                      John Doe
                    </Text>
                    <Text fontSize="xs">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Text>
                  </Box>
                </Flex>
              </Box>
              <Box
                borderRadius="md"
                boxShadow="sm"
                p={2}
                _hover={{ bg: "gray.200" }}
              >
                <Flex alignItems="center">
                  <Avatar name="Jane Doe" size="sm" mr={2} />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">
                      Jane Doe
                    </Text>
                    <Text fontSize="xs">
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>

          {establishment ? (
            <MessagesSection
              user={auth.user}
              inquiries={inquiries}
              establishment={establishment}
            />
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </Navbar>
  );
}
