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
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function CoordinatesFormModal({
  isOpen,
  onClose,
  establishment,
}) {
  const { data, setData, post, errors } = useForm({
    longitude: 0.0,
    latitude: 0.0,
  });

  useEffect(() => {
    setData({
      longitude: establishment ? establishment.location.longitude : 0.0,
      latitude: establishment ? establishment.location.latitude : 0.0,
    });
  }, [establishment]);

  const submit = (e) => {
    e.preventDefault();

    post(route("establishments.locations.store", establishment.id), {
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
              <FormControl id="longitude" isInvalid={errors.longitude}>
                <FormLabel>Longitude</FormLabel>
                <Input
                  type="text"
                  name="longitude"
                  value={data.longitude}
                  onChange={(e) => setData("longitude", e.target.value)}
                />
                {errors.longitude ? (
                  <FormErrorMessage>{errors.longitude}</FormErrorMessage>
                ) : (
                  <></>
                )}
              </FormControl>
              <FormControl id="latitude" isInvalid={errors.latitude}>
                <FormLabel>Latitude</FormLabel>
                <Input
                  type="text"
                  name="latitude"
                  value={data.latitude}
                  onChange={(e) => setData("latitude", e.target.value)}
                />
                {errors.latitude ? (
                  <FormErrorMessage>{errors.latitude}</FormErrorMessage>
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
