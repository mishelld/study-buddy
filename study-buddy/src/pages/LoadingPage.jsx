import { Loader } from "@mantine/core";

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader color="blue" size="xl" />{" "}
    </div>
  );
}
export default LoadingPage;
