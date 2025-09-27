/* ---------------------------------------------------------------------- */
/* Reusable ProductCard component                                          */
/* ---------------------------------------------------------------------- */

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Product {
  id: number;
  title: string;
  discount: number; // percent
  daysLeft: number;
  rating: number; // 0..5
  reviews: number;
  price: number;
  mrp: number;
  joined: number; // joined count
  target: number; // target to reach
  max: number; // max cap
  image: string;
}

export function ProductCard({ product }: { product: Product }) {
  const p = product;
  const progress = Math.min(100, Math.round((p.joined / p.target) * 100));

  return (
    <Link href={`/product-details/${p.id}`} className="block">
      <article className="group relative rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-card">
        {/* Media */}
        <div className="relative overflow-hidden rounded-2xl rounded-b-none">
          {/* Badges */}
          <div className="pointer-events-none absolute left-2 top-2 z-10 flex gap-2">
            <Badge className="bg-red-600 text-white">{p.discount}% OFF</Badge>
            <Badge className="bg-orange-500 text-white">
              {p.daysLeft} days left
            </Badge>
          </div>
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={p.image}
              alt={p.title}
              fill
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
              priority={p.id <= 4}
            />
          </div>
        </div>

        {/* Content (fixed heights to keep cards equal) */}
        <div className="flex h-[250px] flex-col justify-between p-4">
          {/* Title */}
          <h3 className="min-h-[3.2rem] text-sm font-semibold leading-5 text-foreground line-clamp-2">
            {p.title}
          </h3>

          {/* Rating */}
          <div className="mt-1 flex items-center gap-1 text-amber-500">
            {renderStars(p.rating)}
            <span className="ml-1 text-xs text-muted-foreground">
              ({p.reviews})
            </span>
          </div>

          {/* Group progress */}
          <div className="mt-2 space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1 text-foreground/80">
              <Users className="size-4 text-primary" />
              <span>
                {p.joined}/{p.target} joined
              </span>
              <span className="ml-auto text-primary">
                (Max: {p.max}) {progress}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-sm font-extrabold text-orange-400">
              মূল্য: {p.price.toLocaleString("bn-BD")} টাকা
            </span>
            <span className="text-xs text-muted-foreground line-through">
              {p.mrp.toLocaleString("bn-BD")} টাকা
            </span>
          </div>

          {/* CTA */}
          <Link
            href={`/product-details/${p.id}`}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 cursor-pointer"
          >
            <ShoppingCart className="size-4" /> অর্ডার করুন
          </Link>
        </div>
      </article>
    </Link>
  );
}

/* ------------------------------- Helpers -------------------------------- */
function Badge({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-1 text-[11px] font-bold shadow",
        className
      )}
    >
      {children}
    </span>
  );
}

function renderStars(rating: number) {
  const stars = [] as React.ReactNode[];
  for (let i = 1; i <= 5; i++) {
    const filled = rating >= i - 0.25; // simple fill logic
    const half = !filled && rating >= i - 0.75;
    stars.push(
      <span key={i} className="relative inline-flex">
        <Star
          className="size-4 text-amber-400"
          strokeWidth={filled ? 0 : 2}
          fill={filled ? "currentColor" : "none"}
        />
        {half && (
          <span
            className="absolute inset-0 overflow-hidden"
            style={{ width: "50%" }}
          >
            <Star
              className="size-4 text-amber-400"
              strokeWidth={0}
              fill="currentColor"
            />
          </span>
        )}
      </span>
    );
  }
  return stars;
}
