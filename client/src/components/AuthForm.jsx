import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserThunk,
  registerUserThunk,
  clearError,
} from "../slices/userSlice";

const AuthForm = ({ type, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    role: "donor",
    organization: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (user && token && isAuthenticated) {
      onSuccess();
    }
  }, [user, token, isAuthenticated, onSuccess]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // Clear error after showing it
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous errors
    if (error) {
      dispatch(clearError());
    }

    // Validation
    if (type === "register" && !formData.name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.password.trim()) {
      toast.error("Please enter your password");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (
      type === "register" &&
      formData.role === "orphanage" &&
      !formData.organization.trim()
    ) {
      toast.error("Please enter your organization name");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      if (type === "login") {
        await dispatch(
          loginUserThunk({
            email: formData.email.trim(),
            password: formData.password,
          })
        ).unwrap();
      } else {
        await dispatch(
          registerUserThunk({
            ...formData,
            name: formData.name.trim(),
            email: formData.email.trim(),
            organization: formData.organization.trim(),
          })
        ).unwrap();
      }
    } catch (error) {
      // Error is handled in Redux slice
      console.error("Auth error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "register" && (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all"
            placeholder="Enter your full name"
            required
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all"
          placeholder="Enter your email"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all pr-10"
            placeholder="Enter your password"
            minLength={6}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {type === "register" && (
        <>
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all"
              required
            >
              <option value="donor">Food Donor</option>
              <option value="orphanage">Orphanage</option>
            </select>
          </div>

          {formData.role === "orphanage" && (
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Organization Name *
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 transition-all"
                placeholder="Enter your organization name"
                required
              />
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-sage-500 text-white py-3 rounded-md hover:bg-sage-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6 flex items-center justify-center font-medium"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {type === "login" ? "Signing in..." : "Creating account..."}
          </>
        ) : type === "login" ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
};

export default AuthForm;
