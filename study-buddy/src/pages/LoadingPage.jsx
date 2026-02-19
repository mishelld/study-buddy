import { Loader } from "@mantine/core";

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Loader color="rgb(194, 163, 255)" size="xl" />{" "}
    </div>
  );
}
export default LoadingPage;
