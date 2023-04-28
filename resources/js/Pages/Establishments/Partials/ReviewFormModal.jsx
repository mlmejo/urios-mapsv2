import { useForm } from "@inertiajs/react";
import Rating from "./Rating";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
} from "@chakra-ui/react";

export default function ReviewFormModal({ establishment, isOpen, onClose }) {
  const { data, setData, post, errors } = useForm({
    content: "",
    rating: 1,
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("establishments.reviews.store", establishment.id), {
      onSuccess: () => location.reload(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={submit}>
        <ModalContent>
          <ModalHeader>
            {establishment ? establishment.name : ""} Coordinates
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="content" isInvalid={errors.longitude}>
                <FormLabel>Your Review</FormLabel>
                <Input
                  type="text"
                  name="content"
                  value={data.longitude}
                  onChange={(e) => setData("content", e.target.value)}
                />
                {errors.content ? (
                  <FormErrorMessage>{errors.content}</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl id="rating" isInvalid={errors.rating}>
                <FormLabel>Rating</FormLabel>
                <Rating
                  rating={data.rating}
                  setRating={(n) => setData("rating", n)}
                />
                {errors.rating ? (
                  <FormErrorMessage>{errors.rating}</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} size="sm" onClick={onClose}>
              Close
            </Button>
            <Button type="submit" colorScheme="blue" size="sm">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
