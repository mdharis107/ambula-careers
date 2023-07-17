import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";
import ShoppingCart from "./ShoppingCart";
import CartSummaryPage from "../Components/CartSummaryPage";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/todo" element={<TodoList />} />
        <Route path="/shop" element={<ShoppingCart />} />
        <Route path="/shop/cart" element={<CartSummaryPage />} />
        <Route path="/shop/list" element={""} />
      </Routes>
    </>
  );
};

export default MainRoute;
