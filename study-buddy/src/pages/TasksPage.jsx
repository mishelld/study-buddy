import Task from "../components/Task";
import { Text, Group, Button } from "@mantine/core";
import AddTask from "../components/AddTask";
import { TaskContext } from "../providers/TaskProvider";
import { useContext, useState } from "react";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

function TasksPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const { tasks, loading, error } = useContext(TaskContext);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage />;

  return (
    <>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>Study Tasks</Text>
        <Button onClick={() => setModalOpen(true)}>+ Add Task</Button>
        <AddTask opened={modalOpen} onClose={() => setModalOpen(false)} />
      </Group>

      {tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        tasks.map((task) => <Task key={task.task_id} task={task} taskId={task.task_id} />)
      )}
    </>
  );
}

export default TasksPage;
