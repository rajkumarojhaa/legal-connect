import React from "react";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Search,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import img1 from '../assets/images/img1.jpg';
import law1 from '../assets/images/law1.jpg';
import law2 from '../assets/images/law2.jpg';
import law3 from '../assets/images/law3.jpg';
import law4 from '../assets/images/law4.jpg';

// import "./HomePage.css";

const lawyers = [
  {
    id: 1,
    name: "Sarah Khan",
    specialty: "Family Law",
    experience: "12 years",
    rating: 4.9,
    reviews: 156,
    location: "Banglore",
    image: law1,
    hourlyRate: "$350",
  },
  {
    id: 2,
    name: "Michael Dsouza",
    specialty: "Business Law",
    experience: "8 years",
    rating: 4.8,
    reviews: 203,
    location: "Noida",
    image: law3,
    hourlyRate: "$400",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    specialty: "Criminal Law",
    experience: "15 years",
    rating: 4.9,
    reviews: 189,
    location: "Pune",
    image: law2,
    hourlyRate: "$450",
  },
  {
    id: 4,
    name: "David Thompson",
    specialty: "Real Estate Law",
    experience: "10 years",
    rating: 4.7,
    reviews: 142,
    location: "Delhi",
    image: law4,
    hourlyRate: "$320",
  },
];

const legalServices = [
  {
    title: "Family Law",
    description: "Divorce, custody, adoption, and family disputes",
    icon: "👨‍👩‍👧‍👦",
    cases: "500+ cases",
  },
  {
    title: "Business Law",
    description: "Corporate law, contracts, and business formation",
    icon: "🏢",
    cases: "300+ cases",
  },
  {
    title: "Criminal Law",
    description: "Defense for criminal charges and legal representation",
    icon: "⚖️",
    cases: "400+ cases",
  },
  {
    title: "Real Estate Law",
    description: "Property transactions, disputes, and legal advice",
    icon: "🏠",
    cases: "250+ cases",
  },
  {
    title: "Employment Law",
    description: "Workplace disputes, discrimination, and labor issues",
    icon: "💼",
    cases: "200+ cases",
  },
  {
    title: "Civil Law",
    description: "Personal injury, civil disputes, and litigation",
    icon: "📋",
    cases: "350+ cases",
  },
];

export default function Home() {
  return (
    <div className=" max-w-full overflow-hidden">
      {/* --- Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-x-hidden ">

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                x: [0, 50, 0],
                y: [0, -50, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Find Your{" "}
              <span className="text-yellow-400 block">Perfect Lawyer</span>
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Connect with experienced legal professionals who understand your
              needs.
            </p>
            {/* <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-yellow-500 text-black font-semibold px-8 py-4">
                Find a Lawyer
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-white text-white">
                Learn More
              </Button>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <img
              src={img1}
              alt="Legal Professional"
              className="w-full max-w-md rounded-2xl shadow-2xl"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-400 rounded-full opacity-20"
            />
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white relative overflow-x-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Find the Right Lawyer
              </h2>
              <p className="text-xl text-gray-600">
                Search through our network of qualified legal professionals
              </p>
            </div>

            <Card className="p-8 shadow-xl break-words border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Lawyer Name
                  </label>
                  <Input placeholder="Search by name..." className="pl-10 h-12 shadow focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 border-0 bg-white rounded-lg" />
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
                      <SelectItem value="family" className="hover:bg-indigo-300 ">Family Law</SelectItem>
                      <SelectItem value="business" className="hover:bg-indigo-300 ">Business Law</SelectItem>
                      <SelectItem value="criminal" className="hover:bg-indigo-300 ">Criminal Law</SelectItem>
                      <SelectItem value="real-estate" className="hover:bg-indigo-300 ">
                        Real Estate Law
                      </SelectItem>
                      <SelectItem value="employment" className="hover:bg-indigo-300 ">Employment Law</SelectItem>
                      <SelectItem value="civil" className="hover:bg-indigo-300 ">Civil Law</SelectItem>
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
                      <SelectItem value="1-3" className="hover:bg-indigo-300 ">1-3 years</SelectItem>
                      <SelectItem value="4-7" className="hover:bg-indigo-300 ">4-7 years</SelectItem>
                      <SelectItem value="8-12" className="hover:bg-indigo-300 ">8-12 years</SelectItem>
                      <SelectItem value="13+" className="hover:bg-indigo-300">13+ years</SelectItem>
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
                      <SelectItem value="dl" className="hover:bg-indigo-300">Delhi</SelectItem>
                      <SelectItem value="bng" className="hover:bg-indigo-300">Banglore</SelectItem>
                      <SelectItem value="pu" className="hover:bg-indigo-300">Pune</SelectItem>
                      <SelectItem value="ptn" className="hover:bg-indigo-300">Patna</SelectItem>
                      <SelectItem value="no" className="hover:bg-indigo-300">Noida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                  <Search className="mr-2 h-5 w-5" />
                  Search
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Get Your Lawyer Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Your Lawyer
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our top-rated lawyers and find the perfect match
              for your legal needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {lawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full w-full break-words hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={lawyer.image || "/placeholder.svg"}
                      alt={lawyer.name}
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
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
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {lawyer.experience} experience
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">{lawyer.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">{lawyer.reviews} reviews</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        {lawyer.hourlyRate}/hr
                      </span>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/find-lawyer">
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4"
              >
                View All Lawyers
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Legal Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get Legal Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive legal services across various practice areas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {legalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full w-full overflow-hidden break-words hover:shadow-2xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <Badge variant="secondary" className="mb-6">
                      {service.cases}
                    </Badge>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white group-hover:bg-yellow-500 group-hover:text-black transition-colors duration-300">
                      Book Lawyer
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get in touch with our team for any questions or legal
              consultations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-8">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-4 text-yellow-400" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-blue-100">+91 6203568984</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 mr-4 text-yellow-400" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-blue-100">contact@legalconnect.com</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-4 text-yellow-400" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-blue-100">
                      123 Near redRose School, Banglore
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6 text-white">
                    Send us a Message
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        placeholder="First Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                      <Input
                        placeholder="Last Name"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                      />
                    </div>
                    <Input
                      placeholder="Email"
                      type="email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Input
                      placeholder="Subject"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <textarea
                      placeholder="Your message..."
                      rows={4}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
