import { MenuItem } from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";

export default function PostMenuItem({ href, children, data }) {
  const { post } = useForm();

  const handleClick = (e) => {
    e.preventDefault();
    post(href, data);
  };

  return (
    <MenuItem as="a" href={href} onClick={handleClick}>
      {children}
    </MenuItem>
  );
}
