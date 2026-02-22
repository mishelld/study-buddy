import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

function ErrorPage({ message }) {
  const icon = <IconInfoCircle />;
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Alert variant="light" color="red" title="Error" icon={icon}>
        {message}
      </Alert>
    </div>
  );
}
export default ErrorPage;
