import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./providers/AuthProvider";
import AddTask from "./components/AddTask";
import { DatesProvider } from "@mantine/dates";

import "./app.css";
function App() {
  return (
    <BrowserRouter>
      <MantineProvider with GlobalStyles withNormalizeCSS>
        <DatesProvider>
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
