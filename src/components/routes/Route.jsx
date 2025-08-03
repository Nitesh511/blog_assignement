import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import Loader from "../utils/loader.jsx";
import BlogPage from "../pages/posts/DashCharts.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

const RegisterPage = lazy(() => import("../pages/auth/Register.jsx"));
const LoginPage = lazy(() => import("../pages/auth/Login.jsx"));
const BlogDashboard = lazy(() => import("../pages/posts/Dashboard.jsx"));
const DashCharts = lazy(() => import("../pages/posts/chart.jsx"));
const CreateBlog = lazy(() => import("../pages/posts/Createpost.jsx"));
const ViewBlog = lazy(() => import("../pages/posts/ViewBlog.jsx"));
const EditBlog = lazy(() => import("../pages/posts/EditBlog.jsx"));

function AppRoute() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<BlogPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <BlogDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashCharts />} />

          <Route path="create-blog" element={<CreateBlog />}></Route>
          <Route path="view-blog" element={<ViewBlog />}></Route>
          <Route path="update-blog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRoute;
