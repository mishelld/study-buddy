import { Card, Text, Group, Flex, Checkbox } from "@mantine/core";
import { IconTrash, IconEdit, IconClock } from "@tabler/icons-react";
import { ActionIcon } from "@mantine/core";

function Task() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex gap="md">
        <Group justify="space-between" mt="md" mb="xs">
          <Checkbox defaultChecked />
        </Group>
        <Group justify="space-between" mt="md" mb="xs">
          <Flex direction="column">
            <Text fw={500}>Complete calculus homework</Text>
            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>date</Text>
              <Text fw={500}>priority</Text>
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
          <ActionIcon variant="subtle">
            <IconClock size={18} />
          </ActionIcon>
        </Group>
      </Flex>
    </Card>
  );
}

export default Task;
