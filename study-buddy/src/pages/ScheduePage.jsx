import { useContext } from "react";
import { MonthView } from "@mantine/schedule";
import { TaskContext } from "../providers/TaskProvider";

function ScheduePage() {
  const { tasks } = useContext(TaskContext);

  const events = tasks.map((task) => {
    const start = new Date(task.due_date);
    const end = start;

    return {
      id: task.task_id,
      title: task.title,
      start,
      end,
      color: task.color,
    };
  });

  return <MonthView date={new Date()} events={events} withWeekDays={false} />;
}

export default ScheduePage;
