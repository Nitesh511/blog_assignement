import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ProceedToApi from "../../hooks/useAuth";
import { selectLoginState, setLoginState } from "../../redux/authSlice";

const LoginForm = () => {
  const initialValues = { ...useSelector(selectLoginState) };
  const dispatch = useDispatch();

  const { login } = ProceedToApi();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleFieldChange = (name, value, setFieldValue) => {
    setFieldValue(name, value);
    dispatch(
      setLoginState({
        ...initialValues,
        [name]: value,
      })
    );
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await login(values);
      dispatch(setLoginState(values));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10"
      style={{
        backgroundImage: `url("https://cdn.photoroom.com/v2/image-cache?path=gs://background-7ef44.appspot.com/backgrounds_v3/black/47_-_black.jpg")`,
      }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue, errors, touched }) => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    touched.email && errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) =>
                    handleFieldChange("email", e.target.value, setFieldValue)
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                    touched.password && errors.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) =>
                    handleFieldChange("password", e.target.value, setFieldValue)
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition duration-300"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>

              {/* Links */}
              <div className="text-center mt-4">
                <Link to="/register" className="text-blue-600 hover:underline">
                  Don’t have an account? Register
                </Link>
              </div>
              <div className="text-center">
                <Link
                  to="/forgetpassword"
                  className="text-red-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
