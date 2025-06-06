import React from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Star, MapPin, Clock, Users, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { allLawyers } from "@/data/LawyerData";
import { format } from "date-fns";


const selectedDate = new Date();
const selectedTime = "10:30 AM";

const formattedDate = format(selectedDate, "yyyy-MM-dd");
const encodedTime = encodeURIComponent(selectedTime);

export default function FindLawyer() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Find a Lawyer
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Browse through our extensive network of qualified legal
              professionals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Filters */}
      <Card className="p-8 shadow-xl break-words border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Lawyer Name
            </label>
            <Input
              placeholder="Search by name..."
              className="pl-10 h-12 shadow focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 border-0 bg-white rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Lawyer Type
            </label>
            <Select>
              <SelectTrigger className="h-12 w-full  shadow focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white rounded-lg  hover:bg-opacity-40 transition-all duration-300 border-0">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 rounded-lg shadow-lg">
                <SelectItem value="family" className="hover:bg-indigo-300 ">
                  Family Law
                </SelectItem>
                <SelectItem value="business" className="hover:bg-indigo-300 ">
                  Business Law
                </SelectItem>
                <SelectItem value="criminal" className="hover:bg-indigo-300 ">
                  Criminal Law
                </SelectItem>
                <SelectItem
                  value="real-estate"
                  className="hover:bg-indigo-300 "
                >
                  Real Estate Law
                </SelectItem>
                <SelectItem value="employment" className="hover:bg-indigo-300 ">
                  Employment Law
                </SelectItem>
                <SelectItem value="civil" className="hover:bg-indigo-300 ">
                  Civil Law
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Experience
            </label>
            <Select>
              <SelectTrigger className="h-12 w-full  shadow focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white rounded-lg  hover:bg-opacity-40 transition-all duration-300 border-0">
                <SelectValue placeholder="Select experience" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 rounded-lg shadow-lg">
                <SelectItem value="1-3" className="hover:bg-indigo-300 ">
                  1-3 years
                </SelectItem>
                <SelectItem value="4-7" className="hover:bg-indigo-300 ">
                  4-7 years
                </SelectItem>
                <SelectItem value="8-12" className="hover:bg-indigo-300 ">
                  8-12 years
                </SelectItem>
                <SelectItem value="13+" className="hover:bg-indigo-300">
                  13+ years
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>
            <Select>
              <SelectTrigger className="h-12 w-full  shadow focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white rounded-lg  hover:bg-opacity-40 transition-all duration-300 border-0">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent className="bg-gray-50 rounded-lg shadow-lg">
                <SelectItem value="dl" className="hover:bg-indigo-300">
                  Delhi
                </SelectItem>
                <SelectItem value="bng" className="hover:bg-indigo-300">
                  Banglore
                </SelectItem>
                <SelectItem value="pu" className="hover:bg-indigo-300">
                  Pune
                </SelectItem>
                <SelectItem value="ptn" className="hover:bg-indigo-300">
                  Patna
                </SelectItem>
                <SelectItem value="no" className="hover:bg-indigo-300">
                  Noida
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </Card>

      {/* Lawyers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Available Lawyers ({allLawyers.length})
            </h2>
            <Button variant="outline" className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allLawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={lawyer.image || "/placeholder.svg"}
                      alt={lawyer.name}
                      className="w-full h-48 object-fill group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {lawyer.rating}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {lawyer.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">
                      {lawyer.specialty}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {lawyer.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {lawyer.experience} experience
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-sm">{lawyer.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {lawyer.reviews} reviews
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {lawyer.hourlyRate}/hr
                      </span>
                      <Link
                        to={`/book/${lawyer.id}?date=${formattedDate}&time=${encodedTime}`}
                      >
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          Book Now
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
