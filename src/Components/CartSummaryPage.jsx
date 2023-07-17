// CartSummaryPage.js
import React from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Divider,
  Button,
  useToast,
  Image,
  Badge,
} from "@chakra-ui/react";

const CartSummaryPage = ({ cartItems, removeFromCart }) => {
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
    <Box p={4} border={"2px solid gray"} mb={5}>
      {cartItems.length === 0 ? (
        <Text>No items in the cart</Text>
      ) : (
        <>
          <SimpleGrid columns={3} spacing={4}>
            {cartItems.map((item) => (
              <Box
                key={item.id}
                borderWidth="1px"
                borderRadius="lg"
                p={4}
                mb={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box flex="1">
                  <Image
                    src={item.image}
                    alt={item.name}
                    maxH="200px"
                    // border={"1px solid red"}
                    margin={"auto"}
                    objectFit="cover"
                  />
                  <Heading size="md" mb={2}>
                    {item.name}
                  </Heading>
                  <Text fontSize="lg" mb={2}>
                    Price: ${item.price}
                  </Text>
                  <Text fontSize="lg" mb={2}>
                    Quantity: {item.quantity}
                  </Text>
                  {/* <Button
                    onClick={() => handleRemoveFromCart(item)}
                    colorScheme="red"
                    variant="solid"
                    size="sm"
                  >
                    Remove
                  </Button> */}
                </Box>
              </Box>
            ))}
          </SimpleGrid>
          <Divider my={4} />
          <Box display="flex" justifyContent="flex-end">
            <Badge borderRadius={5} p={1} colorScheme="red" fontSize="lg">
              Subtotal: <strong>${subtotal.toFixed(2)}</strong>
            </Badge>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartSummaryPage;
