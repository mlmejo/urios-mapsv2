import Navbar from "@/Components/Navbar";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ auth }) {
  const { data, setData, post, errors } = useForm({
    name: "",
    description: "",
    address: "",
    image: null,
  });

  const [filename, setFilename] = useState("");

  const handleChange = (e) => {
    if (!(e.target.files && e.target.files[0])) return;

    const file = e.target.files[0];

    setFilename(file.name);
    setData("image", file);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("establishments.store"));
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Add Establishment" />

      <Box
        bg={useColorModeValue("white", "gray.700")}
        rounded="lg"
        boxShadow="lg"
        mx={{ base: 4, md: "auto" }}
        p={8}
        width={{ base: "100%", md: "80%" }}
        maxWidth={{ base: "none", md: "600px" }}
      >
        <Heading as="h2" size="lg" mb={6}>
          Add Establishment
        </Heading>

        <form onSubmit={submit}>
          <Stack spacing={6}>
            <Center p={4}>
              {data.image ? (
                <Image
                  src={URL.createObjectURL(data.image)}
                  alt="Establishment Image"
                  boxSize="sm"
                  objectFit="cover"
                />
              ) : (
                <Box bg="gray.200" boxSize="sm" />
              )}
            </Center>
            <Stack alignItems="center" direction="row">
              <Button
                as="label"
                cursor="pointer"
                htmlFor="image-upload"
                colorScheme="blue"
                size="sm"
                paddingX={4}
              >
                Choose File
              </Button>
              <Text
                fontSize="sm"
                overflow="hidden"
                textAlign={{ base: "left", sm: "right" }}
                noOfLines={1}
              >
                {filename || "No file chosen"}
              </Text>
              <input
                type="file"
                id="image-upload"
                name="image"
                onChange={handleChange}
                accept="image/*"
                style={{ display: "none" }}
              />
            </Stack>
            <FormControl id="name" isRequired>
              <FormLabel>Establishment Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <FormControl id="description" isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                name="description"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
              />
              {errors.description ? (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={data.address}
                onChange={(e) => setData("address", e.target.value)}
              />
              {errors.address ? (
                <FormErrorMessage>{errors.address}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <Button type="submit" colorScheme="blue" size="md">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Navbar>
  );
}
