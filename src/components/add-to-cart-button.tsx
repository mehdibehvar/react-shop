"use client";

import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/types";
import { ShoppingBag } from "lucide-react";

export default function AddToCartButton({ 
  product, 
  variant = "default",
  fullWidth = false 
}: { 
  product: Product, 
  variant?: "default" | "secondary" | "outline", 
  fullWidth?: boolean
}) {
  const { addToCart } = useCart();
  
  return (
    <Button 
      variant={variant}
      size="sm"
      className={fullWidth ? "w-full" : ""}
      onClick={(e) => {
        e.preventDefault(); // prevent link navigation if inside a card
        addToCart(product);
      }}
    >
      <ShoppingBag className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  );
}
