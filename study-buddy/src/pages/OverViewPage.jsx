import { useContext, useMemo } from "react";
import { Card, Group, Text, Title, Stack, Progress, SimpleGrid } from "@mantine/core";
import { TaskContext } from "../providers/TaskProvider";


function formatTotalStudyTime(totalSeconds) {

    const mins = Math.floor((totalSeconds) || 0 / 60);
    const hr = Math.floor(mins / 60);
    const sec = mins % 60

    const hh = hr < 10 ? "0" + hr : "" + hr
    const mm = mins < 10 ? "0" + mins : "" + mins;
    const ss = sec < 10 ? "0" + sec : "" + sec;

    return h > 0 ? `${hh}h ${mm}m` : `${ss} sec`;
}


export default function OverViewPage() {
    const { tasks, loading, error } = useContext(TaskContext);

    return (
        <Stack gap="md">
            <Title order={2}>Progress Overview</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Card withBorder radius="md" p="md">
                    <Text c="dimmed" size="sm">
                        Time Studied
                    </Text>
                    <Text fw={700} size="xl">
                        {formatTotalStudyTime(data.totalStudySeconds)}
                    </Text>
                    <Text c="dimmed" size="xs">
                        Total from task timers
                    </Text>
                </Card>
            </SimpleGrid>
        </Stack>

    )


}