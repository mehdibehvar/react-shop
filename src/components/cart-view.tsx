"use client";

import { useCart } from "@/components/providers/cart-provider";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { formatPrice } from "@/lib/utils";
import { X, ShoppingBag } from "lucide-react";

export function CartView() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

    if (cartCount === 0) {
        return (
            <div className="text-center py-16 border-2 border-dashed rounded-lg bg-secondary/30">
                <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-xl font-semibold">Your cart is empty</h2>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-6">
                {cartItems.map(({ product, quantity }) => {
                    const productImage = PlaceHolderImages.find(p => p.id === product.image);
                    return (
                        <Card key={product.id} className="flex items-center p-4 shadow-sm">
                            <div className="relative h-24 w-24 rounded-md overflow-hidden mr-4 flex-shrink-0">
                                {productImage && (
                                    <Image
                                        src={productImage.imageUrl}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                        data-ai-hint={productImage.imageHint}
                                    />
                                )}
                            </div>
                            <div className="flex-grow min-w-0">
                                <Link href={`/products/${product.slug}`} className="font-semibold hover:text-primary truncate">{product.name}</Link>
                                <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-4 ml-4">
                                <Input
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                    className="w-16 h-9"
                                    aria-label={`Quantity for ${product.name}`}
                                />
                                <p className="font-semibold w-24 text-right hidden sm:block">{formatPrice(product.price * quantity)}</p>
                                <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)} aria-label={`Remove ${product.name} from cart`}>
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
            <div className="lg:col-span-1 sticky top-24">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span className="font-semibold text-primary">Free</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full" size="lg">
                            <Link href="/checkout">Proceed to Checkout</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
