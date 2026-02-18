import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../data/supabaseClient";
export const TaskContext = createContext();
import { AuthContext } from "./AuthProvider";

function TaskProvider({ children }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
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
      <TaskContext.Provider
        value={{
          error,
          loading,
          tasks,
          fetchTasks,
        }}
      >
        {children}
      </TaskContext.Provider>
    </>
  );
}
export default TaskProvider;
