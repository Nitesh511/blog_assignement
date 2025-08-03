import React, { useEffect, useRef, useCallback, useState } from "react";
import { FaThumbsUp, FaRegComment } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../../redux/blogApiSlice";
import Loader from "../../utils/loader";

const BlogPage = () => {
  const { data: allBlogs = [], isLoading, isError } = useGetAllBlogsQuery();
  const [visibleBlogs, setVisibleBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef();

  const blogsPerPage = 6;

  const loadMore = useCallback(() => {
    const nextBlogs = allBlogs.slice(
      page * blogsPerPage,
      (page + 1) * blogsPerPage
    );
    setVisibleBlogs((prev) => [...prev, ...nextBlogs]);
    setPage((prev) => prev + 1);
  }, [page, allBlogs]);

  useEffect(() => {
    if (page === 1 && allBlogs.length > 0) {
      setVisibleBlogs(allBlogs.slice(0, blogsPerPage));
    }
  }, [allBlogs]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore]);

  const [likes, setLikes] = useState({});
  const [comments, setComments] = useState({});

  const handleLike = (id) => {
    setLikes((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleAddComment = (id, comment) => {
    if (!comment.trim()) return;
    setComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), comment],
    }));
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center p-10 text-red-500">Failed to fetch blogs</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white pb-20">
      {/* Top Bar */}
      <header className="bg-white shadow sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">📝 My Blog</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 text-sm"
          >
            Register
          </Link>
        </div>
      </header>

      {/* Blog Posts */}
      <main className="max-w-4xl mx-auto mt-10 px-4">
        <div className="grid grid-cols-1 gap-8">
          {visibleBlogs.map((post) => (
            <div
              key={post.id}
              className="bg-white border rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300 relative"
            >
              {/* Tags and Date at top-right */}
              <div className="absolute right-6 top-6 text-right">
                <div className="text-sm font-medium text-indigo-600">
                  {post.tags}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(post.createdAt).toLocaleString("en-GB", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>

              {/* Blog content left */}
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {post.title}
              </h2>
              <h4 className="text-md font-medium text-gray-600 mb-3">
                Category: {post.category}
              </h4>
              <p className="text-gray-600 mb-4 line-clamp-4">{post.content}</p>

              <div className="flex items-center gap-6 text-sm mb-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
                >
                  <FaThumbsUp /> {likes[post.id] || 0} Like
                  {(likes[post.id] || 0) !== 1 ? "s" : ""}
                </button>
                <div className="flex items-center gap-1 text-gray-500">
                  <FaRegComment /> {(comments[post.id] || []).length} Comment
                  {(comments[post.id] || []).length !== 1 ? "s" : ""}
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const comment = e.target.comment.value;
                  handleAddComment(post.id, comment);
                  e.target.reset();
                }}
                className="flex items-center gap-2"
              >
                <input
                  name="comment"
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <button
                  type="submit"
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 text-sm"
                >
                  Post
                </button>
              </form>

              <ul className="mt-3 space-y-1 text-sm text-gray-700">
                {(comments[post.id] || []).map((comment, i) => (
                  <li key={i} className="pl-3 border-l-2 border-indigo-300">
                    • {comment}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div ref={loaderRef} className="h-20" />
      </main>
    </div>
  );
};

export default BlogPage;
