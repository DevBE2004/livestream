import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const PublicLayout = () => {
  return (
    <div className="max-h-screen min-h-screen overflow-y-auto overflow-x-hidden">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
