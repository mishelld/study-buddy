import { Link } from "react-router-dom";
import { AuthContext } from "../providers/auth/AuthProvider";
import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import classes from "./AuthenticationTitle.module.css";
import { useState, useContext } from "react";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin, error, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <Container size={420} my={40}>
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>
          <Text className={classes.subtitle}>
            Do not have an account yet?{" "}
            <Anchor component={Link} to="/Tweeter-2.0-Project/signup">
              Create account
            </Anchor>
          </Text>
          <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              radius="md"
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              mt="md"
              radius="md"
            />
            <Button
              fullWidth
              mt="xl"
              radius="md"
              onClick={() => handleLogin(email, password)}
            >
              Sign in
            </Button>
          </Paper>
          {error && <ErrorPage message={error} />}
        </Container>
      )}
    </>
  );
}
export default LoginPage;
