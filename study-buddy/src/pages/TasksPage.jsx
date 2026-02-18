import Task from "../components/Task";
import { Card, Text, Group, Flex, Checkbox, Button } from "@mantine/core";
import { IconAdFilled } from "@tabler/icons-react";
import { AuthContext } from "../providers/AuthProvider";
import { useEffect, useState, useContext } from "react";
import { supabase } from "../data/supabaseClient";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const fetchTasks = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("Tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("due_date", { ascending: true });

    if (error) {
      console.error("Error fetching tasks:", error);
    } else {
      setTasks(data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>Study Tasks</Text>
        <Button>+ Add Task</Button>
      </Group>
      {tasks.length === 0 ? (
        <Text>No tasks found.</Text>
      ) : (
        tasks.map((task) => (
          <Task key={task.task_id} task={task} onTaskUpdated={fetchTasks} />
        ))
      )}
    </>
  );
}

export default TasksPage;
