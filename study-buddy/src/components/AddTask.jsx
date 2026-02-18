import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { useState } from "react";

function AddTask({ opened, onClose, onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = () => {
    if (!taskName || !priority) return;

    const newTask = {
      name: taskName,
      priority,
      dueDate: dueDate || null,
    };

    if (onAdd) onAdd(newTask);

    setTaskName("");
    setPriority("");
    setDueDate("");
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Task" withinPortal>
      <TextInput
        label="Task Name"
        placeholder="Enter task name"
        value={taskName}
        onChange={(e) => setTaskName(e.currentTarget.value)}
        mb="sm"
        required
      />
      <Select
        label="Priority"
        placeholder="Select priority"
        data={["Low", "Medium", "High"]}
        value={priority}
        onChange={setPriority}
        mb="sm"
        required
      />
      <TextInput
        label="Due Date"
        placeholder="Enter due date (optional)"
        value={dueDate}
        onChange={(e) => setDueDate(e.currentTarget.value)}
        mb="sm"
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Add Task</Button>
      </Group>
    </Modal>
  );
}

export default AddTask;
