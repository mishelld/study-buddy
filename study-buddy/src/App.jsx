import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/schedule/styles.css";
import MainLayout from "./pages/MainLayout";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import AuthProvider from "./providers/AuthProvider";
import { DatesProvider } from "@mantine/dates";
import "./app.css";
import TaskProvider from "./providers/TaskProvider";
import ScheduePage from "./pages/ScheduePage";
import Navbar from "./components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DatesProvider>
          {" "}
          <AuthProvider onAuthReady={() => {}}>
            <TaskProvider>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route
                  path="/tasks"
                  element={
                    <>
                      <MainLayout>
                        <TasksPage />
                      </MainLayout>
                    </>
                  }
                />

                <Route
                  path="/schedue"
                  element={
                    <>
                      <MainLayout>
                        <ScheduePage />
                      </MainLayout>
                    </>
                  }
                />
              </Routes>
            </TaskProvider>
          </AuthProvider>
        </DatesProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
