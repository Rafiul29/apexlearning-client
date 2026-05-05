"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const PlatformVitals = ({ data }: { data: any[] }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-[300px] w-full" />;

  const isDark = resolvedTheme === "dark";

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={isDark ? 0.2 : 0.1} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={isDark ? "#1e293b" : "#f1f5f9"}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: isDark ? "#475569" : "#94a3b8", fontWeight: 600 }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? "#0f172a" : "#fff",
              border: isDark ? "1px solid #1e293b" : "1px solid #e2e8f0",
              borderRadius: "12px",
              fontSize: "12px"
            }}
          />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorUsers)"
            name="Bookings"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
