"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Shell from "@/components/ui/core/Shell";
import {
  Search,
  LogIn,
  User,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
 * Dummy data (replace with API later)
 * -------------------------------------------------------------------------- */
const CATEGORIES = [
  "সুগন্ধি (Perfume)",
  "ব্যাগ (Bag)",
  "চুলের যত্ন (Haircare)",
  "স্কিনকেয়ার (Skincare)",
  "মেকআপ (Makeup)",
  "জুতো (Shoes)",
  "গহনা (Jewellery)",
  "ঘড়ি (Watches)",
  "ফেস কেয়ার (Face Care)",
  "হেয়ার টুলস (Hair Tools)",
];

const NAV_ITEMS: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "ক্যাটাগরি", children: CATEGORIES.map((c, i) => ({ label: c, href: `/category/${i + 1}` })) },
  { label: "সবকিছু", href: "/all" },
  { label: "সবচেয়ে অফার", href: "/offers" },
  { label: "অর্ডার ট্র্যাক", href: "/track" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ", href: "/contact" },
];

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

/* --------------------------------------------------------------------------
 * Component
 * -------------------------------------------------------------------------- */
export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const user: { name: string } | null = null; // replace with session/user in future

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm">
      {/* Row 1: announcement / welcome ticker */}
      <div className="border-b bg-[#F0F5FF] text-foreground/90">
        <Shell>
          <div className="relative h-8 overflow-hidden">
            <div className="pointer-events-none absolute inset-0 flex items-center">
              <div className="whitespace-nowrap animate-[marquee_25s_linear_infinite] text-[13px]">
                <span className="mx-6">
                  MAR Shop এ আপনাকে স্বাগতম — বাংলাদেশের বিখ্যাত অনলাইন শপ — সারা দেশে ক্যাশ অন ডেলিভারি (৪৮ থেকে ৭২ ঘণ্টার মধ্যে নিরাপদ ডেলিভারি) হটলাইনঃ 01796983339
                </span>
                <span className="mx-6">
                  MAR Shop এ আপনাকে স্বাগতম — বাংলাদেশের বিখ্যাত অনলাইন শপ — সারা দেশে ক্যাশ অন ডেলিভারি (৪৮ থেকে ৭২ ঘণ্টার মধ্যে নিরাপদ ডেলিভারি) হটলাইনঃ 01796983339
                </span>
              </div>
            </div>
          </div>
        </Shell>
      </div>

      {/* Row 2: logo • search • auth/cart + mobile menu */}
      <div className="border-b bg-white">
        <Shell>
          <div className="flex h-16 items-center justify-between gap-3 text-foreground">
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-primary-foreground hover:bg-black/10 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-5 text-primary" />
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo/main2.svg" width={110} height={36} alt="MAR GROUP" className="h-auto w-[110px]" />
            </Link>

            {/* Search */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="hidden flex-1 items-center justify-center md:flex"
              role="search"
            >
              <div className="flex w-full max-w-2xl overflow-hidden rounded-full bg-white text-foreground ring-1 ring-border">
                <input
                  type="search"
                  placeholder="পছন্দের পণ্য খুঁজুন…"
                  aria-label="Search products"
                  className="w-full bg-[#F0F5FF] px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
                >
                  <Search className="size-5" />
                </button>
              </div>
            </form>

            {/* Auth + Cart */}
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/account" className="hidden items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/15 md:inline-flex">
                  <User className="size-4" /> {"user.name"}
                </Link>
              ) : (
                <Link href="/login" className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 md:inline-flex">
                  <LogIn className="size-4" /> লগইন / সাইন আপ
                </Link>
              )}

              <Link href="/cart" className="relative inline-flex items-center justify-center rounded-full bg-[#F0F5FF] p-2 hover:bg-[#E4EBFF]">
                <ShoppingCart className="size-5" />
                <span className="absolute -right-1 -top-1 inline-flex min-w-[18px] items-center justify-center rounded-full bg-background px-1 text-[10px] font-bold text-foreground ring-1 ring-black/10">0</span>
              </Link>
            </div>
          </div>
        </Shell>
      </div>

      {/* Row 3: nav bar */}
      <div className="bg-primary">
        <Shell>
          <DesktopNav items={NAV_ITEMS} pathname={pathname} />
        </Shell>
      </div>

      {/* Mobile drawer */}
      <MobileNav open={mobileOpen} setOpen={setMobileOpen} items={NAV_ITEMS} pathname={pathname} user={user} />

      {/* marquee keyframes (scoped globally) */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </header>
  );
}

/* --------------------------------------------------------------------------
 * Desktop Nav
 * -------------------------------------------------------------------------- */
function DesktopNav({ items, pathname }: { items: NavItem[]; pathname: string }) {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <nav className="hidden h-12 items-center justify-center md:flex">
      <ul className="flex items-center justify-center gap-2 text-primary-foreground">
        {items.map((item, idx) => {
          const isActive = item.href ? pathname === item.href : false;
          const hasChildren = !!item.children?.length;
          return (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => hasChildren && setOpen(idx)}
              onMouseLeave={() => hasChildren && setOpen(null)}
            >
              {hasChildren ? (
                <button
                  onClick={() => setOpen((s) => (s === idx ? null : idx))}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium hover:bg-black/10",
                    open === idx && "bg-black/10"
                  )}
                >
                  {item.label}
                  <ChevronDown className="size-4" />
                </button>
              ) : (
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium hover:bg-black/10",
                    isActive && "bg-black/15"
                  )}
                >
                  {item.label}
                </Link>
              )}

              {/* Dropdown */}
              {hasChildren && (
                <div className={cn("absolute left-0 top-full z-40 w-[680px] pt-2", open === idx ? "block" : "hidden")}
                >
                  <div className="rounded-xl border border-black/10 bg-background p-4 text-foreground shadow-xl">
                    <div className="grid grid-cols-2 gap-2">
                      {item.children!.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
                        >
                          <span className="line-clamp-1">{c.label}</span>
                          <ChevronRight className="size-4 opacity-60" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* --------------------------------------------------------------------------
 * Mobile Nav (drawer)
 * -------------------------------------------------------------------------- */
function MobileNav({
  open,
  setOpen,
  items,
  pathname,
  user,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  items: NavItem[];
  pathname: string;
  user: { name: string } | null;
}) {
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  React.useEffect(() => {
    if (!open) setExpanded({});
  }, [open]);

  return (
    <div className={cn("fixed inset-0 z-50 bg-black/40 md:hidden", open ? "block" : "hidden")}>
      <aside className="absolute inset-y-0 left-0 w-[85%] max-w-sm bg-background p-4 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
            <Image src="/logo/main2.svg" width={100} height={32} alt="MAR GROUP" />
          </Link>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="rounded-md p-2 hover:bg-muted">
            <X className="size-5" />
          </button>
        </div>

        {/* Search (mobile) */}
        <form onSubmit={(e) => e.preventDefault()} role="search" className="mb-4">
          <div className="flex overflow-hidden rounded-full border">
            <input
              type="search"
              placeholder="পণ্য খুঁজুন…"
              className="w-full bg-transparent px-4 py-2 text-sm outline-none"
            />
            <button type="submit" className="bg-primary px-4 py-2 text-primary-foreground">
              <Search className="size-5" />
            </button>
          </div>
        </form>

        {/* Auth */}
        <div className="mb-4">
          {user ? (
            <Link href="/account" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm font-medium">
              <User className="size-4" /> {user.name}
            </Link>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
              <LogIn className="size-4" /> লগইন / সাইন আপ
            </Link>
          )}
        </div>

        <nav>
          <ul className="space-y-1">
            {items.map((item) => {
              const isActive = item.href ? pathname === item.href : false;
              const hasChildren = !!item.children?.length;
              return (
                <li key={item.label}>
                  {hasChildren ? (
                    <>
                      <button
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm font-medium hover:bg-muted",
                          expanded[item.label] && "bg-muted"
                        )}
                        onClick={() => setExpanded((s) => ({ ...s, [item.label]: !s[item.label] }))}
                      >
                        {item.label}
                        <ChevronDown className={cn("size-4 transition", expanded[item.label] && "rotate-180")} />
                      </button>
                      {expanded[item.label] && (
                        <ul className="mt-1 space-y-1 pl-3">
                          {item.children!.map((c) => (
                            <li key={c.href}>
                              <Link
                                href={c.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-muted"
                              >
                                <span className="line-clamp-1">{c.label}</span>
                                <ChevronRight className="size-4 opacity-60" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block rounded-md px-3 py-2 text-sm font-medium hover:bg-muted",
                        isActive && "bg-muted"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
