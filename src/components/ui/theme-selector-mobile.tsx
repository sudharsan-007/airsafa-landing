"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeSelectorMobile() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-muted-foreground px-2">Theme</p>
      <div className="flex gap-2">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon;
          const isActive = theme === themeOption.value;
          
          return (
            <button
              key={themeOption.value}
              onClick={() => {
                document.documentElement.classList.add('transitioning');
                setTheme(themeOption.value);
                setTimeout(() => {
                  document.documentElement.classList.remove('transitioning');
                }, 300);
              }}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors",
                isActive 
                  ? "border-primary bg-primary/10 text-primary" 
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              <span>{themeOption.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}