"use client";

import { Button } from "@/components/ui/button";
import { MenuItem, HoveredLink, ProductItem } from "@/components/ui/navbar-menu";
import { Menu, X, Sun, Moon, MoveRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export function Header() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();
    const [active, setActive] = useState<string | null>(null);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const navigationItems: Array<{
        title: string;
        href?: string;
        items?: Array<{
            title: string;
            description?: string;
            href: string;
            src?: string;
        }>;
    }> = [
        {
            title: "Home",
            href: "/",
        },
        {
            title: "Services",
            items: [
                {
                    title: "Flight Services",
                    description: "Scheduled flights connecting remote communities",
                    href: "/services#flights",
                    src: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=280&h=140&fit=crop",
                },
                {
                    title: "Charter Services",
                    description: "Private charter flights for your specific needs",
                    href: "/services#charter",
                    src: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=280&h=140&fit=crop",
                },
                {
                    title: "Cargo Services",
                    description: "Reliable cargo transportation to any destination",
                    href: "/services#cargo",
                    src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=280&h=140&fit=crop",
                },
                {
                    title: "Maintenance",
                    description: "Professional aircraft maintenance and servicing",
                    href: "/services#maintenance",
                    src: "https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=280&h=140&fit=crop",
                },
            ],
        },
        {
            title: "Company",
            items: [
                {
                    title: "About us",
                    href: "/about",
                },
                {
                    title: "Our Fleet",
                    href: "/about#fleet",
                },
                {
                    title: "Safety",
                    href: "/about#safety",
                },
                {
                    title: "Contact us",
                    href: "/contact",
                },
            ],
        },
    ];

    const [isOpen, setOpen] = useState(false);
    
    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div 
                    className="justify-start items-center gap-6 lg:flex hidden flex-row"
                    onMouseLeave={() => setActive(null)}
                >
                    {navigationItems.map((item) => (
                        item.href ? (
                            <Link 
                                key={item.title}
                                href={item.href}
                                className={`${
                                    pathname === item.href 
                                        ? "font-semibold text-foreground" 
                                        : "text-muted-foreground"
                                } hover:text-foreground transition-colors`}
                            >
                                {item.title}
                            </Link>
                        ) : (
                            <MenuItem 
                                key={item.title}
                                setActive={setActive} 
                                active={active} 
                                item={item.title}
                            >
                                {item.title === "Services" ? (
                                    <div className="grid grid-cols-2 gap-4 p-2">
                                        {item.items?.map((subItem) => (
                                            <ProductItem
                                                key={subItem.title}
                                                title={subItem.title}
                                                description={subItem.description}
                                                href={subItem.href}
                                                src={subItem.src}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex flex-col space-y-3 text-sm min-w-[240px]">
                                        {item.items?.map((subItem) => (
                                            <HoveredLink key={subItem.title} href={subItem.href}>
                                                {subItem.title}
                                            </HoveredLink>
                                        ))}
                                    </div>
                                )}
                            </MenuItem>
                        )
                    ))}
                </div>
                <div className="flex lg:justify-center">
                    <p className="font-bold text-2xl text-foreground">Airsafa</p>
                </div>
                <div className="flex justify-end w-full gap-4">
                    <Button 
                        variant="ghost" 
                        className="hidden md:inline text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Blogs
                    </Button>
                    <div className="border-r hidden md:inline border-border h-5"></div>
                    <Button 
                        variant="outline" 
                        className="hidden md:inline"
                    >
                        Book Flights
                    </Button>
                    {mounted && (
                        <Button
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="hidden md:inline"
                        >
                            {theme === "dark" ? (
                                <>
                                    <Sun className="h-4 w-4 mr-2" />
                                    Light Mode
                                </>
                            ) : (
                                <>
                                    <Moon className="h-4 w-4 mr-2" />
                                    Dark Mode
                                </>
                            )}
                        </Button>
                    )}
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button 
                        variant="ghost" 
                        onClick={() => setOpen(!isOpen)}
                        className="p-2 text-muted-foreground hover:text-foreground"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 flex flex-col w-full right-0 bg-background/95 backdrop-blur-md shadow-xl py-4 container gap-8 border border-border rounded-lg">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                onClick={() => setOpen(false)}
                                                className="flex justify-between items-center"
                                            >
                                                <span className="text-lg text-foreground">{item.title}</span>
                                                <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                                            </Link>
                                        ) : (
                                            <p className="text-lg font-semibold text-foreground">{item.title}</p>
                                        )}
                                        {item.items &&
                                            item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    onClick={() => setOpen(false)}
                                                    className="flex justify-between items-center pl-4"
                                                >
                                                    <div className="flex-1">
                                                        <p className="font-medium text-foreground">{subItem.title}</p>
                                                        {subItem.description && (
                                                            <p className="text-sm text-muted-foreground">{subItem.description}</p>
                                                        )}
                                                    </div>
                                                    <MoveRight className="w-4 h-4 stroke-1" />
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            ))}
                            <div className="border-t border-border pt-4 flex flex-col gap-4">
                                <Button variant="outline" className="w-full">Book Flights</Button>
                                <Button variant="ghost" className="w-full">Blogs</Button>
                                {mounted && (
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-start"
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    >
                                        {theme === "dark" ? (
                                            <>
                                                <Sun className="h-5 w-5 mr-2" />
                                                Light Mode
                                            </>
                                        ) : (
                                            <>
                                                <Moon className="h-5 w-5 mr-2" />
                                                Dark Mode
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}