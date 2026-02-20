import { useContext, useMemo } from "react";
import {
  Card,
  Group,
  Text,
  Title,
  Stack,
  Progress,
  SimpleGrid,
  Image,
  Flex,
  ActionIcon,
} from "@mantine/core";
import { TaskContext } from "../providers/TaskProvider";
import { GifContext } from "../providers/GifProvider";
import LoadingPage from "./LoadingPage";

import { IconCircleCheck, IconClock, IconTarget } from "@tabler/icons-react";

function formatTotalStudyTime(totalSeconds) {
  //time studied
  const totalMins = Math.floor((totalSeconds || 0) / 60);
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;

  const hh = hrs < 10 ? "0" + hrs : "" + hrs;
  const mm = mins < 10 ? "0" + mins : "" + mins;

  if (hh > 0) {
    return `${hh}hrs ${mm} mins`;
  }
  return `${mm} mins`;

  //tasks completed
}

export default function OverViewPage() {
  const { tasks } = useContext(TaskContext);
  const { gif, loading } = useContext(GifContext);

  const allTasks = tasks || [];

  const numOfAllTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.completed).length;
  const completedTasksPortion =
    numOfAllTasks === 0 ? 0 : (completedTasks / numOfAllTasks) * 100;

  const totalStudySeconds = allTasks.reduce(
    (sum, t) => sum + (t.timer_duration || 0),
    0,
  );

  function daysUntil(dateStr) {
    const due = new Date(dateStr);
    const now = new Date();

    const diffMs = due - now; // milliseconds difference
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  const upcoming = [...allTasks]
    .filter((t) => t.due_date)
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 3)
    .map((t) => ({
      ...t,
      daysLeft: daysUntil(t.due_date),
    }));

  if (loading) return <LoadingPage />;

  return (
    <Stack gap="md">
      <Title order={2}>Progress Overview</Title>
      <Flex gap="md" direction={{ base: "column-reverse", sm: "row" }}>
        <Flex direction="column" gap="md" style={{ flex: 1 }}>
          <Flex
            justify="center"
            gap="md"
            direction={{ base: "column", sm: "row" }}
          >
            <Card withBorder radius="md" p="md" style={{ flex: 1 }}>
              <Flex align="center" gap="md">
                <ActionIcon variant="filled" color="#c9efffff" size="xl">
                  <IconCircleCheck size={30} color="#1C7ED6" />
                </ActionIcon>
                <Flex direction="column">
                  <Text c="dimmed" size="sm">
                    Tasks Completed
                  </Text>
                  <Text fw={700} size="xl">
                    {completedTasks}/{numOfAllTasks}
                  </Text>
                </Flex>
              </Flex>

              <Progress
                color="rgba(0, 0, 0, 1)"
                value={completedTasksPortion}
                mt="sm"
              />
            </Card>

            <Card withBorder radius="md" p="md" style={{ flex: 1 }}>
              <Flex align="center" gap="md">
                <ActionIcon variant="filled" color="#dafce7ff" size="xl">
                  <IconClock size={30} color="#009d34ff" />
                </ActionIcon>
                <Flex direction="column">
                  <Text c="dimmed" size="sm">
                    Time Studied
                  </Text>
                  <Text fw={700} size="xl">
                    {formatTotalStudyTime(totalStudySeconds)}
                  </Text>
                </Flex>
              </Flex>
              <Text c="dimmed" size="xs">
                Total from task timers
              </Text>
            </Card>
          </Flex>
          <Card withBorder radius="md" p="md" mb="md">
            <Stack gap="md">
              <Flex align="center" gap="md">
                <ActionIcon variant="filled" color="#ece6ffff" size="xl">
                  <IconTarget size={30} bg="#F3F0FF" color="#7048E8" />
                </ActionIcon>
                <Title order={4} mb="sm">
                  Upcoming Deadlines
                </Title>
              </Flex>

              {upcoming.length === 0 ? (
                <Text c="dimmed">No deadlines yet.</Text>
              ) : (
                <Stack gap="sm">
                  {upcoming.map((t) => (
                    <Card key={t.task_id} withBorder radius="md" p="sm">
                      <Group justify="space-between" align="flex-start">
                        <Stack gap={2}>
                          <Text fw={600}>{t.title}</Text>
                          <Text size="sm" c="dimmed">
                            Due: {t.due_date}
                          </Text>
                        </Stack>

                        <Text fw={700} c={t.daysLeft < 0 ? "red" : "dimmed"}>
                          {t.daysLeft} days
                        </Text>
                      </Group>
                    </Card>
                  ))}
                </Stack>
              )}
            </Stack>
          </Card>
        </Flex>
        <Card shadow="sm" padding="lg" style={{ flex: 1 }}>
          {gif && !loading && (
            <Image
              src={gif.images.fixed_height.url}
              alt={gif.title}
              radius="sm"
              mb="sm"
            />
          )}
        </Card>
      </Flex>
    </Stack>
  );
}
