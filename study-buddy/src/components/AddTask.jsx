import { Modal, TextInput, Select, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useState, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { supabase } from "../data/supabaseClient";

function AddTask({ opened, onClose, onAdd }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const { user } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!taskName || !priority || !user) return;
    let isoDueDate = null;
    if (dueDate) {
      if (dueDate instanceof Date) {
        isoDueDate = dueDate.toISOString();
      } else {
        isoDueDate = new Date(dueDate).toISOString();
      }
    }

    const newTask = {
      title: taskName,
      priority: [priority],
      due_date: isoDueDate,
      user_id: user.id,
      timer_duration: 0,
    };

    const { data, error } = await supabase.from("Tasks").insert([newTask]);

    if (error) {
      return;
    }
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
        <Button onClick={handleSubmit}>Add Task</Button>
      </Group>
    </Modal>
  );
}

export default AddTask;
