import { Card, Text, Group, Flex, Checkbox } from "@mantine/core";
import { IconTrash, IconEdit, IconClock } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";
import Timer from "./Timer/Timer";
import { supabase } from "../data/supabaseClient";
import { TaskContext } from "../providers/TaskProvider";
import { useContext, useState } from "react";
import UpdateTask from "./UpdateTask";
function Task({ key, task }) {
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const { toggleTaskCompletion, deleteTask, error } = useContext(TaskContext);
  if (error) return <ErrorPage />;

  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="md">
            <Checkbox
              checked={task.completed}
              onChange={() =>
                toggleTaskCompletion(task.task_id, task.completed)
              }
            />
            <Flex direction="column" gap="xs">
              <Text fw={500}>{task.title}</Text>
              <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{task.due_date}</Text>
                <Text fw={500}>{task.priority}</Text>
                <Text size="sm" c="dimmed">
                  Studied: {Math.floor((task.timer_duration / 60 || 0))} min
                </Text>

              </Group>
            </Flex>
          </Flex>
          <Group spacing="xs">
            <ActionIcon variant="subtle" onClick={() => setUpdateOpen(true)}>
              <IconEdit size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              onClick={() => deleteTask(task.task_id)}
            >
              <IconTrash size={18} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              onClick={() => setShowTimer((prev) => !prev)}
            >
              <IconClock size={18} />
            </ActionIcon>
          </Group>
        </Flex>
        {showTimer && <Timer taskId={task.task_id} />}
      </Card>
      <UpdateTask
        opened={updateOpen}
        onClose={() => setUpdateOpen(false)}
        task={task}
      />
    </>
  );
}

export default Task;
