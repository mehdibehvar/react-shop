import { products } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

export const metadata = {
  title: "All Products",
  description: "Browse our collection of high-quality products.",
};

export default function ProductsPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold mb-2">All Products</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Explore our curated selection of top-tier gadgets, accessories, and lifestyle products.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
