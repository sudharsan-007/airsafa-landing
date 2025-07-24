"use client";

import { Button } from "@/components/ui/button";
import { NavigationDropdown } from "@/components/ui/navigation-dropdown";
import { ThemeDropdown } from "@/components/ui/theme-dropdown";
import { ThemeSelectorMobile } from "@/components/ui/theme-selector-mobile";
import { Menu, X, MoveRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
    const pathname = usePathname();
    const [isOpen, setOpen] = useState(false);

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
    
    return (
        <header className="w-full z-50 fixed top-0 left-0 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="container relative mx-auto px-4 md:px-6 min-h-16 md:min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <nav className="justify-start items-center gap-1 lg:flex hidden flex-row">
                    {navigationItems.map((item) => (
                        item.href ? (
                            <Link 
                                key={item.title}
                                href={item.href}
                                className={`${
                                    pathname === item.href 
                                        ? "font-semibold text-foreground" 
                                        : "text-muted-foreground"
                                } hover:text-foreground transition-colors py-2 px-3`}
                            >
                                {item.title}
                            </Link>
                        ) : item.items ? (
                            <NavigationDropdown
                                key={item.title}
                                trigger={item.title}
                                items={item.items}
                                type={item.title === "Services" ? "grid" : "list"}
                                align="left"
                            />
                        ) : null
                    ))}
                </nav>
                <div className="flex lg:justify-center flex-1 lg:flex-none">
                    <Link href="/" className="font-bold text-xl md:text-2xl text-foreground hover:text-primary transition-colors">
                        Airsafa
                    </Link>
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
                    <div className="hidden md:block">
                        <ThemeDropdown />
                    </div>
                </div>
                <div className="flex lg:hidden items-center justify-end">
                    <Button 
                        variant="ghost" 
                        onClick={() => setOpen(!isOpen)}
                        className="p-2 h-auto text-muted-foreground hover:text-foreground"
                        size="icon"
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <>
                            <div 
                                className="fixed inset-0 bg-background/80 backdrop-blur-sm lg:hidden" 
                                onClick={() => setOpen(false)}
                            />
                            <div className="fixed top-16 left-4 right-4 bg-background border border-border rounded-lg shadow-xl overflow-hidden lg:hidden">
                                <div className="p-6 flex flex-col gap-6 max-h-[calc(100vh-100px)] overflow-y-auto">
                                {navigationItems.map((item, index) => (
                                    <div key={item.title} className="space-y-2">
                                        {index > 0 && <div className="border-t border-border" />}
                                        {item.href ? (
                                            <Link
                                                href={item.href}
                                                onClick={() => setOpen(false)}
                                                className="flex justify-between items-center py-2 px-2 rounded-lg hover:bg-muted transition-colors"
                                            >
                                                <span className="text-base font-medium">{item.title}</span>
                                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                                            </Link>
                                        ) : (
                                            <>
                                                <p className="text-base font-semibold px-2 py-1">{item.title}</p>
                                                <div className="space-y-1">
                                                    {item.items?.map((subItem) => (
                                                        <Link
                                                            key={subItem.title}
                                                            href={subItem.href}
                                                            onClick={() => setOpen(false)}
                                                            className="flex justify-between items-center py-2 px-4 rounded-lg hover:bg-muted transition-colors"
                                                        >
                                                            <span className="text-sm">{subItem.title}</span>
                                                            <MoveRight className="w-4 h-4 text-muted-foreground" />
                                                        </Link>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                                <div className="border-t border-border pt-4 flex flex-col gap-4">
                                    <Button variant="outline" className="w-full">Book Flights</Button>
                                    <Button variant="ghost" className="w-full">Blogs</Button>
                                    <ThemeSelectorMobile />
                                </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}