import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  UserPlus,
  PenTool,
  User,
  Briefcase,
  Users,
  Brain,
  X,
  ChevronLeft,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-blue-600",
  },
  {
    title: "Appointments",
    icon: Calendar,
    href: "/admin/appointments",
    color: "text-green-600",
  },
  {
    title: "Add Lawyer",
    icon: UserPlus,
    href: "/admin/add-lawyer",
    color: "text-purple-600",
  },
  {
    title: "Write Blog",
    icon: PenTool,
    href: "/admin/write-blog",
    color: "text-orange-600",
  },
  {
    title: "Edit Profile",
    icon: User,
    href: "/admin/edit-profile",
    color: "text-indigo-600",
  },
  {
    title: "Case Management",
    icon: Briefcase,
    href: "/admin/case-management",
    color: "text-red-600",
  },
  {
    title: "Clients",
    icon: Users,
    href: "/admin/clients",
    color: "text-teal-600",
  },
  {
    title: "Legal AI",
    icon: Brain,
    href: "/admin/legal-ai",
    color: "text-pink-600",
  },
];

export default function AdminSidebar({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const isMobile = window.innerWidth < 1024;


  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: isOpen || window.innerWidth >= 1024 ? 0 : -300,
          width: collapsed ? 80 : 256,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed left-0 top-0 z-50 h-full bg-white border-r border-gray-200 shadow-lg",
          "lg:translate-x-0 lg:static lg:inset-0",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Scale className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    LegalConnect
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center space-x-2">
              {/* Collapse Button - Desktop */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCollapse}
                className="hidden lg:flex h-8 w-8"
              >
                <ChevronLeft
                  className={cn(
                    "h-4 w-4 transition-transform",
                    collapsed && "rotate-180"
                  )}
                />
              </Button>

              {/* Close Button - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => {
                      if (isMobile) onClose();
                    }}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200",
                      "hover:bg-gray-50 group relative",
                      isActive && "bg-blue-50 border-r-2 border-blue-600",
                      collapsed && "justify-center"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 transition-colors",
                        isActive
                          ? "text-blue-600"
                          : "text-gray-600 group-hover:text-gray-900"
                      )}
                    />
                    <AnimatePresence>
                      {!collapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "font-medium transition-colors",
                            isActive
                              ? "text-blue-600"
                              : "text-gray-700 group-hover:text-gray-900"
                          )}
                        >
                          {item.title}
                        </motion.span>
                      )}
                    </AnimatePresence>

                    {/* Tooltip for collapsed state */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                        {item.title}
                      </div>
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="text-center"
                >
                  <p className="text-xs text-gray-500">Admin Panel v2.0</p>
                  <p className="text-xs text-gray-400">© 2024 LegalConnect</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
