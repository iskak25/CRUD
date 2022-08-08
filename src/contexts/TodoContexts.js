import React, { createContext, useReducer } from "react";
import axios from "axios";

export const todoConrtext = createContext();

const INIT_STATE = {
  todos: [],
  taskToEdit: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    case "EDIT_TODO":
      return {
        ...state,
        taskToEdit: action.payload,
      };
    default:
      return state;
  }
};

const TodoContextsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getTodos = async () => {
    const { data } = await axios("http://localhost:8000/todos");
    dispatch({
      type: "GET_TODOS",
      payload: data,
    });
  };

  const addTask = async (newTask) => {
    if (newTask === "") {
      alert("введите данные");
    }
    await axios.post("http://localhost:8000/todos", newTask);
    getTodos();
  };

  const changeStatus = async (id) => {
    let { data } = await axios.patch(`http://localhost:8000/todos/${id}`);
    await axios.patch(`http://localhost:8000/todos/${id}`, {
      status: !data.status,
    });
    getTodos();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    getTodos();
  };

  const editTodo = async (id) => {
    let { data } = await axios(`http://localhost:8000/todos/${id}`);
    dispatch({
      type: "EDIT_TODO",
      payload: data,
    });
  };

  const saveTask = async (newTask) => {
    await axios.patch(`http://localhost:8000/todos/${newTask.id}`, newTask);
    getTodos();
    console.log("sfd");
  };

  return (
    <todoConrtext.Provider
      value={{
        todos: state.todos,
        taskToEdit: state.taskToEdit,
        addTask,
        getTodos,
        changeStatus,
        deleteTask,
        editTodo,
        saveTask,
      }}
    >
      {children}
    </todoConrtext.Provider>
  );
};

export default TodoContextsProvider;
