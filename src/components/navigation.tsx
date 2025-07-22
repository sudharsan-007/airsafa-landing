"use client";

import { useState } from "react";
import { MenuBar } from "@/components/ui/glow-menu";
import { Home, Info, Mail, Briefcase, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "#home",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: Info,
    label: "About",
    href: "#about",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: Briefcase,
    label: "Services",
    href: "#services",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: Mail,
    label: "Contact",
    href: "#contact",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
];

export function Navigation() {
  const [activeItem, setActiveItem] = useState<string>("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleItemClick = (label: string, href: string) => {
    setActiveItem(label);
    setIsMobileMenuOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation - Floating Centered */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <MenuBar
          items={menuItems}
          activeItem={activeItem}
          onItemClick={(label) => {
            const item = menuItems.find(item => item.label === label);
            if (item) handleItemClick(label, item.href);
          }}
        />
      </div>

      {/* Mobile Menu Button - Floating Circle */}
      <button
        className="md:hidden fixed top-8 right-8 z-50 w-12 h-12 rounded-full backdrop-blur-lg bg-background/80 border border-border/40 flex items-center justify-center hover:bg-gray-800 transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </button>

      {/* Mobile Menu - Floating Design */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-8 z-40 md:hidden"
          >
            <div className="backdrop-blur-lg bg-background/80 rounded-2xl border border-border/40 shadow-xl p-4 min-w-[200px]">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.label === activeItem;

                return (
                  <motion.button
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      handleItemClick(item.label, item.href);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        isActive ? item.iconColor : ""
                      }`}
                    />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}