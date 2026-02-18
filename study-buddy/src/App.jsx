import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./providers/AuthProvider";
import { DatesProvider } from "@mantine/dates";

import "./app.css";
function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DatesProvider>
          {" "}
          <AuthProvider onAuthReady={() => {}}>
            <Routes>
              {/* <Route path="/" element={<AddTask />} /> */}

              <Route path="/" element={<LoginPage />} />
              <Route path="/tasks" element={<TasksPage />} />
            </Routes>
          </AuthProvider>
        </DatesProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
