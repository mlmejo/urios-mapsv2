import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";

export default function Welcome() {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Head title="Welcome" />

      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Maps
            </Text>
            <br />{" "}
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            A web application that will help and promote the domestic tourism of
            Butuan City and serve as a tool to cope with the effects of the
            COVID-19 pandemic on the tourism sector.
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <Button
              as="a"
              href={route("register")}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Register
            </Button>
            <Button as="a" href={route("login")} rounded={"full"} paddingX={6}>
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1548345680-f5475ea5df84?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          }
        />
      </Flex>
    </Stack>
  );
}
