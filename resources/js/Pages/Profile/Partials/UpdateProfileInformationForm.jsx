import {
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
} from "@chakra-ui/react";
import { useForm, usePage } from "@inertiajs/react";
import { useRef, useState } from "react";

export default function UpdateProfileInformation() {
  const user = usePage().props.auth.user;

  const { data, setData, post, errors } = useForm({
    name: user.name,
    email: user.email,
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

    post(route("profile.update"));
  };

  return (
    <>
      <Heading size="md">Update Profile</Heading>
      <form onSubmit={submit}>
        <Stack spacing={4}>
          <Center p={4}>
            <Image
              src={
                data.image ? URL.createObjectURL(data.image) : user.image.path
              }
              alt="User Profile Image"
              borderRadius="full"
              boxSize="200px"
              objectFit="cover"
            />
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
            <FormLabel>Name</FormLabel>
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
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              name="email"
              value={data.email}
              onChange={(e) => setData("email", e.target.value)}
            />
            {errors.email ? (
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>

          <Button
            type="submit"
            loadingText="Submitting"
            size="sm"
            bg={"blue.400"}
            color={"white"}
            _hover={{ bg: "blue.500" }}
          >
            Save
          </Button>
        </Stack>
      </form>
    </>
  );
}
