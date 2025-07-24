"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ThemeDropdown() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const themes = [
    { 
      value: "light", 
      label: "Light", 
      icon: Sun,
      description: "Light theme"
    },
    { 
      value: "dark", 
      label: "Dark", 
      icon: Moon,
      description: "Dark theme"
    },
    { 
      value: "system", 
      label: "System", 
      icon: Monitor,
      description: "System preference"
    },
  ];

  const currentTheme = themes.find(t => t.value === theme) || themes[2];
  const Icon = resolvedTheme === "dark" ? Moon : Sun;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 w-9"
      >
        <Icon className="h-4 w-4" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-36 origin-top-right"
          >
            <div className="rounded-lg border border-border bg-background p-1 shadow-lg">
              {themes.map((themeOption) => {
                const isActive = theme === themeOption.value;
                const ThemeIcon = themeOption.icon;
                
                return (
                  <button
                    key={themeOption.value}
                    onClick={() => {
                      // Add transition class for smooth theme change
                      document.documentElement.classList.add('transitioning');
                      setTheme(themeOption.value);
                      setIsOpen(false);
                      
                      // Remove transition class after animation
                      setTimeout(() => {
                        document.documentElement.classList.remove('transitioning');
                      }, 300);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
                      isActive 
                        ? "bg-accent text-accent-foreground" 
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <ThemeIcon className="h-4 w-4" />
                    <span>{themeOption.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="theme-indicator"
                        className="ml-auto"
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-accent-foreground"
                        >
                          <path
                            d="M10 3L4.5 8.5L2 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}