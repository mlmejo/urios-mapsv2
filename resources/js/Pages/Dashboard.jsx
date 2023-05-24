import Navbar from "@/Components/Navbar";
import {
  Box,
  Button,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import {
  default as CoordinatesForm,
  default as CoordinatesFormModal,
} from "./Partials/CoordinatesFormModal";

export default function Dashboard({ auth, establishments }) {
  const [_establishments, setEstablishments] = useState(establishments);
  const [selectedEstablishment, setSelectedEstablishment] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleChange = (establishment) => {
    axios
      .post(route("establishments.toggle-status", establishment.id))
      .then((response) => setEstablishments(response.data))
      .catch((err) => console.error(err));
  };

  const handleOpen = (establishment) => {
    onOpen();
    setSelectedEstablishment(establishment);
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Dashboard" />

      <Box p={4}>
        <Heading as="h2" size="lg" textAlign="center" mb={8}>
          Establishments
        </Heading>

        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Establishment Name</Th>
                <Th>Proprietor</Th>
                <Th>Address</Th>
                <Th>Coordinates</Th>
                <Th>Approved</Th>
              </Tr>
            </Thead>
            <Tbody>
              {!_establishments.length > 0 ? (
                <Tr>
                  <Td colSpan={5} textAlign="center" fontWeight="bold">
                    No data available.
                  </Td>
                </Tr>
              ) : (
                <></>
              )}
              {_establishments.map((establishment) => {
                return (
                  <Tr key={establishment.id}>
                    <Td fontWeight="medium" textTransform="uppercase">
                      {establishment.name}
                    </Td>
                    <Td>{establishment.user.name}</Td>
                    <Td>{establishment.address}</Td>
                    <Td>
                      <Link
                        as="button"
                        textColor="blue"
                        onClick={() => handleOpen(establishment)}
                      >
                        {establishment.location.longitude ? establishment.location.longitude : 0.0},
                        {establishment.location.latitude ? establishment.location.latitude : 0.0}
                      </Link>
                    </Td>
                    <Td>
                      <Switch
                        onChange={(e) => handleChange(establishment)}
                        defaultChecked={establishment.active}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>

      <CoordinatesFormModal
        isOpen={isOpen}
        onClose={onClose}
        establishment={selectedEstablishment}
      />
    </Navbar>
  );
}
