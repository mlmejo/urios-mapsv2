import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import PostMenuItem from "./PostMenuItem";

const AdminLinks = [
  {
    label: "Dashboard",
    href: route("dashboard"),
    active: route().current("dashboard"),
  },
  { label: "Map", href: route("map"), active: route().current("map") },
];

const BusinessOwnerLinks = [
  { label: "Map", href: route("map"), active: route().current("map") },
  {
    label: "My Establishments",
    href: route("my-establishments"),
    active: route().current("my-establishments"),
  },
  {
    label: "Inquiries",
    href: route("inquiries.index"),
    active: route().current("inquiries.*"),
  },
];

const RegularUserLinks = [
  { label: "Map", href: route("map"), active: route().current("map") },
  {
    label: "Establishments",
    href: route("establishments.index"),
    active: route().current("establishments.*"),
  },
  {
    label: "Inquiries",
    href: route("inquiries.index"),
    active: route().current("inquiries.*"),
  },
];

const NavLink = ({ href, children, active }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href ?? "#"}
    fontWeight={active ? "bold" : "normal"}
  >
    {children}
  </Link>
);

export default function Navbar({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bg = (role) => {
    switch (role.name) {
      case "admin":
        return useColorModeValue("blue.100", "blue.900");
      case "regular user":
        return useColorModeValue("red.100", "red.900");
      case "business owner":
        return useColorModeValue("orange.100", "orange.900");
      default:
        return useColorModeValue("gray.100", "gray.900");
    }
  };

  return (
    <>
      <Box bg={bg(user.roles[0])} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Logo</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {user.roles.some((role) => role.name === "admin") &&
                AdminLinks.map((link) => {
                  return (
                    <NavLink
                      key={link.label}
                      href={link.href}
                      active={link.active}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              {user.roles.some((role) => role.name === "business owner") &&
                BusinessOwnerLinks.map((link) => {
                  return (
                    <NavLink
                      key={link.label}
                      href={link.href}
                      active={route().current() === link.href}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
              {user.roles.some((role) => role.name === "regular user") &&
                RegularUserLinks.map((link) => {
                  return (
                    <NavLink
                      key={link.label}
                      href={link.href}
                      active={route().current() === link.href}
                    >
                      {link.label}
                    </NavLink>
                  );
                })}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src={`/${user.image.path}`} />
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href={route("profile.edit")}>
                  Profile
                </MenuItem>
                <MenuDivider />
                <PostMenuItem href={route("logout")}>Sign out</PostMenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => {
                if (
                  link.label === "Dashboard" &&
                  !user.roles.some((role) => role.name === "admin")
                )
                  return;
                return (
                  <NavLink key={link.label} href={link.href}>
                    {link.label}
                  </NavLink>
                );
              })}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>{children}</Box>
    </>
  );
}
