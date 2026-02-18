import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./providers/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider>
        <AuthProvider onAuthReady={() => {}}>
          <Routes>
            <Route path="/" element={<LoginPage />} />

            {/* <Route path="/tasks" element={<TasksPage />} /> */}
          </Routes>
        </AuthProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
