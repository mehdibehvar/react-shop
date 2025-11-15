"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckoutForm } from "@/components/forms/checkout-form";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/components/providers/cart-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

function CheckoutSkeleton() {
    return (
        <div className="container py-12">
            <Skeleton className="h-10 w-1/3 mb-8" />
            <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div>
                    <Skeleton className="h-64 w-full" />
                </div>
            </div>
        </div>
    );
}

export function CheckoutClientView() {
    const { isAuthenticated, isLoading } = useAuth();
    const { cartItems, cartTotal } = useCart();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login?redirect=/checkout");
        }
        if (!isLoading && cartItems.length === 0) {
            router.push("/cart");
        }
    }, [isAuthenticated, isLoading, router, cartItems.length]);

    if (isLoading || !isAuthenticated || cartItems.length === 0) {
        return <CheckoutSkeleton />;
    }

    return (
        <div className="bg-secondary/30 dark:bg-background">
            <div className="container py-12 md:py-16">
                <h1 className="text-4xl font-headline font-bold mb-8">Checkout</h1>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <Card className="bg-background shadow-lg">
                        <CardHeader>
                            <CardTitle>Shipping & Payment</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CheckoutForm />
                        </CardContent>
                    </Card>
                    <div className="sticky top-24">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {cartItems.map(({ product, quantity }) => {
                                        const productImage = PlaceHolderImages.find(p => p.id === product.image);
                                        return (
                                            <div key={product.id} className="flex items-center gap-4">
                                                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                                    {productImage && (
                                                        <Image
                                                            src={productImage.imageUrl}
                                                            alt={product.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                            data-ai-hint={productImage.imageHint}
                                                        />
                                                    )}
                                                    <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{quantity}</span>
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-medium">{product.name}</p>
                                                </div>
                                                <p>{formatPrice(product.price * quantity)}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
