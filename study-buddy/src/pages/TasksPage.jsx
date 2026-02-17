import Task from "../components/Task";
import { Card, Text, Group, Flex, Checkbox, Button } from "@mantine/core";
import { IconAdFilled } from "@tabler/icons-react";

function TasksPage() {
  return (
    <>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>Study Tasks</Text>
        <Button>+ Add Task</Button>
      </Group>
      <Task />
      <Task />
      <Task />
    </>
  );
}

export default TasksPage;
