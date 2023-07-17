import {
  Box,
  CSSReset,
  Container,
  Divider,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ItemListPage from "../Components/ItemListPage";
import CartPage from "../Components/CartPage";
import CartSummaryPage from "../Components/CartSummaryPage";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const toast = useToast();

  const addToCart = (item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);

    if (isItemInCart) {
      toast({
        title: "Product is already in the cart",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setCartItems([...cartItems, { ...item, quantity: 1 }]);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter(
      (cartItem) => cartItem.id !== item.id
    );
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (item, newQuantity) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem.id === item.id
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    setCartItems(updatedCartItems);
  };
  return (
    <>
      <CSSReset />
      <Box p={1}  textAlign="center" fontSize="xl">
        <Flex alignItems={"self-start"} justifyContent={"space-evenly"} >
          <ItemListPage addToCart={addToCart}  />
          <Divider orientation="vertical" size={"lg"} p={2} />
          <CartPage
            cartItems={cartItems}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />
        </Flex>
        <Container maxW="container.lg" mt={8}>
          {cartItems.length !== 0 ? (
            <Heading size="lg" mb={4}>
              Cart Summary
            </Heading>
          ) : (
            ""
          )}

          {cartItems.length !== 0 ? (
            <CartSummaryPage
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
          ) : (
            ""
          )}
        </Container>
      </Box>
    </>
  );
};

export default ShoppingCart;
