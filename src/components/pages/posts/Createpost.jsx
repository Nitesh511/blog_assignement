import React from "react";
import {
  PlusCircle,
  Tag,
  Book,
  List,
  Bold,
  Italic,
  Underline,
  Link,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ProceedToApiPosts from "../../hooks/usePosts";
import { setBlogState, selectBlogState } from "../../redux/blogSlice";

const AddBlog = () => {
  const initialValues = useSelector(selectBlogState);
  const dispatch = useDispatch();
  const { addBlog } = ProceedToApiPosts();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("At least one tag is required"),
    content: Yup.string().required("Content is required"),
  });

  const applyFormatting = (format, values, setFieldValue) => {
    const textarea = document.getElementById("content-editor");
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = values.content.substring(start, end);

    if (selectedText) {
      let formattedText = selectedText;
      switch (format) {
        case "bold":
          formattedText = `**${selectedText}**`;
          break;
        case "italic":
          formattedText = `*${selectedText}*`;
          break;
        case "underline":
          formattedText = `<u>${selectedText}</u>`;
          break;
        case "link": {
          const url = prompt("Enter URL:");
          if (url) {
            formattedText = `[${selectedText}](${url})`;
          }
          break;
        }
        default:
          break;
      }

      const newContent =
        values.content.substring(0, start) +
        formattedText +
        values.content.substring(end);
      setFieldValue("content", newContent);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        ...values,
        createdAt: new Date().toISOString(),
      };
      await addBlog(payload);
      dispatch(setBlogState(values));
      resetForm();
      alert("Blog added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-800">
        <PlusCircle className="text-indigo-600" size={32} />
        Add New Blog
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2 text-gray-700">
                <Book size={18} className="text-indigo-600" />
                Title
              </label>
              <Field
                type="text"
                name="title"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter blog title"
              />
              <ErrorMessage name="title" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2 text-gray-700">
                <List size={18} className="text-indigo-600" />
                Category
              </label>
              <Field
                type="text"
                name="category"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. Technology, Lifestyle, Travel"
              />
              <ErrorMessage name="category" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block font-semibold mb-2 flex items-center gap-2 text-gray-700">
                <Tag size={18} className="text-indigo-600" />
                Tags
              </label>
              <Field
                type="text"
                name="tags"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g. react, javascript, web development"
              />
              <ErrorMessage name="tags" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-700">Blog Content</label>
              <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gray-50 rounded-t-lg border border-b-0">
                <button type="button" onClick={() => applyFormatting("bold", values, setFieldValue)} className="p-2 hover:bg-gray-200 rounded"><Bold size={16} /></button>
                <button type="button" onClick={() => applyFormatting("italic", values, setFieldValue)} className="p-2 hover:bg-gray-200 rounded"><Italic size={16} /></button>
                <button type="button" onClick={() => applyFormatting("underline", values, setFieldValue)} className="p-2 hover:bg-gray-200 rounded"><Underline size={16} /></button>
                <button type="button" onClick={() => applyFormatting("link", values, setFieldValue)} className="p-2 hover:bg-gray-200 rounded"><Link size={16} /></button>
              </div>
              <Field
                as="textarea"
                id="content-editor"
                name="content"
                className="w-full border border-t-0 rounded-b-lg px-4 py-3 min-h-64 focus:ring-2 focus:ring-indigo-500"
                placeholder="Write your blog content here..."
              />
              <ErrorMessage name="content" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-semibold transition flex items-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Blog"
                )}
              </button>
              <button
                type="reset"
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Clear Form
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBlog;
