import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  Share2,
  Calendar,
  FileText,
  MoreVertical,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Appointments() {
  const [searchValue, setSearchValue] = useState("");
  const [dateValue, setDateValue] = useState(new Date());
  const [clickedButton, setClickedButton] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef(null);


   // Close filter panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      title: "Completed",
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
      title: "Earnings",
      value: "$127,450",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const bookings = Array.from({ length: 7 }, (_, i) => ({
    id: i + 1,
    clientName: `Client ${i + 1}`,
    duration: "30 min",
    dateTime: "Dec 15, 2024 10:00 AM",
    bookedOn: "Dec 10, 2024",
  }));

  const handleJoinMeet = (id) => {
    setClickedButton(id);
    setTimeout(() => setClickedButton(null), 200);
  };

  return (
    <div className="p-6  ">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Booking Dashboard
        </h1>
        <p className="text-gray-600">Manage your appointments and meetings.</p>
      </motion.div>

      {/* Metrics Cards */}
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

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-xl font-semibold text-gray-900"
        >
          Booking List
        </motion.h2>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search meeting..."
              className="pl-10 hover:shadow-lg bg-gray-50 border border-gray-200 
             focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition-colors"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <AnimatePresence>
              {searchValue && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchValue("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          <motion.div className="relative w-full sm:w-40">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none z-10" />
            <DatePicker
              selected={dateValue}
              onChange={(date) => setDateValue(date)}
              dateFormat="dd-MM-yyyy"
              placeholderText="dd-mm-yyyy"
              className="pl-10 bg-gray-50 w-full shadow-sm hover:shadow-lg transition-shadow duration-200 border border-gray-300 rounded-md text-sm text-gray-700 py-2"
            />
          </motion.div>

          <div className="relative inline-block" ref={filterRef}>
      {/* Filter Button */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="outline"
          className="hover:shadow-lg bg-gray-50 border border-gray-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 
             transition-colors"
          onClick={() => setShowFilters((prev) => !prev)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </motion.div>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className="absolute mt-2 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4 space-y-3"
        >
          <div className="text-sm font-medium text-gray-700">Filter Options</div>
          
          {/* Example Filter Option */}
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="high" className="accent-blue-500" />
            <label htmlFor="high" className="text-sm text-gray-600">High Priority</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="medium" className="accent-orange-400" />
            <label htmlFor="medium" className="text-sm text-gray-600">Medium Priority</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="low" className="accent-green-500" />
            <label htmlFor="low" className="text-sm text-gray-600">Low Priority</label>
          </div>
          
          <Button
            variant="default"
            size="sm"
            className="w-full mt-2"
            onClick={() => {
              // Apply filter logic here
              setShowFilters(false);
            }}
          >
            Apply Filters
          </Button>
        </motion.div>
      )}
    </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 transition-all duration-300">
                  <TableHead className="text-white font-medium">No.</TableHead>
                  <TableHead className="text-white font-medium">
                    Clients Name
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    Duration
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    Date & Time
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    Booked On
                  </TableHead>
                  <TableHead className="text-white font-medium">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {bookings.map((booking, index) => (
                    <motion.tr
                      key={booking.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{
                        backgroundColor: "rgba(59, 130, 246, 0.05)",
                        scale: 1.01,
                      }}
                      className="border-b transition-colors duration-200"
                    >
                      <TableCell className="font-medium">
                        {booking.id}
                      </TableCell>
                      <TableCell>{booking.clientName}</TableCell>
                      <TableCell>{booking.duration}</TableCell>
                      <TableCell>{booking.dateTime}</TableCell>
                      <TableCell>{booking.bookedOn}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            animate={{
                              scale:
                                clickedButton === booking.id ? [1, 1.1, 1] : 1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-200"
                              onClick={() => handleJoinMeet(booking.id)}
                            >
                              <motion.span
                                animate={{
                                  color:
                                    clickedButton === booking.id
                                      ? "#10B981"
                                      : "#FFFFFF",
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                Join Meet
                              </motion.span>
                            </Button>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="hover:bg-blue-50 transition-colors duration-200"
                            >
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </TableBody>
            </Table>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
