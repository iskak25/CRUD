import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { todoConrtext } from "../../contexts/TodoContexts";

const AddTodo = () => {
  const [inpValue, setInterval] = useState("");

  const { addTask } = useContext(todoConrtext);

  function haldleClick() {
    let newObj = {
      task: inpValue,
      status: false,
    };
    addTask(newObj);
    setInterval("");
  }
  return (
    <div className="d-flex m-3">
      <Form.Control
        type="text"
        placeholder="add todo"
        className="w-25"
        value={inpValue}
        onChange={(e) => setInterval(e.target.value)}
      />
      <Button onClick={haldleClick} variant="warning">
        Add
      </Button>
    </div>
  );
};

export default AddTodo;
