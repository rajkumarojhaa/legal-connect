import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import lady from '../assets/images/lady.jpg';
import blog2 from '../assets/images/blog2.jpg';
import blog3 from '../assets/images/blog3.jpg';
import blog4 from '../assets/images/blog4.jpg';
import blog5 from '../assets/images/blog5.jpg';
import blog6 from '../assets/images/blog6.jpg';

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Rights in Family Law Cases",
    excerpt: "A comprehensive guide to navigating family law disputes and understanding your legal rights.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Family Law",
    image: lady,
    featured: true,
  },
  {
    id: 2,
    title: "Business Formation: LLC vs Corporation",
    excerpt: "Learn the key differences between LLCs and corporations to make the right choice for your business.",
    author: "Michael Chen",
    date: "March 12, 2024",
    readTime: "7 min read",
    category: "Business Law",
    image: blog2,
    featured: false,
  },
  {
    id: 3,
    title: "Criminal Defense: What to Do When Arrested",
    excerpt: "Essential steps to take if you're arrested and how to protect your rights during the process.",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Criminal Law",
    image: blog3,
    featured: false,
  },
  {
    id: 4,
    title: "Real Estate Transactions: Common Pitfalls",
    excerpt: "Avoid these common mistakes when buying or selling property to ensure a smooth transaction.",
    author: "David Thompson",
    date: "March 8, 2024",
    readTime: "8 min read",
    category: "Real Estate Law",
    image: blog4,
    featured: false,
  },
  {
    id: 5,
    title: "Workplace Discrimination: Know Your Rights",
    excerpt: "Understanding workplace discrimination laws and how to file a complaint if you experience it.",
    author: "Lisa Wang",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Employment Law",
    image: blog5,
    featured: false,
  },
  {
    id: 6,
    title: "Personal Injury Claims: A Step-by-Step Guide",
    excerpt: "Everything you need to know about filing a personal injury claim and maximizing your compensation.",
    author: "Robert Martinez",
    date: "March 3, 2024",
    readTime: "9 min read",
    category: "Civil Law",
    image: blog6,
    featured: false,
  },
];

const BlogPage = () => {
  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

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
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Legal Blog</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Stay informed with the latest legal insights, tips, and updates from our expert attorneys
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Article</h2>
            <Card className="overflow-hidden shadow-2xl border-0 hover:shadow-3xl transition-shadow duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-yellow-500 text-black font-semibold">Featured</Badge>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col justify-center">
                  <Badge variant="secondary" className="w-fit mb-4 bg-sky-100 text-sky-800">
                    {featuredPost.category}
                  </Badge>
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <User className="w-4 h-4 mr-2" />
                    <span className="mr-4">{featuredPost.author}</span>
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="mr-4">{featuredPost.date}</span>
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button className="w-fit bg-blue-600 hover:bg-blue-700 text-white">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <div className="relative h-48">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="secondary" className="bg-sky-100 text-sky-800">{post.category}</Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <User className="w-4 h-4 mr-2" />
                      <span className="mr-4">{post.author}</span>
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{post.readTime}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          >
            Load More Articles
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
