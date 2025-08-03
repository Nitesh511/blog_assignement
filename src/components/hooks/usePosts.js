import { useAddBlogMutation } from "../redux/blogApiSlice";
import { showErrorAlert, showSuccessAlert } from "../utils/alertMessage";

const ProceedToApiPosts = () => {
  const [addBlogAPI] = useAddBlogMutation();

  const addBlog = async (formData) => {
    try {
      // Make the API call
      const response = await addBlogAPI(formData).unwrap();
      // Access the HTTP status code from the response
      const statusCode = response.statusCode; // HTTP status code, e.g., 201
      const message = response.message; // Message from the response body
      // Handle success or failure based on the status code
      if (statusCode === 201) {
        showSuccessAlert(message);
        return { success: true, message };
      } else {
        showErrorAlert(message);
        return { success: false, message };
      }
    } catch (error) {
      // Handle error and display appropriate message
      const errorMessage =
        error?.data?.message || error.message || "An error occurred";

      showErrorAlert(errorMessage);

      return { success: false, message: errorMessage };
    }
  };

  return { addBlog };
};

export default ProceedToApiPosts;
