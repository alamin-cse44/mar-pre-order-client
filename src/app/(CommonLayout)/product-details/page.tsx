"use client";

import * as React from "react";
import Image from "next/image";
import Shell from "@/components/ui/core/Shell";
import { cn } from "@/lib/utils";
import {
  BadgePercent,
  Clock3,
  ShoppingCart,
  Plus,
  Minus,
  ZoomIn,
  X,
  Users,
  PackageCheck,
} from "lucide-react";

/* ----------------------------------------------------------------------
   Dummy product (replace with API later)
------------------------------------------------------------------------*/
const DUMMY_PRODUCT = {
  id: 1,
  title: "KomaDerm Melasma Removal Cream",
  categories: ["মুখ (Face Care)", "Melasma (দাগ)"],
  price: 1650,
  oldPrice: 2000,
  discount: 35,
  campaignEnd: new Date(
    Date.now() + 1000 * 60 * 60 * 123 + 1000 * 33
  ).toISOString(), // ~5 days
  images: [
    "/products/demo.svg",
    "/products/demo.svg",
    "/products/demo.svg",
    "/products/demo.svg",
    "/products/demo.svg",
    "/products/demo.svg",
    "/products/demo.svg",
    "/products/demo.svg",
  ],
  tiers: [
    { qty: 300, price: 1550 },
    { qty: 500, price: 1520 },
    { qty: 1000, price: 1500 },
  ],
  delivery: [
    { label: "ঢাকা সিটি/ফ্রি", value: "৬০ টাকা" },
    { label: "ঢাকার বাইরে/কুরিয়ার", value: "১৮০ টাকা" },
  ],
  minRequired: 174,
  joined: 174,
  capacity: 300,
  orderedQty: 180,
};

export default function ProductDetails() {
  const p = DUMMY_PRODUCT;
  const [qty, setQty] = React.useState(1);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [zoomOpen, setZoomOpen] = React.useState(false);

  return (
    <section className="w-full mt-5">
      <Shell>
        {/* Row 1 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left: Gallery */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border">
              {/* discount badge */}
              <div className="pointer-events-none absolute left-2 top-2 z-10 rounded-md bg-[#00B67A] px-2 py-1 text-[11px] font-bold text-white shadow">
                {p.discount}% OFF
              </div>

              <div className="relative aspect-square w-full bg-muted">
                <Image
                  src={p.images[activeIdx]}
                  alt={p.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Zoom button */}
                <button
                  type="button"
                  onClick={() => setZoomOpen(true)}
                  className="absolute bottom-3 right-3 inline-flex items-center justify-center rounded-full bg-white/90 p-2 text-foreground shadow hover:bg-white"
                  aria-label="Zoom image"
                >
                  <ZoomIn className="size-5" />
                </button>
              </div>

              {/* Thumbnails (scrollable) */}
              <ThumbStrip
                images={p.images}
                activeIdx={activeIdx}
                onSelect={setActiveIdx}
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="md:col-span-7">
            <div className="space-y-4 rounded-2xl border p-4">
              <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
                {p.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">
                  ক্যাটাগরি:
                </span>{" "}
                {p.categories.join(", ")}
              </p>

              {/* Price */}
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-lg font-extrabold text-rose-600">
                  মূল্য: {p.price.toLocaleString("bn-BD")} টাকা
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  মূল্য: {p.oldPrice.toLocaleString("bn-BD")} টাকা
                </span>
              </div>

              {/* Countdown + Tier pricing + Delivery */}
              <div className="space-y-3">
                {/* Row 1: Campaign only */}
                <div>
                  <Box
                    title="Campaign ends in"
                    icon={<Clock3 className="size-4" />}
                  >
                    {/* Countdown already shows DAY / HOURS / MINUTES / SECONDS in one row */}
                    <Countdown end={p.campaignEnd} />
                  </Box>
                </div>

                {/* Row 2: Quantity-based Pricing + Delivery */}
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <Box
                    title="Quantity-based Pricing"
                    icon={<BadgePercent className="size-4" />}
                  >
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      {p.tiers.map((t) => (
                        <div key={t.qty} className="rounded-lg border p-2">
                          <div className="font-semibold">{t.qty}+</div>
                          <div className="font-bold text-emerald-600">
                            {t.price.toLocaleString("bn-BD")}৳
                          </div>
                        </div>
                      ))}
                    </div>
                  </Box>

                  <Box
                    title="ডেলিভারি চার্জ"
                    icon={<PackageCheck className="size-4" />}
                  >
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {p.delivery.map((d) => (
                        <div key={d.label} className="rounded-lg border p-2">
                          <div className="font-semibold">{d.label}</div>
                          <div className="text-foreground/90">{d.value}</div>
                        </div>
                      ))}
                    </div>
                  </Box>
                </div>
              </div>

              {/* Qty + CTA */}
              <div className="flex flex-wrap items-center gap-3">
                <QtyInput value={qty} setValue={setQty} />
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90">
                  <ShoppingCart className="size-4" /> অর্ডার করুন
                </button>
              </div>

              {/* Progress cards */}
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <Box title="Join Progress" icon={<Users className="size-4" />}>
                  <ProgressRow
                    label="Minimum Required"
                    value={p.joined}
                    of={p.minRequired}
                  />
                  <ProgressRow
                    label="Capacity"
                    value={p.joined}
                    of={p.capacity}
                  />
                  <div className="mt-1 text-[11px] text-muted-foreground">
                    58% of capacity filled · 126 more can join
                  </div>
                </Box>
                <Box
                  title="Quantity Progress"
                  icon={<PackageCheck className="size-4" />}
                >
                  <div className="text-sm">
                    Current Quantity{" "}
                    <span className="float-right font-semibold">
                      {p.orderedQty} ordered
                    </span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full w-[60%] rounded-full bg-primary" />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>
                      Total Quantity Ordered:{" "}
                      <span className="font-semibold text-foreground">180</span>
                    </span>
                    <span>
                      Current Price:{" "}
                      <span className="font-semibold text-foreground">
                        1650৳
                      </span>
                    </span>
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Tabs */}
        <div className="mt-6 rounded-2xl border p-4">
          <Tabs
            tabs={[
              { key: "details", label: "পণ্য বিবরণ" },
              { key: "reviews", label: "রিভিউ" },
            ]}
            render={(key) =>
              key === "details" ? <DetailsContent /> : <ReviewsContent />
            }
          />
        </div>
      </Shell>

      {/* Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          onClick={() => setZoomOpen(false)}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-foreground hover:bg-white"
            onClick={() => setZoomOpen(false)}
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
          <div className="relative h-[80vh] w-full max-w-4xl">
            <Zoomable src={p.images[activeIdx]} alt={p.title} />
          </div>
        </div>
      )}
    </section>
  );
}

/* --------------------------- Gallery Components -------------------------- */
function ThumbStrip({
  images,
  activeIdx,
  onSelect,
}: {
  images: string[];
  activeIdx: number;
  onSelect: (i: number) => void;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const scrollBy = (dir: 1 | -1) =>
    ref.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  return (
    <div className="relative border-t">
      {images.length > 4 && (
        <>
          <button
            onClick={() => scrollBy(-1)}
            className="absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 shadow hover:bg-white"
          >
            ‹
          </button>
          <button
            onClick={() => scrollBy(1)}
            className="absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 px-2 py-1 shadow hover:bg-white"
          >
            ›
          </button>
        </>
      )}
      <div ref={ref} className="flex gap-2 overflow-x-auto p-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className={cn(
              "relative size-16 shrink-0 overflow-hidden rounded-lg border",
              i === activeIdx && "ring-2 ring-primary"
            )}
            aria-label={`Thumbnail ${i + 1}`}
          >
            <Image src={src} alt={`thumb-${i}`} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------- Small UI -------------------------------- */
function Box({
  title,
  icon,
  children,
}: React.PropsWithChildren<{ title: string; icon?: React.ReactNode }>) {
  return (
    <div className="rounded-xl border p-3">
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
        {icon} <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function QtyInput({
  value,
  setValue,
}: {
  value: number;
  setValue: (n: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-xl border bg-background">
      <button
        className="px-2 py-2"
        onClick={() => setValue(Math.max(1, value - 1))}
        aria-label="Decrease"
      >
        <Minus className="size-4" />
      </button>
      <input
        className="w-12 border-x bg-transparent py-2 text-center"
        value={value}
        onChange={(e) => setValue(Math.max(1, parseInt(e.target.value) || 1))}
      />
      <button
        className="px-2 py-2"
        onClick={() => setValue(value + 1)}
        aria-label="Increase"
      >
        <Plus className="size-4" />
      </button>
    </div>
  );
}

function ProgressRow({
  label,
  value,
  of,
}: {
  label: string;
  value: number;
  of: number;
}) {
  const pct = Math.min(100, Math.round((value / of) * 100));
  return (
    <div className="mb-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-foreground/90">{label}</span>
        <span className="font-semibold text-foreground">
          {value}/{of}
        </span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Countdown({ end }: { end: string }) {
  const target = React.useMemo(() => new Date(end).getTime(), [end]);
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const remaining = Math.max(0, target - now);
  const d = Math.floor(remaining / (24 * 3600 * 1000));
  const h = Math.floor((remaining % (24 * 3600 * 1000)) / (3600 * 1000));
  const m = Math.floor((remaining % (3600 * 1000)) / (60 * 1000));
  const s = Math.floor((remaining % (60 * 1000)) / 1000);
  return (
    <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
      <TimeBox label="DAY" value={d} />
      <TimeBox label="HOURS" value={h} />
      <TimeBox label="MINUTES" value={m} />
      <TimeBox label="SECONDS" value={s} />
    </div>
  );
}
function TimeBox({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border p-2">
      <div className="text-lg font-extrabold">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="opacity-70">{label}</div>
    </div>
  );
}

function Tabs({
  tabs,
  render,
}: {
  tabs: { key: string; label: string }[];
  render: (key: string) => React.ReactNode;
}) {
  const [active, setActive] = React.useState(tabs[0].key);
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b pb-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-semibold",
              active === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            )}
            onClick={() => setActive(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{render(active)}</div>
    </div>
  );
}

function DetailsContent() {
  return (
    <div className="prose max-w-none text-sm leading-7 text-foreground/90 dark:prose-invert">
      <p>
        নতুনতম ক্যাম্পেইনের অংশ: ১/09/2025 থেকে 10/09/2025। এই ক্রিমটি মেলাসমা,
        ডার্ক স্পট ও অসম ত্বকের রঙ উন্নত করতে সহায়তা করে। ক্লিনিক্যালি টেস্টেড
        ফর্মুলা যা নিয়মিত ব্যবহারে দৃশ্যমান ফল দেয়।
      </p>
      <ul>
        <li>এক্টিভ ইনগ্রেডিয়েন্ট: নিয়াসিনামাইড, আরবুটিন, ভিটামিন সি।</li>
        <li>ব্যবহার: দিনে ২ বার, পরিষ্কার মুখে পাতলা করে লাগান।</li>
        <li>
          সতর্কতা: কেবল বাহ্যিক ব্যবহারের জন্য। চোখে লাগলে পানি দিয়ে ধুয়ে
          ফেলুন।
        </li>
      </ul>
      <p className="text-rose-600">
        ডিসক্লেইমার: যেকোনো ত্বক সংবেদনশীলতা থাকলে ব্যবহারের আগে প্যাচ টেস্ট
        করুন।
      </p>
    </div>
  );
}

function ReviewsContent() {
  return (
    <div className="text-sm text-muted-foreground">এখনও কোনো রিভিউ নেই।</div>
  );
}

/* ---------------------------- Zoomable Viewer ---------------------------- */
function Zoomable({ src, alt }: { src: string; alt: string }) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(1);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const dragging = React.useRef(false);
  const start = React.useRef({ x: 0, y: 0 });

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const next = Math.min(4, Math.max(1, scale + (e.deltaY > 0 ? -0.2 : 0.2)));
    setScale(next);
  };
  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    start.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - start.current.x, y: e.clientY - start.current.y });
  };
  const onMouseUp = () => (dragging.current = false);

  return (
    <div
      ref={ref}
      className="relative h-full w-full overflow-hidden rounded-xl bg-black"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
          transition: dragging.current ? "none" : "transform 0.15s ease",
        }}
      />
    </div>
  );
}
