import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Head, useForm } from "@inertiajs/react";

export default function Register({ isAdmin }) {
  const { data, setData, post, errors, reset } = useForm({
    name: isAdmin ? "Administrator" : "",
    email: isAdmin ? "admin@example.com" : "",
    password: "",
    password_confirmation: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setData("role", checked ? "business owner" : "regular user");
  }, [checked]);

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();

    post(isAdmin ? route("admin.store") : route("register"));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {isAdmin ? (
        <Head title="Create Administrator Account" />
      ) : (
        <Head title="Sign Up" />
      )}

      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={4} px={6}>
        <Stack align={"center"}>
          {isAdmin ? (
            <Heading fontSize={"3xl"} textAlign={"center"}>
              Create an administrator account
            </Heading>
          ) : (
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          )}
        </Stack>
        <Box
          width={"md"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={submit}>
            <Stack spacing={4}>
              <FormControl id="name" isRequired isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />

                {errors.name ? (
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl id="email" isRequired isInvalid={errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                {errors.email ? (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl id="password" isRequired isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                  />
                  {errors.password ? (
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  ) : (
                    <></>
                  )}
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl id="password_confirmation" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={handleChange}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      tabIndex={-1}
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {!isAdmin ? (
                <Checkbox onChange={(e) => setChecked(!checked)}>
                  Are you a Business Owner?
                </Checkbox>
              ) : (
                <></>
              )}
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href={route("login")} color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
