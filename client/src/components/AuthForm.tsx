import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthFormData } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk, registerUserThunk } from "@/slices/userSlice";

interface AuthFormProps {
  type: "login" | "register";
  onSuccess: () => void;
}

const AuthForm = ({ type, onSuccess }: AuthFormProps) => {
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
    role: "donor",
    organization: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, token } = useSelector(
    (state: any) => state.user
  );

  useEffect(() => {
    if (user && token) {
      onSuccess();
      navigate("/dashboard");
    }
  }, [user, token, onSuccess, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "register" && !formData.name) {
      toast.error("Please enter your name");
      return;
    }
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }
    if (!formData.password) {
      toast.error("Please enter your password");
      return;
    }
    if (
      type === "register" &&
      formData.role === "orphanage" &&
      !formData.organization
    ) {
      toast.error("Please enter your organization name");
      return;
    }
    if (type === "login") {
      dispatch(
        loginUserThunk({
          email: formData.email,
          password: formData.password,
        }) as any
      );
    } else {
      dispatch(registerUserThunk(formData) as any);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "register" && (
        <div>
          <label
            htmlFor="name"
            className="form-label"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your full name"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="form-label"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="form-label"
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
            className="form-input pr-12"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-sage-600 transition-colors"
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
              className="form-label"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="donor">Food Donor</option>
              <option value="orphanage">Orphanage</option>
            </select>
          </div>

          {formData.role === "orphanage" && (
            <div>
              <label
                htmlFor="organization"
                className="form-label"
              >
                Organization Name
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your organization name"
              />
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-4 mt-8 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="w-6 h-6 mr-3 animate-spin" />
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
