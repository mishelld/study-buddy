import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../data/supabaseClient";
export const TaskContext = createContext();
import { AuthContext } from "./AuthProvider";

function TaskProvider({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);
  const brightColors = [
    "#FF4D4F",
    "#FFA940",
    "#9254DE",
    "#1890FF",
    "#52C41A",
    "#13C2C2",
    "#FA541C",
    "#2F54EB",
    "#EB2F96",
    "#FAAD14",
    "#722ED1",
    "#36CFC9",
  ];

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error: supabaseError } = await supabase
        .from("Tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("due_date", { ascending: true });

      if (supabaseError) {
        setError(supabaseError.message);
      } else {
        const tasksWithColors = data.map((task) => ({
          ...task,
          color:
            task.color ||
            brightColors[Math.floor(Math.random() * brightColors.length)],
        }));
        setTasks(tasksWithColors);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId, currentValue) => {
    setError(null);

    const newStatus = !currentValue;

    setTasks((prev) =>
      prev.map((task) =>
        task.task_id === taskId ? { ...task, completed: newStatus } : task,
      ),
    );

    try {
      const { error: supabaseError } = await supabase
        .from("Tasks")
        .update({ completed: newStatus })
        .eq("task_id", taskId);

      if (supabaseError) {
        setError(supabaseError.message);
      }
    } catch (err) {
      setTasks((prev) =>
        prev.map((task) =>
          task.task_id === taskId ? { ...task, completed: currentValue } : task,
        ),
      );
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async ({ title, priority, due_date }) => {
    if (!user) return;

    setError(null);

    const newTask = {
      title,
      priority: [priority],
      due_date,
      user_id: user.id,
      timer_duration: 0,
      completed: false,
      color: brightColors[Math.floor(Math.random() * brightColors.length)],
    };

    setTasks((prev) => [...prev, newTask]);

    try {
      const { data, error: supabaseError } = await supabase
        .from("Tasks")
        .insert([newTask])
        .select();

      if (supabaseError) {
        setTasks((prev) => prev.filter((task) => task !== newTask));
        setError(supabaseError.message);
        return;
      }
      setTasks((prev) =>
        prev.map((task) => (task === newTask ? data[0] : task)),
      );
    } catch (err) {
      setTasks((prev) => prev.filter((task) => task !== newTask));
      setError(err.message);
    }
  };
  const deleteTask = async (taskId) => {
    if (!user) return;

    setError(null);

    const removedTask = tasks.find((task) => task.task_id === taskId);
    setTasks((prev) => prev.filter((task) => task.task_id !== taskId));

    try {
      const { error: supabaseError } = await supabase
        .from("Tasks")
        .delete()
        .eq("task_id", taskId);

      if (supabaseError) {
        setTasks((prev) => [...prev, removedTask]);
        setError(supabaseError.message);
      }
    } catch (err) {
      setTasks((prev) => [...prev, removedTask]);
      setError(err.message);
    }
  };

  const updateTask = async (taskId, { title, priority, due_date }) => {
    setError(null);

    const originalTask = tasks.find((t) => t.task_id === taskId);

    setTasks((prev) =>
      prev.map((t) =>
        t.task_id === taskId
          ? { ...t, title, priority: [priority], due_date }
          : t,
      ),
    );

    try {
      const { error: supabaseError } = await supabase
        .from("Tasks")
        .update({ title, priority: [priority], due_date })
        .eq("task_id", taskId);

      if (supabaseError) {
        setTasks((prev) =>
          prev.map((t) => (t.task_id === taskId ? originalTask : t)),
        );
        setError(supabaseError.message);
      }
    } catch (err) {
      setTasks((prev) =>
        prev.map((t) => (t.task_id === taskId ? originalTask : t)),
      );
      setError(err.message);
    }
  };

  const addStudyTime = async (taskId, secondsToAdd) => {
    if (!user) return;
    if (!secondsToAdd || secondsToAdd <= 0) return;

    setTasks((prev) =>
      prev.map((t) =>
        t.task_id === taskId
          ? { ...t, timer_duration: (t.timer_duration || 0) + secondsToAdd }
          : t,
      ),
    );

    try {
      const { data, error: readErr } = await supabase
        .from("Tasks")
        .select("timer_duration")
        .eq("task_id", taskId)
        .single();

      if (readErr) {
        setError(readErr.message);
        return;
      }

      const current = data?.timer_duration || 0;
      const newValue = current + secondsToAdd;

      const { error: updateErr } = await supabase
        .from("Tasks")
        .update({ timer_duration: newValue })
        .eq("task_id", taskId);

      if (updateErr) setError(updateErr.message);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  return (
    <>
      <TaskContext.Provider
        value={{
          error,
          loading,
          tasks,
          fetchTasks,
          toggleTaskCompletion,
          addTask,
          deleteTask,
          updateTask,
          addStudyTime,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
}
export default TaskProvider;
