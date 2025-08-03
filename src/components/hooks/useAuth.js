import {
  useLazyLoginQuery,
  useRegisterMutation,
  useLogoutMutation,
} from "../redux/authApiSlice";
import { showErrorAlert, showSuccessAlert } from "../utils/alertMessage";
import { getToken, removeToken, saveToken } from "../utils/crypto";
import Swal from "sweetalert2";

const ProceedToApi = () => {
  const [registerAPI] = useRegisterMutation();
  const [loginAPI] = useLazyLoginQuery();
  const [LogoutAPI] = useLogoutMutation();

  const register = async (formData) => {
    try {
      const response = await registerAPI(formData).unwrap();

      // Since no status code from mockapi, just show success
      showSuccessAlert("Registration successful!");

      return { success: true, data: response };
    } catch (error) {
      const errorMessage =
        error?.data?.message || error.message || "An error occurred";

      showErrorAlert(errorMessage);

      return { success: false, message: errorMessage };
    }
  };

  const login = async (credentials) => {
    const { email, password } = credentials;

    try {
      const result = await loginAPI({ email, password });

      if (result?.status === 200 || result?.data?.length === 1) {
        const user = result.data[0];
        saveToken("authToken", user.id);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${user.name || "User"}!`,
          timer: 2000,
          showConfirmButton: false,
        });

        return user;
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password",
        });
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      if (error.response?.status === 404) {
        Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: "No account exists with this email",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Error",
          text: error.message || "Something went wrong",
        });
      }

      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = getToken("authToken");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await LogoutAPI(token).unwrap();
      const { statusCode, message } = response;

      if (statusCode === 200) {
        showSuccessAlert(message);
        removeToken("authToken");

        return message;
      } else {
        showErrorAlert(message);
        return message;
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || error.message || "An error occurred";

      showErrorAlert(errorMessage);

      return errorMessage;
    }
  };

  return { register, login, logout };
};

export default ProceedToApi;
