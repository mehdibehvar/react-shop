import type { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "./add-to-cart-button";
import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

export function ProductCard({ product }: { product: Product }) {
  const productImage = PlaceHolderImages.find(p => p.id === product.image);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <CardHeader className="p-0 border-b">
        <Link href={`/products/${product.slug}`} className="block aspect-video relative overflow-hidden">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={productImage.imageHint}
            />
          )}
          {product.rating > 4.8 && <Badge className="absolute top-3 right-3" variant="destructive">Best Seller</Badge>}
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg leading-tight mb-2">
          <Link href={`/products/${product.slug}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{product.rating} ({product.reviews.length} reviews)</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
