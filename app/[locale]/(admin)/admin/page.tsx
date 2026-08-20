"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const revData = [
  { date: "01/08", total: 4000 },
  { date: "02/08", total: 3000 },
  { date: "03/08", total: 5000 },
];
const movieData = [
  { name: "Deadpool", tickets: 400 },
  { name: "Minions", tickets: 300 },
];
const seatData = [
  { name: "Đã lấp đầy", value: 65 },
  { name: "Còn trống", value: 35 },
];
const COLORS = ["#ef4444", "#e5e7eb"];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Thống kê Tổng quan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Doanh thu theo ngày (Line Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Doanh thu 7 ngày qua</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Vé bán theo Phim (Bar Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <h2 className="text-lg font-semibold mb-4">Top Phim bán chạy</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={movieData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Tỷ lệ lấp đầy ghế (Pie Chart) */}
        <div className="bg-white p-4 rounded-xl shadow-sm border lg:col-span-2 w-full max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-4 text-center">
            Tỷ lệ lấp đầy rạp hôm nay
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={seatData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {seatData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
