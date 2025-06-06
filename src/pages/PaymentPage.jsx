import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format, parse } from "date-fns";
import { allLawyers } from "@/data/LawyerData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import {
  CreditCard,
  CheckCircle,
  Lock,
  ChevronRight,
  CreditCardIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function PaymentPage() {
  const navigate = useNavigate();
  const { lawyerId } = useParams();
  const query = useQuery();

  // Extract date and time from URL parameters
  const dateParam = query.get("date");
  const timeParam = query.get("time");

    // State to hold lawyer data
  const [lawyer, setLawyer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  // Form state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [formErrors, setFormErrors] = useState({});

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  // Fetch lawyer data
  useEffect(() => {
    setTimeout(() => {
      const foundLawyer = allLawyers.find((l) => l.id === lawyerId);
      setLawyer(foundLawyer || null);
      setIsLoading(false);
    }, 500);
  }, [lawyerId]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Please enter a valid 16-digit card number";
    }
    if (!cardName.trim()) {
      errors.cardName = "Please enter the name on card";
    }
    if (!expiryDate.trim() || expiryDate.length !== 5) {
      errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    }
    if (!cvv.trim() || cvv.length < 3 || cvv.length > 4) {
      errors.cvv = "Please enter a valid CVV/CVC";
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsProcessing(true);
      setTimeout(() => {
        navigate(
          `/book/${lawyerId}/confirmation?date=${dateParam}&time=${timeParam}`
        );
      }, 2000);
    }
  };

  // Parse date from URL parameter
  const bookingDate = dateParam
    ? parse(dateParam, "yyyy-MM-dd", new Date())
    : null;
  const bookingTime = timeParam ? decodeURIComponent(timeParam) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment information...</p>
        </div>
      </div>
    );
  }

  if (!lawyer || !bookingDate || !bookingTime) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded shadow p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Information Missing
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the booking information you're looking for.
            </p>
            <Link to="/find-lawyer">
              <button className="btn btn-primary">Back to Find a Lawyer</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/find-lawyer">
                  Find a Lawyer
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/find-lawyer?id=${lawyer.id}`}>
                  {lawyer.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/book/${lawyerId}`}>Book</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Payment</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Payment Details
                  </h2>
                  <div className="flex items-center text-green-600">
                    <Lock className="h-4 w-4 mr-1" />
                    <span className="text-sm">Secure Payment</span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <Label className="text-base font-medium text-gray-700 mb-3 block">
                    Payment Method
                  </Label>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label
                        htmlFor="credit-card"
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "credit-card"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <CreditCard
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === "credit-card"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        />
                        <div
                          className={`font-medium ${
                            paymentMethod === "credit-card"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          Credit Card
                        </div>
                        <RadioGroupItem
                          value="credit-card"
                          id="credit-card"
                          className="sr-only"
                        />
                      </Label>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label
                        htmlFor="paypal"
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "paypal"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <svg
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === "paypal"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.028-2.662 4.517-6.313 4.517H12.06c-.524 0-.968.382-1.05.9l-1.143 7.244c-.07.435.211.842.65.842h3.39c.524 0 .968-.382 1.05-.9l.28-1.779c.082-.519.526-.9 1.051-.9h.714c4.27 0 7.01-2.356 7.651-6.798.306-2.127.046-3.814-1.53-4.839z" />
                        </svg>
                        <div
                          className={`font-medium ${
                            paymentMethod === "paypal"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          PayPal
                        </div>
                        <RadioGroupItem
                          value="paypal"
                          id="paypal"
                          className="sr-only"
                        />
                      </Label>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Label
                        htmlFor="apple-pay"
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          paymentMethod === "apple-pay"
                            ? "border-blue-600 bg-blue-50"
                            : "border-gray-200 hover:border-blue-200"
                        }`}
                      >
                        <svg
                          className={`h-6 w-6 mb-2 ${
                            paymentMethod === "apple-pay"
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M7.078 23.55c-.473-.316-.893-.703-1.244-1.15-.383-.463-.738-.95-1.064-1.454-.766-1.12-1.365-2.345-1.78-3.636-.5-1.502-.743-2.94-.743-4.347 0-1.57.34-2.94 1.002-4.09.49-.9 1.22-1.653 2.1-2.182.85-.53 1.84-.82 2.84-.84.35 0 .73.05 1.13.15.29.08.64.21 1.07.37.55.21.85.34.95.37.32.12.59.17.8.17.16 0 .39-.05.645-.13.145-.05.42-.14.81-.31.386-.14.692-.26.935-.35.37-.11.728-.21 1.05-.26.39-.06.777-.08 1.148-.05.71.05 1.36.2 1.94.42 1.02.41 1.843 1.05 2.457 1.96-.26.16-.5.346-.725.55-.487.43-.9.94-1.23 1.505-.43.77-.65 1.64-.644 2.52.015 1.083.29 2.035.84 2.86.387.6.904 1.114 1.534 1.536.31.21.582.355.84.45-.12.375-.252.74-.405 1.1-.347.807-.76 1.58-1.25 2.31-.432.63-.772 1.1-1.03 1.41-.402.48-.79.84-1.18 1.097-.43.285-.935.436-1.452.436-.35.015-.7-.03-1.034-.127-.29-.095-.576-.202-.856-.323-.293-.134-.596-.248-.905-.34-.38-.1-.77-.148-1.164-.147-.4 0-.79.05-1.16.145-.31.088-.61.196-.907.325-.42.175-.695.29-.855.34-.324.096-.656.154-.99.175-.52 0-1.004-.15-1.486-.45zm6.854-18.46c-.68.34-1.326.484-1.973.436-.1-.646 0-1.31.27-2.037.24-.62.56-1.18 1-1.68.46-.52 1.01-.95 1.63-1.26.66-.34 1.29-.52 1.89-.55.08.68 0 1.35-.25 2.07-.228.64-.568 1.23-1 1.76-.435.52-.975.95-1.586 1.26z" />
                        </svg>
                        <div
                          className={`font-medium ${
                            paymentMethod === "apple-pay"
                              ? "text-blue-600"
                              : "text-gray-700"
                          }`}
                        >
                          Apple Pay
                        </div>
                        <RadioGroupItem
                          value="apple-pay"
                          id="apple-pay"
                          className="sr-only"
                        />
                      </Label>
                    </motion.div>
                  </RadioGroup>
                </div>

                {/* Credit Card Form */}
                {paymentMethod === "credit-card" && (
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="card-number" className="text-gray-700">
                          Card Number
                        </Label>
                        <div className="relative mt-1">
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) =>
                              setCardNumber(formatCardNumber(e.target.value))
                            }
                            maxLength={19}
                            className={`pl-10 ${
                              formErrors.cardNumber ? "border-red-500" : ""
                            }`}
                          />
                          <CreditCardIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        </div>
                        {formErrors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.cardNumber}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="card-name" className="text-gray-700">
                          Name on Card
                        </Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className={
                            formErrors.cardName ? "border-red-500" : ""
                          }
                        />
                        {formErrors.cardName && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.cardName}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label
                            htmlFor="expiry-date"
                            className="text-gray-700"
                          >
                            Expiry Date
                          </Label>
                          <Input
                            id="expiry-date"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) =>
                              setExpiryDate(formatExpiryDate(e.target.value))
                            }
                            maxLength={5}
                            className={
                              formErrors.expiryDate ? "border-red-500" : ""
                            }
                          />
                          {formErrors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.expiryDate}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="cvv" className="text-gray-700">
                            CVV/CVC
                          </Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) =>
                              setCvv(e.target.value.replace(/\D/g, ""))
                            }
                            maxLength={4}
                            className={formErrors.cvv ? "border-red-500" : ""}
                          />
                          {formErrors.cvv && (
                            <p className="text-red-500 text-sm mt-1">
                              {formErrors.cvv}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Processing...
                          </>
                        ) : (
                          <>
                            Pay {lawyer.hourlyRate}
                            <ChevronRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}

                {/* PayPal Form */}
                {paymentMethod === "paypal" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8"
                  >
                    <div className="mb-6">
                      <svg
                        className="w-16 h-16 mx-auto text-blue-600"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.028-2.662 4.517-6.313 4.517H12.06c-.524 0-.968.382-1.05.9l-1.143 7.244c-.07.435.211.842.65.842h3.39c.524 0 .968-.382 1.05-.9l.28-1.779c.082-.519.526-.9 1.051-.9h.714c4.27 0 7.01-2.356 7.651-6.798.306-2.127.046-3.814-1.53-4.839z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-6">
                      You will be redirected to PayPal to complete your payment.
                    </p>
                    <Button
                      onClick={handleSubmit}
                      className="py-6 px-8 text-lg bg-[#0070ba] hover:bg-[#005ea6] text-white font-semibold"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue to PayPal
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* Apple Pay Form */}
                {paymentMethod === "apple-pay" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-8"
                  >
                    <div className="mb-6">
                      <svg
                        className="w-16 h-16 mx-auto text-black"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M7.078 23.55c-.473-.316-.893-.703-1.244-1.15-.383-.463-.738-.95-1.064-1.454-.766-1.12-1.365-2.345-1.78-3.636-.5-1.502-.743-2.94-.743-4.347 0-1.57.34-2.94 1.002-4.09.49-.9 1.22-1.653 2.1-2.182.85-.53 1.84-.82 2.84-.84.35 0 .73.05 1.13.15.29.08.64.21 1.07.37.55.21.85.34.95.37.32.12.59.17.8.17.16 0 .39-.05.645-.13.145-.05.42-.14.81-.31.386-.14.692-.26.935-.35.37-.11.728-.21 1.05-.26.39-.06.777-.08 1.148-.05.71.05 1.36.2 1.94.42 1.02.41 1.843 1.05 2.457 1.96-.26.16-.5.346-.725.55-.487.43-.9.94-1.23 1.505-.43.77-.65 1.64-.644 2.52.015 1.083.29 2.035.84 2.86.387.6.904 1.114 1.534 1.536.31.21.582.355.84.45-.12.375-.252.74-.405 1.1-.347.807-.76 1.58-1.25 2.31-.432.63-.772 1.1-1.03 1.41-.402.48-.79.84-1.18 1.097-.43.285-.935.436-1.452.436-.35.015-.7-.03-1.034-.127-.29-.095-.576-.202-.856-.323-.293-.134-.596-.248-.905-.34-.38-.1-.77-.148-1.164-.147-.4 0-.79.05-1.16.145-.31.088-.61.196-.907.325-.42.175-.695.29-.855.34-.324.096-.656.154-.99.175-.52 0-1.004-.15-1.486-.45zm6.854-18.46c-.68.34-1.326.484-1.973.436-.1-.646 0-1.31.27-2.037.24-.62.56-1.18 1-1.68.46-.52 1.01-.95 1.63-1.26.66-.34 1.29-.52 1.89-.55.08.68 0 1.35-.25 2.07-.228.64-.568 1.23-1 1.76-.435.52-.975.95-1.586 1.26z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 mb-6">
                      You will be redirected to Apple Pay to complete your
                      payment.
                    </p>
                    <Button
                      onClick={handleSubmit}
                      className="py-6 px-8 text-lg bg-black hover:bg-gray-800 text-white font-semibold"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Continue with Apple Pay
                          <ChevronRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}

                {/* Security Notice */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center text-gray-600">
                    <Lock className="h-4 w-4 mr-2 text-green-600" />
                    <p className="text-sm">
                      Your payment information is encrypted and secure. We use
                      industry-standard security measures to protect your data.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-lg border-0 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Booking Summary
                </h3>

                <div className="flex items-center mb-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                    <img
                      src={lawyer.image || "/placeholder.svg"}
                      alt={lawyer.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{lawyer.name}</h4>
                    <p className="text-blue-600">{lawyer.specialty}</p>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">
                      {format(bookingDate, "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium text-gray-900">
                      {bookingTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-gray-900">1 hour</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Consultation Fee:</span>
                    <span className="font-medium text-gray-900">
                      {lawyer.hourlyRate}
                    </span>
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
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    $
                    {(
                      lawyer.hourlyRateValue +
                      25 +
                      lawyer.hourlyRateValue * 0.08
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-green-800">
                      Your booking is secure. You will only be charged after
                      confirming your appointment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
