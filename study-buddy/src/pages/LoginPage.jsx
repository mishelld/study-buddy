import { AuthContext } from "../providers/AuthProvider";
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

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useContext(AuthContext);

  return (
    <>
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
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
            color="violet"
            onClick={() => handleLogin(email, password)}
          >
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}
export default LoginPage;
