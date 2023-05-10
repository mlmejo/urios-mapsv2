import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";

export default function MessagesSection({ user, establishment, inquiries }) {
  const { data, setData, post, reset } = useForm({
    message: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(
      route("inquiries.store", {
        establishment: establishment.id,
      }),
      {
        onSuccess: () => reset(),
      }
    );
  };

  return (
    <Flex
      direction="column"
      grow={1}
      height="87%"
      data-testid="message-section"
    >
      <Box bg="white" flex="1" boxShadow="md" overflowY="scroll">
        <Box bg="gray.200" py={2} px={4} borderBottomWidth="1px">
          <Text fontWeight="bold">{establishment.name}</Text>
        </Box>
        <Stack p={4} spacing={4}>
          {inquiries &&
            inquiries.map((inquiry) => {
              if (inquiry.receiver.id == inquiry.sender.id) {
                return (
                  <>
                    <Flex key={inquiry.id} alignItems="center" mb={2}>
                      <Avatar
                        name={inquiry.receiver.name}
                        src={"/" + inquiry.receiver.image.path}
                        size="sm"
                        mr={2}
                      />
                      <Box bg="gray.100" borderRadius="md" p={2}>
                        <Text>{inquiry.message}</Text>
                      </Box>
                    </Flex>
                    <Flex
                      key={inquiry.id}
                      alignItems="center"
                      justify="flex-end"
                    >
                      <Box bg="teal.500" borderRadius="md" p={2} color="white">
                        <Text>{inquiry.message}</Text>
                      </Box>
                      <Avatar
                        name={inquiry.sender.name}
                        src={"/" + inquiry.sender.image.path}
                        size="sm"
                        ml={2}
                      />
                    </Flex>
                  </>
                );
              }

              if (inquiry.receiver.id === user.id) {
                return (
                  <Flex key={inquiry.id} alignItems="center" mb={2}>
                    <Avatar
                      name={inquiry.receiver.name}
                      src={"/" + inquiry.receiver.image.path}
                      size="sm"
                      mr={2}
                    />
                    <Box bg="gray.100" borderRadius="md" p={2}>
                      <Text>{inquiry.message}</Text>
                    </Box>
                  </Flex>
                );
              } else {
                return (
                  <Flex key={inquiry.id} alignItems="center" justify="flex-end">
                    <Box bg="teal.500" borderRadius="md" p={2} color="white">
                      <Text>{inquiry.message}</Text>
                    </Box>
                    <Avatar
                      name={inquiry.sender.name}
                      src={"/" + inquiry.sender.image.path}
                      size="sm"
                      ml={2}
                    />
                  </Flex>
                );
              }
            })}
        </Stack>
      </Box>
      <form onSubmit={submit}>
        <Flex
          bg="gray.100"
          p={4}
          borderTopRadius="0"
          borderBottomEndRadius="lg"
        >
          <Input
            value={data.message}
            onChange={(e) => setData("message", e.target.value)}
            placeholder="Type a message..."
            flex="1"
            mr={4}
          />
          <Button type="submit" colorScheme="teal">
            Send
          </Button>
        </Flex>
      </form>
    </Flex>
  );
}
