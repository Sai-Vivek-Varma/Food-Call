import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { AuthFormData } from "@/lib/types";
import { registerUser, loginUser } from "@/lib/api";

interface AuthFormProps {
  type: "login" | "register";
  onSuccess: () => void;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  name: string;
  role: string;
  organization?: string;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
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

    setIsSubmitting(true);

    try {
      let userData;

      if (type === "login") {
        const loginCredentials: LoginCredentials = {
          email: formData.email,
          password: formData.password,
        };
        userData = await loginUser(loginCredentials);
      } else {
        const registerData: RegisterData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        };

        if (formData.organization) {
          registerData.organization = formData.organization;
        }

        userData = await registerUser(registerData);
      }

      // Store full user data
      localStorage.setItem("foodShareUser", JSON.stringify(userData));
      // Also store the token separately so that other parts of the app can retrieve it.
      localStorage.setItem("foodShareToken", userData.token);

      onSuccess();
      navigate("/dashboard");
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(
        type === "login"
          ? "Failed to sign in. Please check your credentials."
          : "Failed to create account. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === "register" && (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-foreground mb-1"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
            placeholder="Enter your full name"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground mb-1"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground mb-1"
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
            className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
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
              className="block text-sm font-medium text-foreground mb-1"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
            >
              <option value="donor">Food Donor</option>
              <option value="orphanage">Orphanage</option>
            </select>
          </div>

          {formData.role === "orphanage" && (
            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-medium text-foreground mb-1"
              >
                Organization Name
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                value={formData.organization}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-sage-500 transition-all"
                placeholder="Enter your organization name"
              />
            </div>
          )}
        </>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sage-500 text-white py-2 rounded-md hover:bg-sage-600 transition-all mt-6 flex items-center justify-center"
      >
        {isSubmitting ? (
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
