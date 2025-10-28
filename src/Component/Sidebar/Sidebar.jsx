"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Users, Package, Home , Settings } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Leads", href: "/dashboard/leads", icon: Users, color: "blue" },
    { name: "Products", href: "/dashboard/products", icon: Package, color: "purple" },
    { name: "Home", href: "/", icon: Home, color: "purple" },
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive 
        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" 
        : "hover:bg-blue-50 hover:text-blue-600",
      purple: isActive 
        ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" 
        : "hover:bg-purple-50 hover:text-purple-600",
      green: isActive 
        ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg" 
        : "hover:bg-green-50 hover:text-green-600",
      orange: isActive 
        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg" 
        : "hover:bg-orange-50 hover:text-orange-600",
    };
    return colors[color];
  };

  return (
    <>
      <header className="flex justify-between items-center h-[70px] px-4 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-lg md:hidden sticky top-0 z-50 h-10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none hover:bg-white/20 p-2 rounded-lg transition-all"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <div className='w-20'>
                <img src="https://i.ibb.co/JyLk2f0/logo.png" alt="" />
            </div>
          </div>
          <h1 className="text-lg font-bold text-white">CRM Dashboard</h1>
        </div>
      </header>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      <aside
        className={`fixed bg-white shadow-xl w-72 md:w-64 md:min-h-screen z-40 transform transition-all duration-300 ease-in-out h-full
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="bg-gradient-to-br hidden md:block  from-indigo-500 to-purple-600 px-6 py-6 border-b border-purple-400">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                 <div className='w-20'>
                <img src="https://i.ibb.co/JyLk2f0/logo.png" alt="" />
            </div>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">CRM</h2>
                <p className="text-xs text-purple-200">Dashboard</p>
              </div>
            </div>
            <button
              className="md:hidden text-white hover:bg-white/20 p-2 rounded-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <nav className="flex flex-col p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium transition-all duration-200 ${getColorClasses(
                  item.color,
                  isActive
                )} ${isActive ? "scale-105" : "hover:scale-105"}`}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;