
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Utensils, Users, TreePine, Heart } from "lucide-react";
import StatsCard from "../StatsCard";

const ImpactMetrics = ({ mealsProvided, organizationsHelped, wasteReduced, livesImpacted }) => {
  const pieData = [
    { name: 'Meals Provided', value: mealsProvided, color: '#10b981' },
    { name: 'Organizations Helped', value: organizationsHelped, color: '#06d6a0' },
    { name: 'Waste Reduced (kg)', value: wasteReduced, color: '#59a14f' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Meals Provided"
          value={mealsProvided}
          icon={Utensils}
          trend="up"
          trendValue={12}
          description="This month"
          gradient="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Organizations Helped"
          value={organizationsHelped}
          icon={Users}
          trend="up"
          trendValue={8}
          description="Active partners"
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Waste Reduced"
          value={`${wasteReduced}kg`}
          icon={TreePine}
          trend="up"
          trendValue={15}
          description="Environmental impact"
          gradient="from-green-600 to-teal-500"
        />
        <StatsCard
          title="Lives Impacted"
          value={livesImpacted}
          icon={Heart}
          trend="up"
          trendValue={20}
          description="People helped"
          gradient="from-pink-500 to-rose-500"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
        <h3 className="text-xl font-bold mb-6 gradient-text">Impact Distribution</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;
