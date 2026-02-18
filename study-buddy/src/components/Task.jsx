import { Card, Text, Group, Flex, Checkbox } from "@mantine/core";
import { IconTrash, IconEdit, IconClock } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import Timer from "./Timer/Timer";
import { useState } from "react";
import { supabase } from "../data/supabaseClient";

function Task({ key, task, onTaskUpdated }) {
  const [showTimer, setShowTimer] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const handleToggle = async () => {
    const newStatus = !completed;
    setCompleted(newStatus);

    const { error } = await supabase
      .from("Tasks")
      .update({ completed: newStatus })
      .eq("task_id", task.task_id);

    if (error) {
      console.error("Error updating task:", error);
      setCompleted(!newStatus);
    } else {
      if (onTaskUpdated) onTaskUpdated();
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex gap="md">
        <Group justify="space-between" mt="md" mb="xs">
          <Checkbox checked={completed} onChange={handleToggle} />
        </Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Flex direction="column">
            <Text fw={500}>{task.title}</Text>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{task.due_date}</Text>
              <Text fw={500}>{task.priority}</Text>
            </Group>
          </Flex>
        </Group>
        <Group justify="flex-end" mt="md" mb="xs">
          <ActionIcon variant="subtle">
            <IconEdit size={18} />
          </ActionIcon>
          <ActionIcon variant="subtle">
            <IconTrash size={18} />
          </ActionIcon>
          {/* <ActionIcon variant="subtle">
            <IconClock size={18} />
          </ActionIcon> */}
          <ActionIcon
            variant="subtle"
            onClick={() => setShowTimer((prev) => !prev)}
          >
            <IconClock size={18} />
          </ActionIcon>
        </Group>
      </Flex>
      {showTimer && <Timer />}
    </Card>
  );
}

export default Task;
