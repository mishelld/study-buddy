import Navbar from "../components/Navbar";
function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "60px" }}>{children}</div>
    </>
  );
}

export default MainLayout;
