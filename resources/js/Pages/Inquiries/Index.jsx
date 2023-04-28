import Navbar from "@/Components/Navbar";
import { Box, Flex, Avatar, Text, Button, Input, Link } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import MessagesSection from "./Partials/MessagesSection";

export default function Index({
  auth,
  establishment,
  inquiries,
  userInquiries,
}) {
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
              {userInquiries &&
                userInquiries
                  .slice()
                  .reverse()
                  .filter(
                    (inquiry, index, self) =>
                      index ===
                      self.findIndex((i) => i.user.id === inquiry.user.id)
                  )
                  .map((inquiry) => {
                    return (
                      <Box
                        key={inquiry.id}
                        mb={4}
                        borderRadius="md"
                        boxShadow="sm"
                        p={2}
                        _hover={{ bg: "gray.200" }}
                      >
                        <Link
                          href={route(
                            "establishments.inquiries.create",
                            inquiry.establishment.id
                          )}
                        >
                          <Flex alignItems="center">
                            <Avatar
                              name={inquiry.establishment.name}
                              src={`/${inquiry.establishment.image.path}`}
                              size="sm"
                              mr={2}
                            />
                            <Box>
                              <Text fontWeight="bold" fontSize="sm">
                                {inquiry.establishment.name}
                              </Text>
                              <Text fontSize="xs">{inquiry.message}</Text>
                            </Box>
                          </Flex>
                        </Link>
                      </Box>
                    );
                  })}
              {inquiries &&
                inquiries
                  .slice()
                  .reverse()
                  .filter(
                    (inquiry, index, self) =>
                      index ===
                      self.findIndex(
                        (i) => i.establishment.id === inquiry.establishment.id
                      )
                  )
                  .map((inquiry) => {
                    return (
                      <Box
                        key={inquiry.id}
                        mb={4}
                        borderRadius="md"
                        boxShadow="sm"
                        p={2}
                        _hover={{ bg: "gray.200" }}
                      >
                        <Link
                          href={route(
                            "establishments.inquiries.create",
                            inquiry.establishment.id
                          )}
                        >
                          <Flex alignItems="center">
                            <Avatar
                              name={inquiry.establishment.name}
                              src={`/${inquiry.establishment.image.path}`}
                              size="sm"
                              mr={2}
                            />
                            <Box>
                              <Text fontWeight="bold" fontSize="sm">
                                {inquiry.establishment.name}
                              </Text>
                              <Text fontSize="xs">{inquiry.message}</Text>
                            </Box>
                          </Flex>
                        </Link>
                      </Box>
                    );
                  })}
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
