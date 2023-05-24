import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function Create({ user }) {
  const { data, setData, post, errors, reset } = useForm({
    name: "",
    address: "",
    opening_time: "",
    closing_time: "",
    category: "",
    description: "",
    image: null,
    opening_days: "",
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

    post(route("establishments.store"), { onSuccess: () => reset() });
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.700")}
      rounded="lg"
      boxShadow="lg"
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
          <FormControl id="address" isRequired isInvalid={errors.address}>
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
          <HStack>
            <FormControl id="opening_time" isRequired>
              <FormLabel>Opening Time</FormLabel>
              <Input
                type="time"
                name="opening_time"
                value={data.opening_time}
                onChange={(e) => setData("opening_time", e.target.value)}
              />
              {errors.name ? (
                <FormErrorMessage>{errors.opening_time}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <FormControl
              id="closing_time"
              isRequired
              isInvalid={errors.closing_time}
            >
              <FormLabel>Closing Time</FormLabel>
              <Input
                type="time"
                name="closing_time"
                value={data.closing_time}
                onChange={(e) => setData("closing_time", e.target.value)}
              />
              {errors.closing_time ? (
                <FormErrorMessage>{errors.closing_time}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </HStack>
          <HStack>
            <FormControl id="opening_days" isRequired>
              <FormLabel>Opening Days</FormLabel>
              <Select
                placeholder="Select option"
                name="opening_days"
                value={data.opening_days}
                onChange={(e) => setData("opening_days", e.target.value)}
              >
                <option value="MON-SAT">MON-SAT</option>
                <option value="MON-SUN">MON-SUN</option>
              </Select>
              {errors.opening_days ? (
                <FormErrorMessage>{errors.opening_days}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <FormControl id="category" isRequired>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select option"
                name="category"
                onChange={(e) => setData("category", e.target.value)}
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Hotel">Hotel</option>
                <option value="Tourist Spot">Tourist Spot</option>
              </Select>
              {errors.category ? (
                <FormErrorMessage>{errors.category}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
            <FormControl id="pricing" isRequired>
              <FormLabel>Pricing</FormLabel>
              <Select
                placeholder="Select option"
                name="pricing"
                onChange={(e) => setData("pricing", e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
              {errors.pricing ? (
                <FormErrorMessage>{errors.pricing}</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </HStack>
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
          <Button type="submit" colorScheme="blue" size="md">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
