import React from "react";
import { Route, Routes } from "react-router";
import AddTodo from "./commponents/AddTodo/AddTodo";
import EditTodo from "./commponents/EditTodo/EditTodo";
import HomePage from "./commponents/HomePage/HomePage";
import TodoList from "./commponents/TodoList/TodoList";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add" element={<AddTodo />} />
      <Route path="/todos" element={<TodoList />} />
      <Route path="/edit" element={<EditTodo />} />
    </Routes>
  );
};

export default MainRoutes;
