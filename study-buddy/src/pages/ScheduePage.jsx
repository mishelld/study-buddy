import { useContext, useState } from "react";
import { MonthView, MobileMonthView } from "@mantine/schedule";
import { TaskContext } from "../providers/TaskProvider";
import { useMediaQuery } from "@mantine/hooks";
import { Box } from "@mantine/core";
import dayjs from "dayjs";

function ScheduePage() {
  const { tasks } = useContext(TaskContext);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD"),
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  const desktopEvents = tasks.map((task) => {
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
  const mobileEvents = tasks.map((task) => ({
    id: task.task_id,
    title: task.title,
    start: dayjs(task.due_date).format("YYYY-MM-DD"),
    end: dayjs(task.due_date).format("YYYY-MM-DD"),
    color: task.color,
  }));

  return (
    <Box 
    style={{ width: "100%", height: 500 }}>
      {isMobile ? (
        <MobileMonthView
          date={date}
          onDateChange={setDate}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          events={mobileEvents}
          withOutsideDays
        />
      ) : (
        <MonthView
          date={new Date()}
          events={desktopEvents}
          withWeekDays={false}
        />
      )}
    </Box>
  );
}

export default ScheduePage;
