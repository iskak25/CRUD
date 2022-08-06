import React from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoList from "../TodoList/TodoList";

const HomePage = () => {
  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default HomePage;
