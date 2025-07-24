"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DropdownMenuItem {
  title: string;
  description?: string;
  href: string;
  src?: string;
}

interface NavigationDropdownProps {
  trigger: string;
  items: DropdownMenuItem[];
  align?: "left" | "center" | "right";
  type?: "grid" | "list";
}

export function NavigationDropdown({
  trigger,
  items,
  align = "center",
  type = "list",
}: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // Adjust position for viewport constraints
  React.useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Check if dropdown goes off right edge
      if (rect.right > viewportWidth - 20) {
        dropdownRef.current.style.left = 'auto';
        dropdownRef.current.style.right = '0';
        dropdownRef.current.style.transform = 'none';
      }
    }
  }, [isOpen]);

  const alignmentClasses = {
    left: "left-0",
    center: "left-1/2 -translate-x-1/2",
    right: "right-0",
  };

  return (
    <div
      className="relative flex items-center h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="text-muted-foreground hover:text-foreground transition-colors h-full px-3 flex items-center">
        {trigger}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute dropdown-frosted rounded-xl border border-border shadow-lg overflow-hidden z-50",
              alignmentClasses[align],
              type === "grid" ? "w-[600px] max-w-[90vw]" : "w-[240px]"
            )}
            style={{ top: "calc(100% + 1px)" }}
          >
            <div className={cn(
              "p-2",
              type === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-1" : "flex flex-col gap-1"
            )}>
              {items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    "rounded-lg transition-all",
                    type === "grid" 
                      ? "flex gap-3 p-3 hover:bg-muted/80 group"
                      : "block px-4 py-2 hover:bg-muted/80 text-sm"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {type === "grid" && item.src ? (
                    <>
                      <div className="flex-shrink-0 w-[100px] h-[60px] rounded-md overflow-hidden bg-muted relative">
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </h4>
                        {item.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <span className={cn(
                      type === "list" ? "text-muted-foreground hover:text-foreground" : ""
                    )}>
                      {item.title}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}