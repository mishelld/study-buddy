import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createTheme, MantineProvider } from "@mantine/core";
import TasksPage from "./pages/TasksPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <MantineProvider>
        <TasksPage />
      </MantineProvider>
    </>
  );
}

export default App;
