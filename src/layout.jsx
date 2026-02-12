import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sticky Header */}
      <Header />

      {/* Scrollable Content */}
      <main className="flex-1 ">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}


