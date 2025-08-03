import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  useGetAllBlogsQuery,
  useUpdateBlogMutation,
} from "../../redux/blogApiSlice";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blogs = [] } = useGetAllBlogsQuery();
  const blogToEdit = blogs.find((b) => b.id === id);
  const [updateBlog] = useUpdateBlogMutation();

  console.log("lado")
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
    content: Yup.string().required("Content is required"),
  });

  const handleSubmit = async (values) => {
    try {
      await updateBlog({ id, updatedData: values }).unwrap();
      alert("Blog updated successfully!");
      navigate("/dashboard/view-blog");
    } catch (error) {
      console.error(error);
      alert("Update failed!");
    }
  };

  if (!blogToEdit)
    return <div className="text-center py-10">Blog not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>
      <Formik
        initialValues={{
          title: blogToEdit.title,
          category: blogToEdit.category,
          tags: blogToEdit.tags,
          content: blogToEdit.content,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-5">
          <div>
            <label className="block font-medium">Title</label>
            <Field name="title" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Category</label>
            <Field
              name="category"
              className="w-full border px-3 py-2 rounded"
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Tags</label>
            <Field name="tags" className="w-full border px-3 py-2 rounded" />
            <ErrorMessage
              name="tags"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <div>
            <label className="block font-medium">Content</label>
            <Field
              as="textarea"
              name="content"
              className="w-full border px-3 py-2 rounded min-h-[120px]"
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Update Blog
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default EditBlog;
