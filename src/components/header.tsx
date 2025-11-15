"use client";

import Link from 'next/link';
import { ShoppingCart, User, LogIn, LogOut, Package, Menu, Store } from 'lucide-react';
import { useCart } from '@/components/providers/cart-provider';
import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from '@/components/dark-mode-toggle';
import Logo from '@/components/logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/#new-arrivals', label: 'New Arrivals' },
  { href: '/#best-sellers', label: 'Best Sellers' },
];

export function Header() {
  const { cartCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Logo />
        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium ml-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>
          <DarkModeToggle />
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name || ''} />
                    <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                   <Link href="/account"><User className="mr-2 h-4 w-4" /><span>Account</span></Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                   <Link href="/account"><Package className="mr-2 h-4 w-4" /><span>My Orders</span></Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="hidden md:flex">
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </Link>
            </Button>
          )}

          <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="p-4">
                  <Link href="/" className="flex items-center gap-2 mb-8" onClick={() => setMobileMenuOpen(false)}>
                    <Store className="h-6 w-6 text-primary" />
                    <span className="font-bold text-lg">React Shop</span>
                  </Link>
                  <nav className="grid gap-4 text-lg font-medium">
                    {navLinks.map(link => (
                      <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="transition-colors hover:text-foreground text-muted-foreground">
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  {!isAuthenticated && (
                     <Button asChild className="w-full mt-8" onClick={() => setMobileMenuOpen(false)}>
                       <Link href="/login">
                         <LogIn className="mr-2 h-4 w-4" /> Login
                       </Link>
                     </Button>
                  )}
                </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
