import Link from 'next/link';
import { Store } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mr-6">
      <div className="bg-primary p-2 rounded-lg">
        <Store className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-bold text-lg hidden sm:inline-block">React Shop</span>
    </Link>
  );
}
