import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";

import ItemCard from "./ItemCard";

const ItemListPage = ({ addToCart }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch dummy data from an API
    axios
      .get("https://mock-api-template-v1pl.onrender.com/products")
      .then((response) => {
        setItems(response.data);
      });
  }, []);

  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      w={"60%"}
      // border={"1px solid red"}
      p={4}
    >
      <Heading mb={5}>Cart Page</Heading>
      <SimpleGrid columns={3} spacing={4}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} addToCart={addToCart} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ItemListPage;
