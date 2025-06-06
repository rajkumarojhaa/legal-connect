import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { format, addDays, startOfWeek, addWeeks, isSameDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  CreditCard,
  User,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { allLawyers } from "@/data/LawyerData";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export default function BookingPage() {
  const navigate = useNavigate();
  const { lawyerId } = useParams();

  const [lawyer, setLawyer] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const foundLawyer = allLawyers.find((l) => l.id === lawyerId);
      setLawyer(foundLawyer || null);
      setIsLoading(false);
    }, 500);
  }, [lawyerId]);

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    addDays(currentWeekStart, i)
  );

  const goToNextWeek = () => setCurrentWeekStart(addWeeks(currentWeekStart, 1));
  const goToPreviousWeek = () =>
    setCurrentWeekStart(addWeeks(currentWeekStart, -1));
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };
  const handleTimeSelect = (time) => setSelectedTime(time);

  const handleBookNow = () => {
    if (selectedDate && selectedTime && lawyer) {
      navigate(
        `/book/${lawyerId}/payment?date=${format(
          selectedDate,
          "yyyy-MM-dd"
        )}&time=${encodeURIComponent(selectedTime)}`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking information...</p>
        </div>
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Lawyer Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the lawyer you're looking for.
            </p>
            <Link to="/find-lawyer">
              <Button>Back to Find a Lawyer</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink to="/find-lawyer">Find a Lawyer</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink to={`/find-lawyer?id=${lawyer.id}`}>
                  {lawyer.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Book</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lawyer Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="shadow-lg border-0 overflow-hidden">
              <div className="flex flex-col md:flex-row lg:flex-col">
                <div className="relative h-48 md:h-auto md:w-1/3 lg:w-full lg:h-52 flex-shrink-0">
                  <img
                    src={lawyer.image || "/placeholder.svg"}
                    alt={lawyer.name}
                    className="object-fill w-full h-full"
                  />
                </div>
                <CardContent className="p-6 md:w-2/3">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {lawyer.name}
                  </h1>
                  <p className="text-blue-600 font-semibold mb-4">
                    {lawyer.specialty}
                  </p>
                  <div className="space-y-3 mb-4 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" /> {lawyer.experience}{" "}
                      experience
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" /> {lawyer.location}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" /> {lawyer.reviews} reviews
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <p className="text-gray-600 mb-4">{lawyer.bio}</p>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    <span className="text-lg font-bold">
                      {lawyer.hourlyRate}
                    </span>
                    <span className="text-sm ml-1">/ hour</span>
                  </Badge>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-blue-600" /> Select
                  Date & Time
                </h2>

                {/* Date Selection */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Select Date
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToPreviousWeek}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={goToNextWeek}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {weekDates.map((date) => {
                      const isSelected =
                        selectedDate && isSameDay(date, selectedDate);
                      const isToday = isSameDay(date, new Date());
                      const isPast = date < new Date() && !isToday;
                      return (
                        <motion.div
                          key={date.toString()}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <button
                            onClick={() => !isPast && handleDateSelect(date)}
                            disabled={isPast}
                            className={`w-full py-3 px-1 rounded-lg  outline outline-slate-400
                                    shadow-sm ${
                              isSelected
                                ? "bg-blue-600 text-white"
                                : isToday
                                ? "bg-blue-100 text-blue-800"
                                : isPast
                                ? "bg-gray-100 text-gray-400"
                                : "bg-white hover:bg-blue-50 text-gray-800 border"
                            }`}
                          >
                            <div className="text-xs font-medium mb-1">
                              {format(date, "EEE")}
                            </div>
                            <div className="text-lg font-bold">
                              {format(date, "d")}
                            </div>
                            <div className="text-xs">{format(date, "MMM")}</div>
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Select Time for{" "}
                      {format(selectedDate, "EEEE, MMMM d, yyyy")}
                    </h3>
                    <ScrollArea className="h-[220px] pr-4">
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <motion.div
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <button
                              onClick={() => handleTimeSelect(time)}
                              className={`w-full py-3 px-4 rounded-lg ${
                                selectedTime === time
                                  ? "bg-blue-600 text-white"
                                  : "bg-white hover:bg-blue-50 text-gray-800 border"
                              }`}
                            >
                              <div className="flex items-center justify-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {time}
                              </div>
                            </button>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </motion.div>
                )}

                {/* Booking Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="mt-8 pt-6 border-t"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Booking Summary
                      </h3>
                      {selectedDate && selectedTime ? (
                        <p className="text-gray-600">
                          {format(selectedDate, "EEEE, MMMM d, yyyy")} at{" "}
                          {selectedTime}
                        </p>
                      ) : (
                        <p className="text-gray-500 italic">
                          Please select a date and time
                        </p>
                      )}
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-gray-600">Consultation Fee:</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {lawyer.hourlyRate}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleBookNow}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Payment
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
