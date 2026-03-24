import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";
function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-50/50 dark:bg-[#09090f] min-h-screen transition-colors">
      <div className="md:w-64 h-screen fixed z-20">
        <SideBar/>
      </div>
      <div className="md:ml-64">
        <Header/>
        <div className="p-8 lg:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
