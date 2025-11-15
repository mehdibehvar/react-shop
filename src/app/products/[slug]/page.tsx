import { products } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star, MessageCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import AddToCartButton from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import type { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find(p => p.slug === params.slug);
 
  if (!product) {
    return {
      title: 'Product not found',
    }
  }
 
  return {
    title: product.name,
    description: product.description,
  }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  const productImage = PlaceHolderImages.find(p => p.id === product.image);
  const relatedProducts = products.filter(p => product.relatedProductIds.includes(p.id)).slice(0, 4);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  return (
    <div className="bg-secondary/30 dark:bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <Card className="overflow-hidden shadow-lg">
              {productImage && (
                <div className="aspect-video relative">
                  <Image 
                    src={productImage.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={productImage.imageHint}
                    priority
                  />
                </div>
              )}
            </Card>
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-headline font-bold">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground/30'}`} />
                ))}
              </div>
              <span className="text-muted-foreground">{product.rating} ({product.reviews.length} reviews)</span>
            </div>
            <p className="text-3xl font-semibold text-primary">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground leading-relaxed">{product.longDescription}</p>
            <div className="w-full sm:w-1/2">
                <AddToCartButton product={product} variant="default" fullWidth />
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-3">
                <h2 className="text-3xl font-bold mb-8 flex items-center gap-3"><MessageCircle className="w-7 h-7 text-primary"/> Customer Reviews</h2>
                {product.reviews.length > 0 ? (
                  <div className="space-y-8">
                    {product.reviews.map(review => (
                      <Card key={review.id} className="bg-secondary/30">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                              <div className="flex items-center gap-4">
                                  <Avatar>
                                      <AvatarImage src={`https://avatar.vercel.sh/${review.author}.png`} />
                                      <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <CardTitle className="text-base">{review.author}</CardTitle>
                                      <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                                  </div>
                              </div>
                              <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted-foreground/30'}`} />
                                  ))}
                              </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-foreground/80">{review.text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No reviews for this product yet.</p>
                )}
            </div>
          </div>
  
          <Separator className="my-12 md:my-16" />
  
          <div>
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(related => (
                    <ProductCard key={related.id} product={related} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}
