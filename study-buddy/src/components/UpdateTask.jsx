import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../providers/TaskProvider";
import TaskForm from "./TaskForm";

function UpdateTask({ opened, onClose, task }) {
  const { updateTask } = useContext(TaskContext);

  const handleUpdate = async (values) => {
    await updateTask(task.task_id, {
      title: values.taskName,
      priority: values.priority,
      due_date: values.dueDate,
    });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Update Task" withinPortal>
      <TaskForm
        initialValues={{
          taskName: task?.title || "",
          priority: task?.priority?.[0] || "",
          dueDate: task?.due_date || null,
        }}
        onSubmit={handleUpdate}
        onCancel={onClose}
        submitText="Update Task"
      />
    </Modal>
  );
}

export default UpdateTask;
