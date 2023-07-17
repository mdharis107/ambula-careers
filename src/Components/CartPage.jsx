import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  useToast,
  Link,
  Container,
  Image,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const CartPage = ({ cartItems, removeFromCart }) => {
  const toast = useToast();

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
    toast({
      title: "Item removed from cart",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box w={"35%"} p={4}>
      <Heading size="lg" mb={4}>
        Shopping Cart
      </Heading>
      {cartItems.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <>
          {cartItems.map((item) => (
            <Box
              boxShadow="rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
              w={"100%"}
              key={item.id}
              // borderWidth="1px"
              borderRadius="lg"
              p={4}
              mb={4}
              display="flex"
              alignItems="center"
              justifyContent="space-evenly"
            >
              <Container>
                <Image
                  src={item.image}
                  alt={item.name}
                  maxH="120px"
                  // border={"1px solid red"}
                  margin={"auto"}
                  objectFit="cover"
                />
              </Container>
              <Box w={"100%"}>
                <Heading size="md" mb={2}>
                  {item.name}
                </Heading>
                <Text fontSize="lg" mb={2}>
                  Price: ${item.price}
                </Text>
                <Text fontSize="lg" mb={2}>
                  Quantity: {item.quantity}
                </Text>
                <Button
                  onClick={() => handleRemoveFromCart(item)}
                  colorScheme="red"
                  variant="solid"
                  size="sm"
                >
                  Remove
                </Button>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default CartPage;
