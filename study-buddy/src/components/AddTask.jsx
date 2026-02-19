import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { TaskContext } from "../providers/TaskProvider";
function AddTask({ opened, onClose }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const { addTask } = useContext(TaskContext);

  const handleAdd = async () => {
    await addTask({
      title: taskName,
      priority,
      due_date: dueDate,
    });
    setTaskName("");
    setPriority("");
    setDueDate(null);
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
      <DatePickerInput
        label="Due Date"
        placeholder="dd/mm/yyyy"
        value={dueDate}
        onChange={setDueDate}
        mb="sm"
        required
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleAdd} color="black">
          Add Task
        </Button>
      </Group>
    </Modal>
  );
}

export default AddTask;
