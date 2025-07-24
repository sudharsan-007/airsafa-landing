"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div 
      className="relative"
      onMouseEnter={() => {
        setActive(item);
        setIsOpen(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        setTimeout(() => {
          if (!isOpen) setActive(null);
        }, 100);
      }}
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors py-2 px-3"
      >
        {item}
      </motion.p>
      {active === item && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 0 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 0 }}
          transition={transition}
          className="absolute top-full left-0 pt-2"
          onMouseEnter={() => {
            setIsOpen(true);
            setActive(item);
          }}
          onMouseLeave={() => {
            setIsOpen(false);
            setActive(null);
          }}
        >
          <motion.div
            transition={transition}
            layoutId="active-dropdown"
            className="bg-card backdrop-blur-xl rounded-xl overflow-hidden border border-border shadow-xl"
          >
            <motion.div
              layout
              className="w-max h-full p-4"
            >
              {children}
            </motion.div>
          </motion.div>
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
      className="flex gap-3 p-3 rounded-lg hover:bg-muted/50 transition-all group min-w-[300px]"
    >
      {src && (
        <div className="flex-shrink-0 w-[120px] h-[60px] rounded-md overflow-hidden bg-muted relative">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover"
            sizes="120px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold mb-1 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </Link>
  );
};