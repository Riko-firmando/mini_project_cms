import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ToastContainer from "../UI/ToastContainer";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[#F6FAF9]">
      <Sidebar />
      <main className="lg:ml-64">
        <Navbar />
        <div className="max-w-7xl mx-auto p-5">
          <ToastContainer />
          <Outlet />
        </div>
      </main>
    </div>
  );
}
