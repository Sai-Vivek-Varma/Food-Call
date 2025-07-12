import { useState, useEffect } from "react";
import { BarChart3, TrendingUp, Calendar, Download } from "lucide-react";
import DonationChart from "../components/analytics/DonationChart";
import ImpactMetrics from "../components/analytics/ImpactMetrics";
import GradientButton from "../components/GradientButton";
import LoadingSpinner from "../components/LoadingSpinner";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month");

  // Mock data - replace with real API calls
  const [chartData] = useState([
    { date: "2024-01", donations: 45 },
    { date: "2024-02", donations: 52 },
    { date: "2024-03", donations: 38 },
    { date: "2024-04", donations: 61 },
    { date: "2024-05", donations: 55 },
    { date: "2024-06", donations: 67 },
    { date: "2024-07", donations: 73 },
  ]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting analytics data...");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50 pt-24">
        <div className="container-custom">
          <LoadingSpinner size="xl" className="min-h-[400px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sage-50 pt-24">
      <section className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 space-y-6 lg:space-y-0">
            <div className="space-y-4">
              <span className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-sage-100 to-emerald-100 text-sage-700 font-semibold text-sm shadow-lg border border-sage-200">
                <BarChart3 className="w-4 h-4 inline mr-2" />
                Analytics Dashboard
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
                Impact Overview
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl max-w-2xl">
                Track your food donation impact and see the difference you're
                making in the community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 focus:border-sage-500 focus:ring-2 focus:ring-sage-200 transition-all"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>

              <GradientButton onClick={handleExport} size="default">
                <Download className="w-4 h-4" />
                Export Report
              </GradientButton>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="mb-12">
            <ImpactMetrics
              mealsProvided={1250}
              organizationsHelped={15}
              wasteReduced={890}
              livesImpacted={3200}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DonationChart data={chartData} title="Monthly Donation Trends" />

            <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <h3 className="text-xl font-bold mb-6 gradient-text">
                Quick Stats
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-sage-50 to-emerald-50 rounded-xl">
                  <span className="font-medium text-gray-700">
                    Average Response Time
                  </span>
                  <span className="text-2xl font-bold text-sage-600">
                    2.3 hrs
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                  <span className="font-medium text-gray-700">
                    Success Rate
                  </span>
                  <span className="text-2xl font-bold text-blue-600">94%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                  <span className="font-medium text-gray-700">
                    Active Donors
                  </span>
                  <span className="text-2xl font-bold text-purple-600">
                    127
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;
