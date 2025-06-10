import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Search,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { allLawyers } from "@/data/LawyerData";



// Service type mapping
const serviceTypeMapping = {
  "family-law": "Family Law",
  "business-law": "Business Law",
  "criminal-law": "Criminal Law",
  "real-estate-law": "Real Estate Law",
  "employment-law": "Employment Law",
  "civil-law": "Civil Law",
};

export default function Services() {
  const params = useParams();
  const serviceType = params.serviceType;

  const [filteredLawyers, setFilteredLawyers] = useState([]);
  const [sortBy, setSortBy] = useState("rating");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Get the display name for the service type
  const serviceDisplayName =
    serviceTypeMapping[serviceType] || "Legal Services";

  // Filter lawyers by specialty
  useEffect(() => {
    let lawyers = allLawyers.filter(
      (lawyer) => lawyer.specialty === serviceDisplayName
    );

    // Apply search filter
    if (searchQuery) {
      lawyers = lawyers.filter(
        (lawyer) =>
          lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.subSpecialties.some((sub) =>
            sub.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Apply location filter
    if (filterLocation) {
      lawyers = lawyers.filter((lawyer) =>
        lawyer.location.toLowerCase().includes(filterLocation.toLowerCase())
      );
    }

    // Apply experience filter
    if (filterExperience) {
      switch (filterExperience) {
        case "1-5":
          lawyers = lawyers.filter((lawyer) => {
            const years = parseInt(lawyer.experience);
            return years >= 1 && years <= 5;
          });
          break;
        case "6-10":
          lawyers = lawyers.filter((lawyer) => {
            const years = parseInt(lawyer.experience);
            return years >= 6 && years <= 10;
          });
          break;
        case "11-15":
          lawyers = lawyers.filter((lawyer) => {
            const years = parseInt(lawyer.experience);
            return years >= 11 && years <= 15;
          });
          break;
        case "15+":
          lawyers = lawyers.filter((lawyer) => {
            const years = parseInt(lawyer.experience);
            return years > 15;
          });
          break;
        default:
          break;
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "rating":
        lawyers.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        lawyers.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      case "price-low":
        lawyers.sort((a, b) => a.hourlyRateValue - b.hourlyRateValue);
        break;
      case "price-high":
        lawyers.sort((a, b) => b.hourlyRateValue - a.hourlyRateValue);
        break;
      case "reviews":
        lawyers.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredLawyers(lawyers);
  }, [
    serviceDisplayName,
    searchQuery,
    filterLocation,
    filterExperience,
    sortBy,
  ]);

  // Handle 404 for invalid service types
  if (!serviceTypeMapping[serviceType]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Service Not Found
              </h2>
              <p className="text-gray-600 mb-6">
                The legal service you're looking for doesn't exist.
              </p>
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-start mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {serviceDisplayName} Lawyers
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Find experienced {serviceDisplayName.toLowerCase()} attorneys
                who specialize in your specific legal needs
              </p>
            </motion.div>

            {/* Breadcrumb Navigation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <Breadcrumb>
                <BreadcrumbList className="text-blue-100">
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      to="/#services"
                      className="text-blue-100 hover:text-white"
                    >
                      Services
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="text-blue-300" />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="text-white font-medium">
                      {serviceDisplayName}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {filteredLawyers.length}
              </div>
              <div className="text-blue-100">Available Lawyers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {filteredLawyers.length > 0
                  ? `${(
                      filteredLawyers.reduce(
                        (sum, lawyer) => sum + lawyer.rating,
                        0
                      ) / filteredLawyers.length
                    ).toFixed(1)}`
                  : "0"}
              </div>
              <div className="text-blue-100">Average Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold text-yellow-400">
                {filteredLawyers.length > 0
                  ? `$${Math.min(
                      ...filteredLawyers.map((l) => l.hourlyRateValue)
                    )}+`
                  : "$0"}
              </div>
              <div className="text-blue-100">Starting From</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4 items-end">
                {/* Search */}
                <div className="flex-1 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Search Lawyers
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search by name or specialization..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Sort By
                  </label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-12 w-48 border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-all">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg">
                      <SelectItem
                        value="rating"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        Highest Rated
                      </SelectItem>
                      <SelectItem
                        value="experience"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        Most Experienced
                      </SelectItem>
                      <SelectItem
                        value="price-low"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        Price: Low to High
                      </SelectItem>
                      <SelectItem
                        value="price-high"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        Price: High to Low
                      </SelectItem>
                      <SelectItem
                        value="reviews"
                        className="hover:bg-gray-100 cursor-pointer"
                      >
                        Most Reviews
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  className="h-12 px-6 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Location */}
                    <div className="space-y-2 w-full">
                      <label className="text-sm font-medium text-gray-700">
                        Location
                      </label>
                      <Select
                        value={filterLocation}
                        onValueChange={setFilterLocation}
                      >
                        <SelectTrigger className="w-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-all">
                          <SelectValue placeholder="All locations" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {[
                            ["all", "All locations"],
                            ["new york", "New York, NY"],
                            ["san francisco", "San Francisco, CA"],
                            ["los angeles", "Los Angeles, CA"],
                            ["chicago", "Chicago, IL"],
                            ["seattle", "Seattle, WA"],
                            ["miami", "Miami, FL"],
                            ["boston", "Boston, MA"],
                            ["austin", "Austin, TX"],
                            ["phoenix", "Phoenix, AZ"],
                          ].map(([value, label]) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="hover:bg-gray-100 cursor-pointer"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Experience */}
                    <div className="space-y-2 w-full">
                      <label className="text-sm font-medium text-gray-700">
                        Experience
                      </label>
                      <Select
                        value={filterExperience}
                        onValueChange={setFilterExperience}
                      >
                        <SelectTrigger className="w-full border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-100 transition-all">
                          <SelectValue placeholder="All experience levels" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg">
                          {[
                            ["all", "All experience levels"],
                            ["1-5", "1-5 years"],
                            ["6-10", "6-10 years"],
                            ["11-15", "11-15 years"],
                            ["15+", "15+ years"],
                          ].map(([value, label]) => (
                            <SelectItem
                              key={value}
                              value={value}
                              className="hover:bg-gray-100 cursor-pointer"
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Lawyers List Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900"
            >
              {filteredLawyers.length} {serviceDisplayName}{" "}
              {filteredLawyers.length === 1 ? "Lawyer" : "Lawyers"} Available
            </motion.h2>
          </div>

          {filteredLawyers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12"
            >
              <div className="text-gray-400 mb-4">
                <Users className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No lawyers found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search criteria or filters.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setFilterLocation("");
                  setFilterExperience("");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLawyers.map((lawyer, index) => (
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
                        width={200}
                        height={200}
                        className="w-full h-48 object-fill group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500 text-white">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {lawyer.rating}
                        </Badge>
                      </div>
                      <div className="absolute top-4 left-4">
                        <Badge
                          variant="secondary"
                          className={`${
                            lawyer.availability === "Available today"
                              ? "bg-green-100 text-green-800"
                              : lawyer.availability === "Available this week"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {lawyer.availability}
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
                      <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                        {lawyer.description}
                      </p>

                      {/* Sub-specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {lawyer.subSpecialties.slice(0, 3).map((sub, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="text-xs border border-gray-300"
                          >
                            {sub}
                          </Badge>
                        ))}
                        {lawyer.subSpecialties.length > 3 && (
                          <Badge
                            variant="outline"
                            className="text-xs border border-gray-200"
                          >
                            +{lawyer.subSpecialties.length - 3} more
                          </Badge>
                        )}
                      </div>

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
                        <Link href={`/book/${lawyer.id}`}>
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
          )}
        </div>
      </section>
    </div>
  );
}
