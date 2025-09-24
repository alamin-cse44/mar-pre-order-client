"use client";

import * as React from "react";
import Shell from "@/components/ui/core/Shell";
import { Slider } from "@/components/ui/slider"; // shadcn slider
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product, ProductCard } from "@/components/ProductCard";

/* --------------------------------------------------------------------------
   Types & Dummy Data (extend Product with category/brand/status)
----------------------------------------------------------------------------*/
interface ExtendedProduct extends Product {
  category: string;
  brand: string;
  inStock: boolean;
  onSale: boolean;
}

const DUMMY_PRODUCTS: ExtendedProduct[] = Array.from({ length: 27 }).map(
  (_, i) => ({
    id: i + 1,
    title:
      i % 3 === 0
        ? "Melasun Anti Melasma Sunscreen SPF50 — Long Protection"
        : i % 3 === 1
        ? "High Quality Brown Genuine Carry Bag With Extra Long Name"
        : "Revitaluxe Hair Oil — Anti Frizz & Shine Booster",
    discount: [35, 20, 30, 15, 25, 10, 18, 22, 28][i % 9],
    daysLeft: [2, 1, 3, 5, 4, 6, 2, 1, 2][i % 9],
    rating: [0, 5, 4.5, 4.2, 3.8, 0, 4.9, 4.1, 3.6][i % 9],
    reviews: [0, 5, 12, 10, 3, 0, 7, 2, 4][i % 9],
    price: [750, 1500, 990, 1250, 1350, 699, 999, 1750, 880][i % 9],
    mrp: [950, 1800, 1390, 1500, 1700, 900, 1300, 2200, 1200][i % 9],
    joined: [10, 25, 18, 12, 26, 8, 30, 15, 22][i % 9],
    target: [20, 75, 30, 25, 35, 20, 60, 20, 40][i % 9],
    max: [300, 200, 250, 150, 180, 200, 180, 220, 260][i % 9],
    image: "/products/demo.svg",
    category: [
      "Home Appliance",
      "Bag",
      "Cosmetics",
      "Skincare",
      "Stationary",
      "Belt",
      "Jewellery",
      "Healthcare",
      "Grocery & Staples",
    ][i % 9],
    brand: ["Bata", "Apex", "MarGroup", "BioCare"][i % 4],
    inStock: i % 7 !== 0,
    onSale: i % 2 === 0,
  })
);

const ALL_CATEGORIES = Array.from(
  new Set(DUMMY_PRODUCTS.map((p) => p.category))
).sort();
const ALL_BRANDS = Array.from(
  new Set(DUMMY_PRODUCTS.map((p) => p.brand))
).sort();

/* --------------------------------------------------------------------------
   Component
----------------------------------------------------------------------------*/
export default function AllProducts() {
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 0]);
  const [selectedCats, setSelectedCats] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedBrands, setSelectedBrands] = React.useState<Set<string>>(
    new Set()
  );
  const [status, setStatus] = React.useState<{
    inStock: boolean;
    onSale: boolean;
  }>({ inStock: false, onSale: false });
  const [page, setPage] = React.useState(1);

  // initialize price range from data
  React.useEffect(() => {
    const prices = DUMMY_PRODUCTS.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    setPriceRange([min, max]);
  }, []);

  const PER_PAGE = 8;

  // filtering
  const filtered = React.useMemo(() => {
    return DUMMY_PRODUCTS.filter((p) => {
      // price
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      // category
      if (selectedCats.size && !selectedCats.has(p.category)) return false;
      // brand
      if (selectedBrands.size && !selectedBrands.has(p.brand)) return false;
      // status
      if (status.inStock && !p.inStock) return false;
      if (status.onSale && !p.onSale) return false;
      return true;
    });
  }, [priceRange, selectedCats, selectedBrands, status]);

  // reset to first page when filters change
  React.useEffect(
    () => setPage(1),
    [priceRange, selectedCats, selectedBrands, status]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentSlice = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // slider bounds
  const globalMin = React.useMemo(
    () => Math.min(...DUMMY_PRODUCTS.map((p) => p.price)),
    []
  );
  const globalMax = React.useMemo(
    () => Math.max(...DUMMY_PRODUCTS.map((p) => p.price)),
    []
  );

  return (
    <section className="w-full mt-5">
      <Shell>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* Sidebar Filters */}
          <aside className="md:col-span-3">
            {/* Mobile collapsible */}
            <details className="mb-4 rounded-xl border md:hidden" open>
              <summary className="cursor-pointer list-none rounded-t-xl bg-[#F0F5FF] px-4 py-3 font-semibold">
                Filters
              </summary>
              <div className="space-y-6 p-4">
                <PriceFilter
                  range={priceRange}
                  setRange={setPriceRange}
                  min={globalMin}
                  max={globalMax}
                />
                <CheckboxGroup
                  title="Product Categories"
                  options={ALL_CATEGORIES}
                  selected={selectedCats}
                  setSelected={setSelectedCats}
                />
                <CheckboxGroup
                  title="Filter by Brands"
                  options={ALL_BRANDS}
                  selected={selectedBrands}
                  setSelected={setSelectedBrands}
                />
                <StatusGroup status={status} setStatus={setStatus} />
                <ClearAll
                  onClear={() => {
                    setPriceRange([globalMin, globalMax]);
                    setSelectedCats(new Set());
                    setSelectedBrands(new Set());
                    setStatus({ inStock: false, onSale: false });
                  }}
                />
              </div>
            </details>

            {/* Desktop filters */}
            <div className="sticky top-24 hidden space-y-6 rounded-2xl border p-4 md:block">
              <PriceFilter
                range={priceRange}
                setRange={setPriceRange}
                min={globalMin}
                max={globalMax}
              />
              <CheckboxGroup
                title="Product Categories"
                options={ALL_CATEGORIES}
                selected={selectedCats}
                setSelected={setSelectedCats}
              />
              <CheckboxGroup
                title="Filter by Brands"
                options={ALL_BRANDS}
                selected={selectedBrands}
                setSelected={setSelectedBrands}
              />
              <StatusGroup status={status} setStatus={setStatus} />
              <ClearAll
                onClear={() => {
                  setPriceRange([globalMin, globalMax]);
                  setSelectedCats(new Set());
                  setSelectedBrands(new Set());
                  setStatus({ inStock: false, onSale: false });
                }}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <main className="md:col-span-9">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {currentSlice.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-center gap-2">
                <PageButton
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="size-4" />
                </PageButton>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PageButton
                    key={i}
                    active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PageButton>
                ))}
                <PageButton
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight className="size-4" />
                </PageButton>
              </div>
            )}
          </main>
        </div>
      </Shell>
    </section>
  );
}

/* --------------------------------- UI Bits -------------------------------- */
function PriceFilter({
  range,
  setRange,
  min,
  max,
}: {
  range: [number, number];
  setRange: (v: [number, number]) => void;
  min: number;
  max: number;
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Min Price <span className="float-right">Max Price</span>
      </h4>
      <div className="mb-2 flex items-center justify-between gap-2 text-sm">
        <span className="inline-flex min-w-[60px] items-center justify-center rounded-md border px-2 py-1 text-muted-foreground">
          {(range[0] ?? min).toLocaleString("bn-BD")}
        </span>
        <span className="text-muted-foreground">—</span>
        <span className="inline-flex min-w-[60px] items-center justify-center rounded-md border px-2 py-1 text-muted-foreground">
          {(range[1] ?? max).toLocaleString("bn-BD")}
        </span>
      </div>
      <Slider
        value={range}
        min={min}
        max={max}
        step={10}
        onValueChange={(v) => {
          const nextMin = (v[0] ?? range[0]) as number;
          const nextMax = (v[1] ?? range[1]) as number;
          setRange([nextMin, nextMax]);
        }}
      />
    </div>
  );
}

function CheckboxGroup({
  title,
  options,
  selected,
  setSelected,
}: {
  title: string;
  options: string[];
  selected: Set<string>;
  setSelected: (s: Set<string>) => void;
}) {
  const toggle = (opt: string) => {
    const next = new Set(selected);
    if (next.has(opt)) next.delete(opt);
    else next.add(opt);
    setSelected(next);
  };
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">{title}</h4>
      <ul className="space-y-2">
        {options.map((opt) => (
          <li key={opt} className="flex items-center gap-2">
            <input
              id={opt}
              type="checkbox"
              className="size-4 rounded border-muted align-middle"
              checked={selected.has(opt)}
              onChange={() => toggle(opt)}
            />
            <label
              htmlFor={opt}
              className="cursor-pointer text-sm text-foreground/90"
            >
              {opt}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StatusGroup({
  status,
  setStatus,
}: {
  status: { inStock: boolean; onSale: boolean };
  setStatus: (s: { inStock: boolean; onSale: boolean }) => void;
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-foreground">
        Product Status
      </h4>
      <ul className="space-y-2">
        <li className="flex items-center gap-2">
          <input
            id="inStock"
            type="checkbox"
            className="size-4 rounded border-muted align-middle"
            checked={status.inStock}
            onChange={(e) =>
              setStatus({ ...status, inStock: e.target.checked })
            }
          />
          <label
            htmlFor="inStock"
            className="cursor-pointer text-sm text-foreground/90"
          >
            In Stock
          </label>
        </li>
        <li className="flex items-center gap-2">
          <input
            id="onSale"
            type="checkbox"
            className="size-4 rounded border-muted align-middle"
            checked={status.onSale}
            onChange={(e) => setStatus({ ...status, onSale: e.target.checked })}
          />
          <label
            htmlFor="onSale"
            className="cursor-pointer text-sm text-foreground/90"
          >
            On Sale
          </label>
        </li>
      </ul>
    </div>
  );
}

function ClearAll({ onClear }: { onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="w-full rounded-lg border bg-background px-3 py-2 text-sm font-medium hover:bg-muted"
    >
      Clear all filters
    </button>
  );
}

function PageButton({
  children,
  active,
  disabled,
  onClick,
}: React.PropsWithChildren<{
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}>) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex h-8 min-w-8 items-center justify-center rounded-full border px-2 text-sm",
        active && "border-primary bg-primary text-primary-foreground",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {children}
    </button>
  );
}
