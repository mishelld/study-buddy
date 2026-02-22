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
import OverViewPage from "./pages/OverViewPage";
import GifProvider from "./providers/GifProvider";
import HeroPage from "./pages/HeroPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import { useState } from "react";
function App() {
  const [isAuthReady, setAuthReady] = useState(false);

  return (
    <BrowserRouter>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <DatesProvider>
          {" "}
          <AuthProvider onAuthReady={() => setAuthReady(true)}>
            {isAuthReady && (
              <TaskProvider>
                <GifProvider>
                  <Routes>
                    <Route path="/" element={<HeroPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                      path="/tasks"
                      element={
                        <>
                          <ProtectedRoute>
                            <MainLayout>
                              <TasksPage />
                            </MainLayout>
                          </ProtectedRoute>
                        </>
                      }
                    />

                    <Route
                      path="/schedue"
                      element={
                        <>
                          <ProtectedRoute>
                            <MainLayout>
                              <ScheduePage />
                            </MainLayout>
                          </ProtectedRoute>
                        </>
                      }
                    />
                    <Route
                      path="/overview"
                      element={
                        <>
                          <ProtectedRoute>
                            <MainLayout>
                              <OverViewPage />
                            </MainLayout>
                          </ProtectedRoute>
                        </>
                      }
                    />
                  </Routes>
                </GifProvider>
              </TaskProvider>
            )}
          </AuthProvider>
        </DatesProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
