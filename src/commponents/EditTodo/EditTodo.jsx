import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { todoConrtext } from "../../contexts/TodoContexts";

const EditTodo = () => {
  const { taskToEdit, saveTask } = useContext(todoConrtext);
  const [newEditItem, setNewEditItem] = useState(taskToEdit);

  const navigate = useNavigate();

  function handleEditInput(e) {
    let newTask = {
      ...newEditItem,
      task: e.target.value,
    };
    setNewEditItem(newTask);
  }

  useEffect(() => {
    setNewEditItem(taskToEdit);
  }, [taskToEdit]);

  console.log(newEditItem);

  return (
    <div className="d-flex m-3">
      {newEditItem ? (
        <>
          <Form.Control
            type="text"
            value={newEditItem.task}
            placeholder="add todo"
            className="w-25"
            onChange={handleEditInput}
          />
          <Button
            variant="warning"
            onClick={() => {
              saveTask(newEditItem);
              navigate("/");
            }}
          >
            Save
          </Button>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default EditTodo;
