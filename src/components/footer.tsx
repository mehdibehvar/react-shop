import Link from 'next/link';
import Logo from '@/components/logo';
import { Input } from './ui/input';
import { Button } from './ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-secondary/50 dark:bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 items-start col-span-1 md:col-span-2">
            <Logo />
            <p className="text-sm text-muted-foreground max-w-md">
              Discover the best products, curated for you. Quality and customer satisfaction are our top priorities.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2 mt-2">
              <Input type="email" placeholder="Email for newsletter" />
              <Button type="submit" variant="secondary">Subscribe</Button>
            </form>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 col-span-1 md:col-span-2 text-sm">
            <div className="grid gap-2">
              <h3 className="font-semibold">Shop</h3>
              <Link href="/products" className="text-muted-foreground hover:text-foreground">All Products</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">New Arrivals</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Best Sellers</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Support</h3>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Contact Us</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Shipping & Returns</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Company</h3>
              <Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-semibold">Legal</h3>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} React Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
