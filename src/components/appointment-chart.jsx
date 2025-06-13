"use client"

import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", appointments: 65, consultations: 45 },
  { month: "Feb", appointments: 78, consultations: 52 },
  { month: "Mar", appointments: 90, consultations: 68 },
  { month: "Apr", appointments: 81, consultations: 61 },
  { month: "May", appointments: 95, consultations: 75 },
  { month: "Jun", appointments: 110, consultations: 88 },
  { month: "Jul", appointments: 125, consultations: 95 },
  { month: "Aug", appointments: 118, consultations: 89 },
  { month: "Sep", appointments: 132, consultations: 102 },
  { month: "Oct", appointments: 145, consultations: 115 },
  { month: "Nov", appointments: 138, consultations: 108 },
  { month: "Dec", appointments: 155, consultations: 125 },
]

export default function AppointmentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="appointments"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="consultations"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
