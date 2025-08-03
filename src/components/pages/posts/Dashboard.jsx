import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaPlusCircle, FaRegEye } from "react-icons/fa";
import ProceedToApi from "../../hooks/useAuth";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = ProceedToApi();

  const handleLogout = async () => {
    const message = await logout();
    console.log(message);
    navigate("/");
  };

  const handleHome = () => {
    navigate("/admin-dash");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-gray-100 relative">
      {/* Mobile top bar */}
      <div className="md:hidden w-full flex items-center justify-between bg-white p-4 shadow-lg fixed top-0 z-50 border-b border-gray-200">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Admin Panel
        </h1>
        <button
          className="text-2xl text-gray-700 hover:text-blue-600 transition-colors duration-200"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <span className="text-3xl font-bold">&times;</span>
          ) : (
            <span className="text-3xl font-bold">&#9776;</span>
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white shadow-2xl w-72 p-6 md:block fixed md:static z-40 top-0 left-0 h-screen transition-all duration-300 overflow-y-auto border-r border-gray-200 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-center items-center p-0 mb-8 cursor-pointer" onClick={handleHome}>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>

        <nav className="space-y-4">
          <Link to="create-blog">
            <button className="flex items-center w-full px-5 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg transition duration-300 mb-5">
              <FaPlusCircle className="mr-3 text-lg" />
              Add Blog
            </button>
          </Link>

          <Link to="view-blog">
            <button className="flex items-center w-full px-5 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition duration-300">
              <FaRegEye className="mr-3 text-lg" />
              View Blog
            </button>
          </Link>

          <button
            className="flex items-center w-full px-5 py-4 mt-5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold shadow-lg transition duration-300 "
            onClick={handleLogout}
          >
            <IoIosLogOut className="mr-3 text-lg" />
            Log Out
          </button>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 p-6 md:mt-0 mt-16">
        <div className="bg-white rounded-2xl shadow-lg min-h-full p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
