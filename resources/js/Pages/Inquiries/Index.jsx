import Navbar from "@/Components/Navbar";
import { Box, Flex, Avatar, Text, Button, Input, Link } from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import MessagesSection from "./Partials/MessagesSection";
import { useEffect, useState } from "react";

export default function Index({ auth, establishment, inq, conversations }) {
  const [inquiries, setInquiries] = useState(inq);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         route("api.establishments.inquiries", establishment.id)
  //       );

  //       setInquiries(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();

  //   const intervalId = setInterval(fetchData, 1000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return (
    <Navbar user={auth.user}>
      <Head title="Inquiries" />

      <Box h="100vh">
        <Flex h="100%">
          <Box bg="white" w="18rem" h="87%" boxShadow="xs" overflowY="scroll">
            <Box p={4}>
              <Text fontSize="sm" fontWeight="bold" mb={2}>
                Recent Conversations
              </Text>
              {conversations
                .slice()
                .reverse()
                .filter(
                  (conversation, index, self) =>
                    index ===
                    self.findIndex(
                      (c) =>
                        c.establishment.id === conversation.establishment.id
                    )
                )
                .map((conversation) => {
                  return (
                    <Box
                      key={conversation.id}
                      mb={4}
                      borderRadius="md"
                      boxShadow="sm"
                      p={2}
                      _hover={{ bg: "gray.200" }}
                    >
                      <Link
                        href={route("inquiries.create", {
                          establishment: conversation.establishment.id,
                        })}
                      >
                        <Flex alignItems="center">
                          <Avatar
                            name="#"
                            src={
                              conversation.establishment.user.id !==
                              auth.user.id
                                ? "/" + conversation.establishment.image.path
                                : "/" + conversation.sender.image.path
                            }
                            size="sm"
                            mr={2}
                          />
                          <Box>
                            <Text fontWeight="bold" fontSize="sm">
                              {conversation.establishment.user.id !==
                              auth.user.id
                                ? conversation.establishment.name
                                : `${conversation.sender.name} (${conversation.establishment.name})`}
                            </Text>
                            <Text fontSize="xs">{conversation.message}</Text>
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
              establishment={establishment}
              inquiries={inquiries}
            />
          ) : (
            <></>
          )}
        </Flex>
      </Box>
    </Navbar>
  );
}
