import { motion } from "framer-motion";
import {
  MoreVertical,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Plus,
  TrendingUp,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import AppointmentChart from "@/components/appointment-chart";
import CaseDistributionChart from "@/components/case-distribution-chart";

// Static Data
const dashboardStats = [
  {
    title: "Total Bookings",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Calendar,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Total Cases",
    value: "892",
    change: "+8.2%",
    trend: "up",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Upcoming Today",
    value: "24",
    change: "+3",
    trend: "up",
    icon: Clock,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Revenue",
    value: "$127,450",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const quickActions = [
  { title: "Schedule Appointment", icon: Calendar, color: "bg-blue-500" },
  { title: "Add New Client", icon: Users, color: "bg-green-500" },
  { title: "Create Case", icon: FileText, color: "bg-purple-500" },
  { title: "Generate Report", icon: TrendingUp, color: "bg-orange-500" },
];

const caseStatuses = [
  { status: "Active", count: 45, color: "bg-green-500", percentage: 45 },
  { status: "Pending", count: 23, color: "bg-yellow-500", percentage: 23 },
  { status: "Closed", count: 67, color: "bg-gray-500", percentage: 67 },
  { status: "On Hold", count: 12, color: "bg-red-500", percentage: 12 },
];

const upcomingDeadlines = [
  {
    id: 1,
    title: "Johnson vs. Smith - Discovery Deadline",
    date: "Today, 5:00 PM",
    priority: "high",
    client: "Sarah Johnson",
  },
  {
    id: 2,
    title: "Corporate Merger Documentation",
    date: "Tomorrow, 2:00 PM",
    priority: "medium",
    client: "TechCorp Inc.",
  },
  {
    id: 3,
    title: "Property Settlement Review",
    date: "Dec 28, 10:00 AM",
    priority: "low",
    client: "David Thompson",
  },
  {
    id: 4,
    title: "Criminal Defense Filing",
    date: "Dec 30, 4:00 PM",
    priority: "high",
    client: "Emily Rodriguez",
  },
];

export default function Dashboard() {
  return (
    <main className="p-6 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Law Management Dashboard
        </h1>
        <p className="text-gray-600">
          Overview of all cases, meetings, and key metrics.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {dashboardStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="group"
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="bg-gray-100 border-b border-gray-200 outline-none hover:shadow-2xl"
                      align="end"
                    >
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Export Data</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-sm text-green-500 font-medium">
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">
                      vs last month
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Appointment Chart - Large */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="lg:col-span-8"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Booked Appointment Overview
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Monthly appointment trends
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-gray-100 border-b border-gray-200 outline-none hover:shadow-2xl"
                  align="end"
                >
                  <DropdownMenuItem>Export Chart</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <AppointmentChart />
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="lg:col-span-4"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Quick Actions
              </CardTitle>
              <p className="text-gray-600 text-sm">Frequently used actions</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="w-full justify-start h-12 hover:bg-gray-50 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${action.color} mr-3`}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{action.title}</span>
                    <Plus className="h-4 w-4 ml-auto text-gray-400" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Case Distribution Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="lg:col-span-5"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Case Distribution
                </CardTitle>
                <p className="text-gray-600 text-sm">Cases by practice area</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="bg-gray-100 border-b border-gray-200 outline-none hover:shadow-2xl"
                  align="end"
                >
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuItem>Export Data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <CaseDistributionChart />
            </CardContent>
          </Card>
        </motion.div>

        {/* Case Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="lg:col-span-3"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-gray-900">
                Case Status
              </CardTitle>
              <p className="text-gray-600 text-sm">Current case overview</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {caseStatuses.map((status, index) => (
                <motion.div
                  key={status.status}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${status.color} mr-2`}
                      ></div>
                      <span className="font-medium text-gray-900">
                        {status.status}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {status.count}
                    </span>
                  </div>
                  <Progress value={status.percentage} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Upcoming Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="lg:col-span-4"
        >
          <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  Upcoming Deadlines
                </CardTitle>
                <p className="text-gray-600 text-sm">
                  Important dates to remember
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline, index) => (
                <motion.div
                  key={deadline.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900 text-sm leading-tight">
                      {deadline.title}
                    </h4>
                    <span
                      className={clsx(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        {
                          "bg-red-100 text-red-700":
                            deadline.priority === "high",
                          "bg-orange-100 text-orange-700":
                            deadline.priority === "medium",
                          "bg-green-100 text-green-700":
                            deadline.priority === "low",
                        }
                      )}
                    >
                      {deadline.priority}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {deadline.client}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {deadline.date}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
