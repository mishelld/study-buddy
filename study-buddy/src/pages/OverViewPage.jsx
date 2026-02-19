import { useContext, useMemo } from "react";
import { Card, Group, Text, Title, Stack, Progress, SimpleGrid } from "@mantine/core";
import { TaskContext } from "../providers/TaskProvider";


function formatTotalStudyTime(totalSeconds) {

    //time studied
    const totalMins = Math.floor(((totalSeconds) || 0) / 60);
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;


    const hh = hrs < 10 ? "0" + hrs : "" + hrs
    const mm = mins < 10 ? "0" + mins : "" + mins;


    if (hh > 0) {
        return `${hh}hrs ${mm} mins`;
    }
    return `${mm} mins`;

    //tasks completed

}




export default function OverViewPage() {
    const { tasks, loading, error } = useContext(TaskContext);

    const allTasks = tasks || [];

    const numOfAllTasks = allTasks.length
    const completedTasks = allTasks.filter((t) => t.completed).length;
    const completedTasksPortion = numOfAllTasks === 0 ? 0 : (completedTasks / numOfAllTasks) * 100;



    const totalStudySeconds = allTasks.reduce(
        (sum, t) => sum + (t.timer_duration || 0),
        0
    );

    function daysUntil(dateStr) {
        const due = new Date(dateStr);
        const now = new Date();

        const diffMs = due - now; // milliseconds difference
        return Math.ceil(diffMs / (1000 * 60 * 60 * 24));

    }

    const upcoming = [...allTasks]
        .filter(t => t.due_date)
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        .slice(0, 3)
        .map((t) => (
            {
                ...t,
                daysLeft: daysUntil(t.due_date)
            }
        ))

    return (
        <Stack gap="md">
            <Title order={2}>Progress Overview</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">

                <Card withBorder radius="md" p="md">
                    <Text c="dimmed" size="sm">Tasks Completed</Text>
                    <Text fw={700} size="xl">{completedTasks}/{numOfAllTasks}</Text>
                    <Progress value={completedTasksPortion} mt="sm" />
                </Card>

                <Card withBorder radius="md" p="md">
                    <Text c="dimmed" size="sm">Time Studied</Text>
                    <Text fw={700} size="xl">{formatTotalStudyTime(totalStudySeconds)}</Text>
                    <Text c="dimmed" size="xs">Total from task timers</Text>
                </Card>

                <Card withBorder radius="md" p="md">
                    <Title order={4} mb="sm">Upcoming Deadlines</Title>

                </Card>
            </SimpleGrid>
        </Stack>

    )


}