import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProducts() {
    const featured = products.slice(0, 4);

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-headline font-bold">Featured Products</h2>
                    <Button variant="ghost" asChild>
                        <Link href="/products">
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featured.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
