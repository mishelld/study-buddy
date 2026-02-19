import { useContext, useMemo } from "react";
import { Card, Group, Text, Title, Stack, Progress, SimpleGrid } from "@mantine/core";
import { TaskContext } from "../providers/TaskProvider";


function formatTotalStudyTime(totalSeconds) {

    const totalMins = Math.floor(((totalSeconds) || 0) / 60);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;


    const hh = hrs < 10 ? "0" + hrs : "" + hrs
    const mm = mins < 10 ? "0" + mins : "" + mins;


    if (hh > 0) {
        return `${hh}h ${mm}m`;
    }
    return `${mm}m`;
}




export default function OverViewPage() {
    const { tasks, loading, error } = useContext(TaskContext);

    const allTasks = tasks || [];
    const totalStudySeconds = allTasks.reduce(
        (sum, t) => sum + (t.timer_duration || 0),
        0
    );


    return (
        <Stack gap="md">
            <Title order={2}>Progress Overview</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                <Card withBorder radius="md" p="md">
                    <Text c="dimmed" size="sm">Time Studied</Text>
                    <Text fw={700} size="xl">{formatTotalStudyTime(totalStudySeconds)}</Text>
                    <Text c="dimmed" size="xs">Total from task timers</Text>
                </Card>
            </SimpleGrid>
        </Stack>

    )


}