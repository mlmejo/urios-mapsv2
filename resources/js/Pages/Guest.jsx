import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Select } from "chakra-react-select";
import { useEffect, useRef, useState } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import { FaBuilding, FaCamera, FaUtensils } from "react-icons/fa";
import "mapbox-gl/dist/mapbox-gl.css";
import { Head, useForm } from "@inertiajs/react";
import { useReactToPrint } from "react-to-print";

export default function Guest({ establishments }) {
  const { isOpen, onToggle } = useDisclosure();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [viewState, setViewState] = useState({
    longitude: 125.5172,
    latitude: 8.9422,
    zoom: 15.0,
  });

  const markerBorder = (establishment) => {
    switch (establishment.category) {
      case "Restaurant":
        return "orange.500";

      case "Hotel":
        return "blue.500";

      case "Tourist Spot":
        return "green.500";
    }
  };

  const [price, setPrice] = useState(0);

  const { data, setData, post, reset } = useForm({
    establishments: [],
    price: 0,
  });

  useEffect(() => {
    setData("price", price / 150);
  }, [price]);

  const submit = () => {
    post(route("itineraries.store"), { onSuccess: () => reset() });
  };

  return (
    <Box>
      <Head title="Map" />
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Logo
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Button
            as={"a"}
            fontSize={"sm"}
            fontWeight={400}
            variant={"link"}
            href={"#"}
          >
            Sign In
          </Button>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            href={"#"}
            _hover={{
              bg: "pink.300",
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>

      <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={4}>
        <Stack gridColumn={"span 2"} p={4}>
          <Box mb={4}>
            <Select
              placeholder="Search an establishment"
              options={establishments.map((e) => {
                return {
                  label: e.name,
                  value: e.id,
                };
              })}
              onChange={(e) => {
                const establishment = establishments.find(
                  (obj) => obj.id === e.value
                );
                setViewState({
                  ...viewState,
                  longitude: establishment.location.longitude,
                  latitude: establishment.location.latitude,
                });
              }}
            />
          </Box>

          <Map
            {...viewState}
            style={{ height: "75vh" }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken="pk.eyJ1IjoiaWQtYmFsYWJhIiwiYSI6ImNrbGhkejZuZzVlY3AzMXBsdnVvZnZwcmwifQ.8UcxPw97_UxuaLNakAjbdA"
            onMove={(e) => setViewState(e.viewState)}
          >
            <NavigationControl />
            {establishments.map((establishment) => {
              return (
                <div key={establishment.id}>
                  <Marker
                    longitude={parseFloat(establishment.location.longitude)}
                    latitude={parseFloat(establishment.location.latitude)}
                    onClick={() => {
                      if (data.establishments.includes(establishment)) return;
                      setData("establishments", [
                        ...data.establishments,
                        establishment,
                      ]);
                      setPrice(() => price + renderPrice(establishment) * 150);
                    }}
                  >
                    <Text
                      background={markerBorder(establishment)}
                      p="1"
                      rounded="3px"
                      color="white"
                    >
                      {establishment.name}
                    </Text>
                    <Image
                      src={`/${establishment.image.path}`}
                      rounded="full"
                      boxSize="100"
                      border="4px"
                      borderColor={markerBorder(establishment)}
                    />
                  </Marker>
                </div>
              );
            })}
          </Map>
        </Stack>
        <Box padding={6}>
          <Box ref={componentRef}>
            <Heading size="md" mb={4}>
              Travel Itinerary
            </Heading>
            <Text>
              <strong>Estimated Budget Allotment: ₱{price}</strong>
            </Text>
            <Box maxHeight={500} overflow={"auto"}>
              {data.establishments.map((establishment) => {
                return (
                  <Stack
                    key={establishment.id}
                    bg="gray.100"
                    p={6}
                    rounded="md"
                    mb={4}
                  >
                    <Box>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Text>
                          <strong>Establishment</strong>:
                        </Text>
                        <Box
                          _hover={{ border: "2px solid gray", rounded: "md" }}
                        >
                          <FaTimes
                            onClick={() => {
                              setData(
                                "establishments",
                                data.establishments.filter(
                                  (e) => e.id !== establishment.id
                                )
                              );
                              setPrice(
                                () => price - renderPrice(establishment) * 150
                              );
                            }}
                          />
                        </Box>
                      </Flex>
                      {establishment.name}
                    </Box>
                    <Text>
                      <strong>Pricing</strong>: <br />₱
                      {renderPrice(establishment) * 150}
                    </Text>
                  </Stack>
                );
              })}
            </Box>
          </Box>
          <Flex justifyContent="flex-end">
            <Button colorScheme="blue" onClick={handlePrint}>
              Save
            </Button>
          </Flex>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
