import { Box, Button, HStack, Heading, Stack } from "@chakra-ui/react";

export default function Itineraries({ itineraries }) {
  return (
    <Box>
      <HStack flex={{ base: 0, md: 1 }} justify={"space-between"}>
        <Heading as="h2" size={"md"}>
          My Itineraries
        </Heading>
        <Button
          as="a"
          href={route("itineraries.create")}
          size="sm"
          colorScheme="blue"
        >
          Create Itirenary
        </Button>
      </HStack>
      <Stack spacing={4} mt={4}>
        {itineraries.map((itinerary) => {
          return (
            <Box key={itinerary.id} p={4} bg={"gray.100"} rounded={"md"}>
              <strong>Start</strong>: {itinerary.establishments[0].name} <br />
              <strong>End</strong>:{" "}
              {
                itinerary.establishments[itinerary.establishments.length - 1]
                  .name
              }<br />
              <strong>Budget</strong>: ₱{itinerary.price * 150}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
