import { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { format, parse } from "date-fns";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Download,
  Share2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { allLawyers } from "@/data/LawyerData";


function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function ConfirmationPage() {
  const { lawyerId } = useParams();
  const query = useQuery();

  const dateParam = query.get("date");
  const timeParam = query.get("time");

  const [lawyer, setLawyer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
    setBookingId(`LC-${randomId}`);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const foundLawyer = allLawyers.find((l) => l.id === lawyerId);
      setLawyer(foundLawyer || null);
      setIsLoading(false);
    }, 500);
  }, [lawyerId]);

  const bookingDate = dateParam ? parse(dateParam, "yyyy-MM-dd", new Date()) : null;
  const bookingTime = timeParam ? decodeURIComponent(timeParam) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    );
  }

  if (!lawyer || !bookingDate || !bookingTime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Information Missing</h2>
              <p className="text-gray-600 mb-6">We couldn't find the booking information you're looking for.</p>
              <Link to="/find-lawyer">
                <Button>Back to Find a Lawyer</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Card className="shadow-lg border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="h-12 w-12 text-green-500" />
              </motion.div>
              <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
              <p className="text-blue-100 text-lg">Your consultation has been successfully scheduled.</p>
            </div>

            <CardContent className="p-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                <p className="text-blue-800 font-medium">
                  A confirmation email has been sent to your registered email address with all the details.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-500 text-sm">Booking ID</p>
                      <p className="font-medium text-gray-900">{bookingId}</p>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-gray-500 text-sm">Date</p>
                        <p className="font-medium text-gray-900">{format(bookingDate, "EEEE, MMMM d, yyyy")}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-gray-500 text-sm">Time</p>
                        <p className="font-medium text-gray-900">{bookingTime}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                      <div>
                        <p className="text-gray-500 text-sm">Location</p>
                        <p className="font-medium text-gray-900">Video Consultation (link will be sent via email)</p>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Information</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Consultation Fee:</span>
                      <span className="font-medium text-gray-900">{lawyer.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Fee:</span>
                      <span className="font-medium text-gray-900">$25.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium text-gray-900">
                        ${(lawyer.hourlyRateValue * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Paid:</span>
                      <span className="text-xl font-bold text-green-600">
                        ${(lawyer.hourlyRateValue + 25 + lawyer.hourlyRateValue * 0.08).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Your Lawyer</h2>
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                      <img src={lawyer.image} alt={lawyer.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{lawyer.name}</h3>
                      <p className="text-blue-600">{lawyer.specialty}</p>
                      <p className="text-gray-600 text-sm">{lawyer.experience} experience</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-500 text-sm">Email</p>
                      <p className="font-medium text-gray-900">{lawyer.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Phone</p>
                      <p className="font-medium text-gray-900">{lawyer.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Office Address</p>
                      <p className="font-medium text-gray-900">{lawyer.address}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <h2 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h2>
                  <div className="space-y-3 text-gray-600">
                    <p className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                      You'll receive a confirmation email with meeting details
                    </p>
                    <p className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                      A video call link will be sent 24 hours before your appointment
                    </p>
                    <p className="flex items-start">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                      Prepare any documents or questions for your consultation
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Booking
                  </Button>
                  <Link to="/find-lawyer" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Book Another Lawyer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
