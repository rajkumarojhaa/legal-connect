import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/admin-sidebar";
import AdminTopNav from "../components/admin-top-nav";
import { Outlet } from "react-router-dom";

const MemoizedAdminLayout = React.memo(AdminLayout);
function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024
  );
  const [collapsed, setCollapsed] = useState(() => false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth >= 1024;
      setIsLargeScreen(isLarge);

      if (isLarge) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false); // close sidebar when going to small screen
        setCollapsed(false); // reset collapse on small screens
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarWidth = isLargeScreen
    ? sidebarOpen
      ? collapsed
        ? 80
        : 256
      : 0
    : 0;

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col relative">
  {/* Top Navigation */}
  <div
    className="fixed top-0 right-0 h-16 z-20 bg-white shadow-md border-b transition-all duration-300"
    style={{
      left: isLargeScreen ? `${sidebarWidth}px` : 0,
      width: isLargeScreen ? `calc(100% - ${sidebarWidth}px)` : "100%",
    }}
  >
    <AdminTopNav onMenuClick={() => setSidebarOpen(true)} />
  </div>

  {/* Layout Content */}
  <div className="flex flex-1  relative overflow-hidden">
    {/* Sidebar */}
    {isLargeScreen && sidebarOpen && (
      <div
        className="transition-all duration-300 bg-white border-r shadow h-full"
        style={{ width: sidebarWidth }}
      >
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </div>
    )}

    {/* Sidebar Overlay (Mobile) */}
    {!isLargeScreen && sidebarOpen && (
      <div className="fixed inset-0 z-30 flex">
        <div className="w-64 bg-white h-full shadow-lg">
          <AdminSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            collapsed={false}
            onToggleCollapse={() => {}}
          />
        </div>
        <div
          className="flex-1 bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      </div>
    )}

    {/* Scrollable Main Content */}
    <main className="flex-1 h-full  overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100">
      <Outlet />
    </main>
  </div>
</div>

  );
}

export default MemoizedAdminLayout;
