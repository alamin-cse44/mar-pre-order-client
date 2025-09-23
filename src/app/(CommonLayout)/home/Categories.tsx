"use client";

import * as React from "react";
import Image from "next/image";
import Shell from "@/components/ui/core/Shell";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CategoryItem {
  label: string;
  image: string;
}

/**
 * CategoriesCarousel (auto + manual)
 * - Shows 5 items at once (desktop) and slides by ONE item every 5s.
 * - Manual controls: arrow buttons + clickable dots.
 * - Uniform, more compact cards to match the reference.
 */
export default function Categories() {
  const VISIBLE = 5;
  const INTERVAL = 5000; // 5s

  // Dummy data (replace with API later)
  const items: CategoryItem[] = [
    { label: "সুগন্ধি (Perfume)", image: "/categories/category.svg" },
    { label: "ব্যাগ (Bag)", image: "/categories/category.svg" },
    { label: "চুলের যত্ন (Haircare)", image: "/categories/category.svg" },
    { label: "গহনা (Jewellery)", image: "/categories/category.svg" },
    { label: "মুখ (Face Care)", image: "/categories/category.svg" },
    { label: "স্কিনকেয়ার (Skincare)", image: "/categories/category.svg" },
    { label: "জুতো (Shoes)", image: "/categories/category.svg" },
    { label: "ঘড়ি (Watches)", image: "/categories/category.svg" },
  ];

  const [start, setStart] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const length = items.length;

  // Autoplay every 5s (pause on hover or when user interacts for a moment)
  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setStart((p) => (p + 1) % length), INTERVAL);
    return () => clearInterval(id);
  }, [length, paused]);

  // Compute visible slice (wrap around)
  const visibleItems: CategoryItem[] = [];
  for (let i = 0; i < VISIBLE; i++)
    visibleItems.push(items[(start + i) % length]);

  const pageCount = length > VISIBLE ? length : 1; // one dot per starting position
  const currentDot = start % length;

  const next = () => setStart((p) => (p + 1) % length);
  const prev = () => setStart((p) => (p - 1 + length) % length);

  // pause autoplay briefly after manual interaction
  const nudgePause = () => {
    setPaused(true);
    const t = setTimeout(() => setPaused(false), 4000);
    return () => clearTimeout(t);
  };

  return (
    <section className="w-full">
      <Shell>
        <div className="py-10 lg:py-14">
          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              ক্যাটাগরি
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              আমাদের পছন্দের কিছু জনপ্রিয় ক্যাটেগরি!
            </p>
          </div>

          {/* Carousel */}
          <div
            className="relative mt-8"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Grid of 5 visible cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {visibleItems.map((item, idx) => (
                <CategoryCard key={`${start}-${idx}`} item={item} />
              ))}
            </div>

            {/* Arrow controls (desktop) */}
            {length > VISIBLE && (
              <>
                <button
                  type="button"
                  aria-label="Previous"
                  onClick={() => {
                    prev();
                    nudgePause();
                  }}
                  className="absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/80 p-2 shadow ring-1 ring-border hover:bg-background md:inline-flex"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next"
                  onClick={() => {
                    next();
                    nudgePause();
                  }}
                  className="absolute right-0 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/80 p-2 shadow ring-1 ring-border hover:bg-background md:inline-flex"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            )}

            {/* Dots */}
            {pageCount > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                {Array.from({ length: pageCount }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to position ${i + 1}`}
                    onClick={() => {
                      setStart(i);
                      nudgePause();
                    }}
                    className={cn(
                      "h-1.5 rounded-full bg-foreground/30 transition-all",
                      i === currentDot ? "w-6 bg-primary" : "w-2"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Shell>
    </section>
  );
}

function CategoryCard({ item }: { item: CategoryItem }) {
  // Compact, uniform card size to match the screenshot
  return (
    <article className="rounded-2xl border p-4 bg-[#F0F5FF]">
      <div className="mx-auto flex h-28 w-full max-w-[220px] flex-col items-center justify-between">
        <div className="size-16 overflow-hidden rounded-full ring-1 ring-border sm:size-20">
          <Image
            src={item.image}
            alt={item.label}
            width={60}
            height={60}
            className="size-full object-cover"
          />
        </div>
        <h3 className="mt-2 line-clamp-2 text-center text-[13px] font-semibold text-foreground sm:text-sm">
          {item.label}
        </h3>
      </div>
    </article>
  );
}
