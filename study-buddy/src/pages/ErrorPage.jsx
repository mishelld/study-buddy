import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

function ErrorPage({ message }) {
  const icon = <IconInfoCircle />;
  return (
    <Alert variant="light" color="red" title="Error" icon={icon}>
      {message}
    </Alert>
  );
}
export default ErrorPage;
