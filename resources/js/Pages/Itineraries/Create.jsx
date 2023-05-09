import Navbar from "@/Components/Navbar";
import {
  Button,
  Container,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
} from "@chakra-ui/react";
import { Head, useForm } from "@inertiajs/react";
import { Select } from "chakra-react-select";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function Create({ auth, establishments }) {
  const { data, setData, post } = useForm({
    establishments: [],
  });

  const [pickedEstablishments, setPickedEstablishments] = useState([]);

  useEffect(() => {
    setData(
      "establishments",
      pickedEstablishments.map((e) => e.value)
    );
  }, [pickedEstablishments]);

  const submit = () => {
    console.log(data);
    post(route("itineraries.store"));
  };

  return (
    <Navbar user={auth.user}>
      <Head title="Create Itirenary" />
      <Container>
        <Stack boxShadow={"md"} p={6} spacing={4} rounded={"md"}>
          <Heading as="h2" size="md">
            Create Itirenary
          </Heading>
          <UnorderedList listStyleType={"none"}>
            {pickedEstablishments.map((e) => {
              return (
                <ListItem key={e.value}>
                  <Button
                    onClick={() => {
                      setPickedEstablishments([
                        ...pickedEstablishments.filter(
                          (pe) => pe.value !== e.value
                        ),
                      ]);
                    }}
                    colorScheme="blue"
                    justifyContent={"space-between"}
                    w="100%"
                  >
                    {e.label}
                    <FiX />
                  </Button>
                </ListItem>
              );
            })}
          </UnorderedList>
          <Select
            options={establishments.map((establishment) => ({
              label: establishment.name,
              value: establishment.id,
            }))}
            onChange={(e) => {
              setPickedEstablishments([
                ...pickedEstablishments.filter((pe) => pe.value !== e.value),
                e,
              ]);
            }}
          />

          <Button colorScheme={"blue"} onClick={submit}>
            Submit
          </Button>
        </Stack>
      </Container>
    </Navbar>
  );
}
