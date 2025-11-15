"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');
    return (
        <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center text-center overflow-hidden bg-secondary/30">
            {/* Animated background shapes */}
            <div className="absolute inset-0 z-0 opacity-50">
                <div className="shape" style={{ width: '100px', height: '100px', top: '10%', left: '15%', animationDelay: '0s' }}></div>
                <div className="shape" style={{ width: '150px', height: '150px', top: '25%', left: '80%', animationDelay: '2s' }}></div>
                <div className="shape" style={{ width: '75px', height: '75px', top: '70%', left: '5%', animationDelay: '4s' }}></div>
                <div className="shape" style={{ width: '200px', height: '200px', top: '75%', left: '60%', animationDelay: '1s' }}></div>
                <div className="shape" style={{ width: '50px', height: '50px', top: '50%', left: '50%', animationDelay: '3s' }}></div>
            </div>
             
            {/* Background Image Overlay */}
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover z-10 opacity-5 dark:opacity-[0.02]"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            
            {/* Content */}
            <div className="relative z-20 container px-4 md:px-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                        Discover Your Next Favorite Thing
                    </h1>
                    <p className="text-lg text-muted-foreground md:text-xl">
                        High-quality products, curated just for you. Explore our collection and find what you've been looking for.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                            <Link href="/products">Shop Now</Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                            <Link href="#">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
