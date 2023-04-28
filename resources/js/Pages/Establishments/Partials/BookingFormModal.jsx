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

export default function BookingFormModal({ establishment, isOpen, onClose }) {
  const { data, setData, post, errors } = useForm({
    date: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("establishments.bookings.store", establishment.id), {
      onSuccess: () => location.reload(),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <form onSubmit={submit}>
        <ModalContent>
          <ModalHeader>{establishment ? establishment.name : ""}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <FormControl id="content" isInvalid={errors.longitude}>
                <FormLabel>Booking Date</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={(e) => setData("date", e.target.value)}
                />
                {errors.date ? (
                  <FormErrorMessage>{errors.date}</FormErrorMessage>
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
              Submit
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
