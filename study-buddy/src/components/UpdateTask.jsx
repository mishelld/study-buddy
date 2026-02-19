import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useContext, useEffect } from "react";
import { TaskContext } from "../providers/TaskProvider";

function UpdateTask({ opened, onClose, task }) {
  const [taskName, setTaskName] = useState(task.title);
  const [priority, setPriority] = useState(task.priority[0]);
  const [dueDate, setDueDate] = useState(task.due_date);
  const { updateTask } = useContext(TaskContext);

  const handleUpdate = async () => {
    await updateTask(task.task_id, {
      title: taskName,
      priority,
      due_date: dueDate,
    });
    onClose();
  };
  useEffect(() => {
    if (task) {
      setTaskName(task.title || "");
      setPriority(task.priority?.[0] || "");
      setDueDate(task.due_date || null);
    }
  }, [task, opened]);

  return (
    <Modal opened={opened} onClose={onClose} title="Update Task" withinPortal>
      <TextInput
        label="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.currentTarget.value)}
        mb="sm"
        required
      />
      <Select
        label="Priority"
        placeholder={priority}
        data={["Low", "Medium", "High"]}
        value={priority}
        onChange={setPriority}
        mb="sm"
        required
      />
      <DatePickerInput
        label="Due Date"
        value={dueDate}
        onChange={setDueDate}
        mb="sm"
        required
      />
      <Group position="right" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="black">
          Update Task
        </Button>
      </Group>
    </Modal>
  );
}

export default UpdateTask;
