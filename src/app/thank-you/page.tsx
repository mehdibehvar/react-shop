import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Thank You",
    description: "Your order has been placed successfully.",
};

export default function ThankYouPage() {
    return (
        <div className="container flex min-h-[calc(100vh-10rem)] items-center justify-center py-12">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto bg-green-100 dark:bg-green-900/50 rounded-full p-4 w-fit">
                        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                    <CardTitle className="text-3xl font-bold mt-4">Thank You for Your Order!</CardTitle>
                    <CardDescription className="text-lg text-muted-foreground">
                        Your payment was successful and your order is being processed.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p>A confirmation email has been sent to your inbox with the order details. You can view your order history in your account dashboard.</p>
                    <div className="flex justify-center gap-4">
                        <Button asChild>
                            <Link href="/products">Continue Shopping</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/account">Go to My Account</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
