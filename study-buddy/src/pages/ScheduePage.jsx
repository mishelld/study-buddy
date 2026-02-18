import { useContext } from "react";
import { MonthView } from "@mantine/schedule";
import { TaskContext } from "../providers/TaskProvider";

function ScheduePage() {
  const { tasks } = useContext(TaskContext);
  const brightColors = ["#FF4D4F", "#FFA940", "#9254DE", "#1890FF", "#52C41A"];

  const events = tasks.map((task) => {
    const start = new Date(task.due_date);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    const color = brightColors[Math.floor(Math.random() * brightColors.length)];

    return {
      id: task.task_id,
      title: task.title,
      start,
      end,
      color,
    };
  });

  return <MonthView date={new Date()} events={events} withWeekDays={false} />;
}

export default ScheduePage;
