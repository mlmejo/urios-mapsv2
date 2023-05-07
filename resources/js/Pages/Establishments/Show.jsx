import Navbar from "@/Components/Navbar";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  Flex,
  Divider,
  VStack,
  Icon,
  Stack,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import { FiUser } from "react-icons/fi";
import ReviewFormModal from "./Partials/ReviewFormModal";
import { StarIcon } from "@chakra-ui/icons";
import BookingFormModal from "./Partials/BookingFormModal";
import { FaUtensils } from "react-icons/fa";

function renderEstablishmentIcon(category) {
  switch (category) {
    case "Restaurant":
      return (
        <HStack
          color={"orange"}
          alignItems={"center"}
          spacing={1}
          fontSize="xl"
        >
          <FaUtensils />
          <Text>Restaurant</Text>
        </HStack>
      );
  }
}

export default function Show({ auth, establishment }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: bookingIsOpen,
    onOpen: bookingOnOpen,
    onClose: bookingOnClose,
  } = useDisclosure();

  return (
    <Navbar user={auth.user}>
      <Head title={establishment.name} />

      <Box borderRadius="lg">
        <Container maxW="container.xl" py={8}>
          <Flex justify="space-between">
            <Stack mb={8}>
              <Heading as="h1" size="2xl">
                {establishment.name}
              </Heading>
              <Text fontSize="xl" color={"gray.400"}>
                {establishment.address}
              </Text>
            </Stack>
            <Stack spacing={0}>
              {renderEstablishmentIcon(establishment.category)}
              <Text fontSize="xl" color={"gray.400"}>
                {establishment.opening_days}
              </Text>
              <Text fontSize="xl" color={"gray.400"}>
                {establishment.opening_time} {" - "}
                {establishment.closing_time}
              </Text>
            </Stack>
          </Flex>
          <Flex gap={4} flexDirection={{ base: "column", md: "row" }}>
            <Stack
              position="relative"
              w={{ base: "100%", md: "50%" }}
              h={{ base: "200px", md: "400px" }}
              borderTopLeftRadius="md"
              borderBottomLeftRadius={{ base: "md", md: 0 }}
            >
              <Image
                src={"/" + establishment.image.path}
                alt={establishment.name}
                w="100%"
                h="100%"
                objectFit="cover"
                top={0}
                left={0}
                zIndex={-1}
                borderRadius="lg"
              />

              <VStack
                align="stretch"
                w={{ base: "100%" }}
                borderBottomRightRadius="md"
                borderTopRightRadius={{ base: "md", md: 0 }}
                backgroundColor="white"
                p={4}
                borderRadius="lg"
                boxShadow="md"
              >
                <Heading as="h2" size="md" mb={2}>
                  About {establishment.name}
                </Heading>
                <Divider mb={4} />
                <Text mb={2}>{establishment.description}</Text>
                <Text mb={2}>{establishment.location}</Text>
                <Divider mb={4} />
                <Button
                  as="a"
                  href={route("inquiries.create", {
                    establishment: establishment.id,
                  })}
                  colorScheme="teal"
                >
                  Inquire
                </Button>
                <Button onClick={bookingOnOpen} colorScheme="blue">
                  Book
                </Button>
              </VStack>
            </Stack>
            <Box
              width="100%"
              backgroundColor="white"
              p={4}
              borderRadius="md"
              boxShadow="md"
            >
              <Flex justify="space-between">
                <Heading as="h2" size="md">
                  Reviews
                </Heading>
                <Button size="sm" colorScheme="blue" onClick={onOpen}>
                  Leave a Review
                </Button>
              </Flex>
              <Divider my={4} />
              {establishment.reviews ? (
                establishment.reviews.map((review) => (
                  <Flex key={review.id} direction="column" mb={4}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Flex alignItems="center">
                        {[...Array(parseInt(review.rating))].map((_, i) => (
                          <StarIcon key={i} color="yellow.400" />
                        ))}
                        <Text fontWeight="bold" ml={2}>
                          {review.user.name}
                        </Text>
                      </Flex>
                      <Text fontSize="sm" color="gray.500" textAlign="right">
                        {new Date(review.created_at).toLocaleDateString()}
                      </Text>
                    </Flex>
                    <Box>
                      <Text py={2}>{review.content}</Text>
                    </Box>
                  </Flex>
                ))
              ) : (
                <Text p={2}>No reviews yet</Text>
              )}
            </Box>
          </Flex>
        </Container>
      </Box>

      <ReviewFormModal
        establishment={establishment}
        isOpen={isOpen}
        onClose={onClose}
      />

      <BookingFormModal
        establishment={establishment}
        isOpen={bookingIsOpen}
        onClose={bookingOnClose}
      />
    </Navbar>
  );
}
