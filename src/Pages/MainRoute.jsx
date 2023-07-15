import React from "react";
import { Route, Routes } from "react-router-dom";
import TodoList from "./TodoList";

const MainRoute = () => {
  return (
    <>
      <Routes>
        <Route path="/todo" element={<TodoList />} />
        <Route path="" element={""} />
        <Route path="" element={""} />
      </Routes>
    </>
  );
};

export default MainRoute;
