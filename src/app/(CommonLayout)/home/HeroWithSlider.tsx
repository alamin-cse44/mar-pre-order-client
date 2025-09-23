"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  BadgePercent,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Shell from "@/components/ui/core/Shell";

interface HeroCarouselProps {
  images?: string[];
  className?: string;
  autoPlayMs?: number;
}

export default function HeroWithSlider({
  images = ["/poster/poster1.svg", "/poster/poster1.svg", "/poster/poster1.svg"],
  className,
  autoPlayMs = 4000,
}: HeroCarouselProps) {
  const [index, setIndex] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);
  const length = Math.max(images.length, 1);

  React.useEffect(() => {
    if (length <= 1 || isHovering) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % length), autoPlayMs);
    return () => clearInterval(id);
  }, [length, autoPlayMs, isHovering]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [length]);

  const next = React.useCallback(
    () => setIndex((p) => (p + 1) % length),
    [length]
  );
  const prev = React.useCallback(
    () => setIndex((p) => (p - 1 + length) % length),
    [length]
  );

  const startX = React.useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    (startX.current = e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.touches[0].clientX - startX.current;
    if (Math.abs(dx) > 60) {
      dx < 0 ? next() : prev();
      startX.current = null;
    }
  };
  const onTouchEnd = () => (startX.current = null);

  return (
    <section className={cn("w-full", className)}>
      <Shell>
        <div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:items-center lg:py-16">
          {/* Left: Content */}
          <div className="space-y-5">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-4xl">
              <span className="text-foreground">
                প্রি-অর্ডারে নিশ্চিত কেনাকাটা,
              </span>
              <br /> <span className="text-primary">MAR-SHOP</span> থেকে
            </h1>
            <p className="max-w-prose text-muted-foreground">
              নতুন রিলিজ আগে বুক করুন, পাচ্ছেন এক্সক্লুসিভ অফার ও গ্যারান্টি <br className="lg:flex hidden" />
              দামের সেরা!
            </p>
            <ul className="space-y-3 text-primary font-bold">
              <li className="flex items-center gap-2">
                <ShieldCheck className="size-5" /> ১০০% অরিজিনাল
              </li>
              <li className="flex items-center gap-2">
                <BadgePercent className="size-5" /> আগাম বুকিং
                ডিসকাউন্ট
              </li>
              <li className="flex items-center gap-2">
                <Truck className="size-5" /> ট্র্যাকযোগ্য ডেলিভারি
              </li>
              <li className="flex items-center gap-2">
                <RotateCcw className="size-5" /> সহজ রিটার্ন
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
              >
                সকল পণ্য
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl border border-primary text-primary bg-background px-5 py-3 font-bold shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                অর্ডার ট্র্যাক করুন
              </a>
            </div>
          </div>

          {/* Right: Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div
              className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-muted"
              role="region"
              aria-roledescription="carousel"
              aria-label="Promotional images"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div
                className="flex h-full w-full transition-transform duration-700 [transition-timing-function:cubic-bezier(.22,.61,.36,1)]"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {images.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-full w-full shrink-0 grow-0 basis-full"
                  >
                    <Image
                      src={src}
                      alt={`slide-${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 560px, 100vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>

              {length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground shadow hover:bg-background/90 focus:outline-none"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/70 p-2 text-foreground shadow hover:bg-background/90 focus:outline-none"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}

              {length > 1 && (
                <div className="absolute inset-x-0 bottom-3 z-10 flex items-center justify-center gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={cn(
                        "h-1.5 rounded-full bg-foreground/40 transition-all",
                        i === index ? "w-4 bg-primary" : "w-1.5"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}
