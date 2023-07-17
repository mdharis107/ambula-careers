import React from "react";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  useToast,
  Flex,
} from "@chakra-ui/react";

const ItemCard = ({ item, addToCart }) => {
  const { name, price, image } = item;
  const toast = useToast();

  const handleAddToCart = () => {
    addToCart(item);
    toast({
      title: "Item added to cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg"  p={4}>
      <Image
        src={image}
        alt={name}
        maxH="200px"
        // border={"1px solid red"}
        margin={"auto"}
        objectFit="cover"
      />
      <Box mt={4}>
        <Heading size="md" mb={2}>
          {name}
        </Heading>
        <Text fontSize="lg" mb={2}>
          Price: ${price}
        </Text>
        <Flex justifyContent="center">
          <Button onClick={handleAddToCart} colorScheme="teal" variant="solid">
            Add to Cart
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default ItemCard;
