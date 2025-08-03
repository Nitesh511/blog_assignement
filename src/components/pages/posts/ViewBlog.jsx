import React from "react";
import {
  useGetAllBlogsQuery,
  useDeletePostsMutation,
} from "../../redux/blogApiSlice";
import { Pencil, Trash2 } from "lucide-react";
import Loader from "../../utils/loader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ViewBlog = () => {
  const { data: blogs, isLoading, isError } = useGetAllBlogsQuery();
  const [deleteBlog] = useDeletePostsMutation();
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the blog!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBlog(id).unwrap();
        Swal.fire("Deleted!", "The blog has been deleted.", "success");
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete the blog.", "error");
      }
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">Something went wrong</div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="p-5">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {blog.title}
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Category:</strong> {blog.category}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Tags:</strong> {blog.tags}
              </p>
              <p className="text-gray-700 mt-3 line-clamp-3">{blog.content}</p>
              <p className="text-xs text-gray-400 mt-3">
                Posted on: {new Date(blog.createdAt).toLocaleDateString()}
              </p>

              <div className="flex justify-end items-center gap-4 mt-4">
                <button
                  onClick={() => navigate(`/dashboard/update-blog/${blog.id}`)}

                  className="text-blue-500 hover:text-blue-700"
                  title="Edit Blog"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Delete Blog"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewBlog;
