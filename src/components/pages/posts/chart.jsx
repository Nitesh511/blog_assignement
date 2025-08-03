// src/pages/Dashboard.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaBlog, FaThumbsUp, FaComment } from "react-icons/fa";

const data = [
  { month: "Jan", posts: 12, likes: 34, comments: 10 },
  { month: "Feb", posts: 18, likes: 45, comments: 12 },
  { month: "Mar", posts: 25, likes: 60, comments: 20 },
  { month: "Apr", posts: 22, likes: 50, comments: 18 },
  { month: "May", posts: 30, likes: 80, comments: 24 },
  { month: "Jun", posts: 28, likes: 70, comments: 22 },
];

const DashChart = () => {
  const totalPosts = data.reduce((sum, item) => sum + item.posts, 0);
  const totalLikes = data.reduce((sum, item) => sum + item.likes, 0);
  const totalComments = data.reduce((sum, item) => sum + item.comments, 0);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <FaBlog className="text-indigo-600 text-3xl" />
          <div>
            <p className="text-lg font-semibold">Total Posts</p>
            <p className="text-xl font-bold">{totalPosts}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <FaThumbsUp className="text-green-600 text-3xl" />
          <div>
            <p className="text-lg font-semibold">Total Likes</p>
            <p className="text-xl font-bold">{totalLikes}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <FaComment className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-lg font-semibold">Total Comments</p>
            <p className="text-xl font-bold">{totalComments}</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-semibold mb-4">Monthly Activity</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="posts" stroke="#6366f1" />
            <Line type="monotone" dataKey="likes" stroke="#10b981" />
            <Line type="monotone" dataKey="comments" stroke="#facc15" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashChart;
