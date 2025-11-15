"use client";

import { ThemeProvider } from "./theme-provider";
import { CartProvider } from "./cart-provider";
import { AuthProvider } from "./auth-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="react-shop-theme">
            <AuthProvider>
                <CartProvider>
                    {children}
                </CartProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
