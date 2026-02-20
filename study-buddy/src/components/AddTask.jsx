import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { TaskContext } from "../providers/TaskProvider";
import TaskForm from "./TaskForm";

function AddTask({ opened, onClose }) {
  const { addTask } = useContext(TaskContext);

  const handleAdd = async (values) => {
    await addTask({
      title: values.taskName,
      priority: values.priority,
      due_date: values.dueDate,
    });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Task" withinPortal>
      <TaskForm
        initialValues={{ taskName: "", priority: "", dueDate: null }}
        onSubmit={handleAdd}
        onCancel={onClose}
        submitText="Add Task"
      />
    </Modal>
  );
}

export default AddTask;
