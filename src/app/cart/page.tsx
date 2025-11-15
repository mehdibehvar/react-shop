import { CartView } from "@/components/cart-view";

export const metadata = {
    title: "Shopping Cart",
    description: "Review your items before checkout.",
};
  
export default function CartPage() {
    return (
        <div className="container py-12">
            <h1 className="text-4xl font-headline font-bold mb-8">Your Cart</h1>
            <CartView />
        </div>
    );
}
