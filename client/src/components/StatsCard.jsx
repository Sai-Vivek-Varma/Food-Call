import { TrendingUp, TrendingDown } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  description,
  gradient = "from-sage-500 to-emerald-500",
}) => {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-sage-500 to-emerald-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && (
            <div
              className={`flex items-center space-x-1 text-sm font-medium ${
                trend === "up" ? "text-sage-600" : "text-red-600"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{trendValue}%</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold gradient-text">
            <AnimatedNumber value={value} />
          </h3>
          <p className="text-gray-600 font-medium">{title}</p>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
