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
    const { data } = await axios(
      "https://crud-react-it2dhh5rt-iskak25.vercel.app/todos"
    );
    dispatch({
      type: "GET_TODOS",
      payload: data,
    });
  };

  const addTask = async (newTask) => {
    await axios.post(
      "https://crud-react-it2dhh5rt-iskak25.vercel.app/todos",
      newTask
    );
    getTodos();
  };

  const changeStatus = async (id) => {
    let { data } = await axios.patch(
      `https://crud-react-it2dhh5rt-iskak25.vercel.app/todos/${id}`
    );
    await axios.patch(
      `https://crud-react-it2dhh5rt-iskak25.vercel.app/todos/${id}`,
      {
        status: !data.status,
      }
    );
    getTodos();
  };

  const deleteTask = async (id) => {
    await axios.delete(
      `https://crud-react-it2dhh5rt-iskak25.vercel.app/todos/${id}`
    );
    getTodos();
  };

  const editTodo = async (id) => {
    let { data } = await axios(
      `https://crud-react-it2dhh5rt-iskak25.vercel.app/todos/${id}`
    );
    dispatch({
      type: "EDIT_TODO",
      payload: data,
    });
  };

  const saveTask = async (newTask) => {
    await axios.patch(
      `https://crud-react-it2dhh5rt-iskak25.vercel.app/todos/${newTask.id}`,
      newTask
    );
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
