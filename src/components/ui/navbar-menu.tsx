"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const { theme } = useTheme();
  
  return (
    <div 
      onMouseEnter={() => setActive(item)} 
      onMouseLeave={() => setActive(null)}
      className="relative"
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors py-2"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-3">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-card backdrop-blur-xl rounded-2xl overflow-hidden border border-border shadow-xl"
                onMouseEnter={() => setActive(item)}
                onMouseLeave={() => setActive(null)}
              >
                <motion.div
                  layout
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export const HoveredLink = ({ children, href, ...rest }: { 
  children: React.ReactNode;
  href: string;
  [key: string]: any;
}) => {
  return (
    <Link
      href={href}
      {...rest}
      className="text-muted-foreground hover:text-foreground transition-colors block py-2 px-3 rounded-lg hover:bg-muted"
    >
      {children}
    </Link>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src?: string;
}) => {
  return (
    <Link 
      href={href} 
      className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-all group"
    >
      {src && (
        <div className="flex-shrink-0 w-[140px] h-[70px] rounded-md overflow-hidden bg-muted relative">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            sizes="140px"
          />
        </div>
      )}
      <div className="flex-1">
        <h4 className="text-base font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};