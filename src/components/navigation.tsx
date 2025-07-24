"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MenuBar } from "@/components/ui/glow-menu";
import { Home, Info, Mail, Briefcase, Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

const menuItems = [
  {
    icon: Home,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: Info,
    label: "About",
    href: "/about",
    gradient:
      "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
    iconColor: "text-green-500",
  },
  {
    icon: Briefcase,
    label: "Services",
    href: "/services",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: Mail,
    label: "Contact",
    href: "/contact",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
];

export function Navigation() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine active item based on current path
  const getActiveItem = () => {
    if (pathname === "/") return "Home";
    if (pathname === "/about") return "About";
    if (pathname === "/services") return "Services";
    if (pathname === "/contact") return "Contact";
    return "Home";
  };

  const [activeItem, setActiveItem] = useState<string>(getActiveItem());

  useEffect(() => {
    setActiveItem(getActiveItem());
  }, [pathname]);

  const handleItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation - Floating Centered */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 hidden md:flex items-center gap-4">
        <MenuBar
          items={menuItems}
          activeItem={activeItem}
          onItemClick={handleItemClick}
        />
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl backdrop-blur-lg bg-background/80 border border-border/40 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {/* Mobile Menu Button - Floating Circle */}
      <button
        className="md:hidden fixed top-8 right-8 z-50 w-12 h-12 rounded-full backdrop-blur-lg bg-background/80 border border-border/40 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
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
                  <Link key={item.label} href={item.href} onClick={handleItemClick}>
                    <motion.div
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                        isActive
                          ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-black dark:hover:text-white"
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
                    </motion.div>
                  </Link>
                );
              })}
              {mounted && (
                <motion.button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-black dark:hover:text-white"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}