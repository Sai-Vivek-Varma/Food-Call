
import { Loader2 } from "lucide-react";

const GradientButton = ({ 
  children, 
  onClick, 
  loading = false, 
  disabled = false,
  variant = "primary",
  size = "default",
  className = "",
  ...props 
}) => {
  const variants = {
    primary: "bg-gradient-to-r from-sage-500 to-emerald-500 hover:from-sage-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 shadow-md hover:shadow-lg",
    danger: "bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white shadow-lg hover:shadow-xl",
    success: "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        relative overflow-hidden font-semibold rounded-xl
        transform transition-all duration-300 ease-out
        hover:-translate-y-1 hover:scale-105 active:scale-95
        focus:ring-4 focus:ring-sage-200 focus:outline-none
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
        ${variants[variant]} ${sizes[size]} ${className}
      `}
      {...props}
    >
      <div className="relative z-10 flex items-center justify-center space-x-2">
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        <span>{children}</span>
      </div>
      
      {/* Ripple effect */}
      <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
    </button>
  );
};

export default GradientButton;
