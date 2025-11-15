"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCart } from "../providers/cart-provider";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  // Shipping
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zip: z.string().min(5, "ZIP code is required"),
  country: z.string().min(2, "Country is required"),
  // Payment
  cardName: z.string().min(2, "Name on card is required"),
  cardNumber: z.string().regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Invalid card number format"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
});

export function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { clearCart } = useCart();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvc: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    toast({
        title: "Payment Successful!",
        description: "Your order has been placed."
    })
    
    clearCart();
    router.push("/thank-you");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
          <div className="space-y-4">
             <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
             )}/>
             <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem><FormLabel>Address</FormLabel><FormControl><Input placeholder="123 Main St" {...field} /></FormControl><FormMessage /></FormItem>
             )}/>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="zip" render={({ field }) => (
                    <FormItem><FormLabel>ZIP Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
             </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <div className="space-y-4">
            <FormField control={form.control} name="cardName" render={({ field }) => (
                <FormItem><FormLabel>Name on Card</FormLabel><FormControl><Input placeholder="John M Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <FormField control={form.control} name="cardNumber" render={({ field }) => (
                <FormItem><FormLabel>Card Number</FormLabel><FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl><FormMessage /></FormItem>
            )}/>
            <div className="grid grid-cols-2 gap-4">
                <FormField control={form.control} name="expiry" render={({ field }) => (
                    <FormItem><FormLabel>Expiry (MM/YY)</FormLabel><FormControl><Input placeholder="12/28" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
                <FormField control={form.control} name="cvc" render={({ field }) => (
                    <FormItem><FormLabel>CVC</FormLabel><FormControl><Input placeholder="123" {...field} /></FormControl><FormMessage /></FormItem>
                )}/>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CreditCard className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Processing..." : "Pay Now"}
        </Button>
      </form>
    </Form>
  );
}
