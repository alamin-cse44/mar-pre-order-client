"use client";

import * as React from "react";
import Shell from "@/components/ui/core/Shell";
import { ArrowRight } from "lucide-react";
import { Product, ProductCard } from "@/components/ProductCard";

/**
 * RecommendedProducts
 * - Header with left & right underline around the title
 * - Subtitle under title; "See more" button below both
 * - Shows 8 cards (2 x 4 on lg+). Responsive on smaller viewports
 * - Uses a **reusable ProductCard** component exported from this file
 * - Dummy data for now; swap with API later
 */
export default function RecommendedProducts() {
  const products: Product[] = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title:
      i % 2 === 0
        ? "High Quality Brown Genuine Carry Bag With Extra Long Name For Demo"
        : "Revitaluxe Hair Oil – Anti Frizz & Shine Booster",
    discount: [35, 20, 30, 15, 25, 10, 18, 22, 28, 12, 8, 40][i % 12],
    daysLeft: [2, 1, 3, 5, 4, 6, 2, 1, 2, 3, 7, 2][i % 12],
    rating: [0, 5, 4.5, 4.2, 3.8, 0, 4.9, 4.1][i % 8],
    reviews: [0, 5, 12, 10, 3, 0, 7, 2][i % 8],
    price: [800, 1500, 990, 1200, 1250, 700, 999, 1750][i % 8],
    mrp: [950, 1800, 1390, 1500, 1700, 900, 1300, 2200][i % 8],
    joined: [10, 25, 18, 12, 26, 8, 30, 15][i % 8],
    target: [20, 75, 30, 25, 35, 20, 60, 20][i % 8],
    max: [300, 200, 250, 150, 180, 200, 180, 220][i % 8],
    image: "/products/demo.svg",
  }));

  return (
    <section className="w-full">
      <Shell>
        {/* Header */}
        <div className="pt-6">
          <div className="flex items-center justify-center gap-4">
            {/* <span className="hidden h-[3px] flex-1 rounded-full bg-primary/50 sm:block" /> */}
            <h2 className="text-center text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              রেকমেন্ডেড পণ্য
            </h2>
            {/* <span className="hidden h-[3px] flex-1 rounded-full bg-primary/50 sm:block" /> */}
          </div>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            আপনার জন্য বিশেষভাবে প্রস্তুতকৃত এক্সক্লুসিভ লিস্ট
          </p>

          {/* See more — always below title & subtitle */}
          <div className="mt-4 flex justify-center">
            <a
              href="#see-more"
              className="inline-flex items-center gap-1 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/15"
            >
              সব দেখুন <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        {/* Grid: 8 visible cards (2 x 4 on lg+) */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Shell>
    </section>
  );
}


