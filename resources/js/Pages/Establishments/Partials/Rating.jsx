import { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton } from "@chakra-ui/react";

export default function Rating({ rating, setRating }) {
  const handleClick = (num) => {
    if (rating === num) {
      setRating(1);
    } else {
      setRating(num);
    }
  };

  return (
    <HStack spacing={2}>
      {[1, 2, 3, 4, 5].map((num) => (
        <IconButton
          key={num}
          aria-label={`Rate ${num} star${num === 1 ? "" : "s"}`}
          icon={<StarIcon color={num <= rating ? "yellow.400" : "gray.300"} />}
          onClick={() => handleClick(num)}
        />
      ))}
    </HStack>
  );
}
