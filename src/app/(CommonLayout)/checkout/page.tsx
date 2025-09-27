"use client";

import * as React from "react";
import Image from "next/image";
import Shell from "@/components/ui/core/Shell";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

/* --------------------------------------------------------------------------
   Dummy cart + types (swap with API later)
----------------------------------------------------------------------------*/
interface CartItem {
  id: number;
  title: string;
  price: number; // per unit
  image: string;
  size?: string;
  color?: string;
  qty: number;
}

type ShippingKey = "dhaka" | "nearDhaka" | "outsideDhaka";
const SHIPPING_OPTIONS: Record<ShippingKey, { label: string; cost: number }> = {
  dhaka: { label: "ঢাকা সিটি ভিতরে (৬০)", cost: 60 },
  nearDhaka: { label: "পাশ্ববর্তী / সাভার / নারায়ণগঞ্জ (১০০)", cost: 100 },
  outsideDhaka: { label: "ঢাকা সিটি বাহিরে (১৩০)", cost: 130 },
};

type PaymentPortion = "slightly" | "half" | "full";
const SLIGHTLY_AMOUNT = 500; // flat advance for "slightly"

const INITIAL_CART: CartItem[] = [
  { id: 1, title: "Red Lipstick", price: 6907, image: "/products/demo.svg", size: "9", color: "White", qty: 1 },
  { id: 2, title: "Red Lipstick", price: 6907, image: "/products/demo.svg", size: "9", color: "White", qty: 1 },
  { id: 3, title: "Red Lipstick", price: 6907, image: "/products/demo.svg", size: "9", color: "White", qty: 1 },
];

/* --------------------------------------------------------------------------
   Component
----------------------------------------------------------------------------*/
export default function Checkout() {
  const [cart, setCart] = React.useState<CartItem[]>(INITIAL_CART);
  const [shipping, setShipping] = React.useState<ShippingKey>("dhaka");
  const [portion, setPortion] = React.useState<PaymentPortion>("slightly");
  const [gateway, setGateway] = React.useState<"ssl" | "bkash" | "nagad">("ssl");

  // form (mock)
  const [form, setForm] = React.useState({ name: "", phone: "", address: "", password: "" });

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it)));
  };
  const removeItem = (id: number) => setCart((prev) => prev.filter((it) => it.id !== id));

  // totals
  const subTotal = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const discount = 0; // plug your logic later
  const shippingCost = SHIPPING_OPTIONS[shipping].cost;
  const total = subTotal - discount + shippingCost;
  const payable = portion === "full" ? total : portion === "half" ? Math.ceil(total / 2) : Math.min(total, SLIGHTLY_AMOUNT);
  const due = Math.max(0, total - payable);

  return (
    <section className="w-full mt-5">
      <Shell>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Left: Customer form */}
          <div className="md:col-span-6">
            <div className="space-y-4 rounded-2xl border p-4">
              <p className="rounded-md bg-emerald-50 p-2 text-center text-[13px] font-medium text-emerald-700">
                অর্ডার কনফার্ম করতে আপনার তথ্য দিয়ে কনফার্ম বাটন চাপুন
              </p>

              <Field label="আপনার নাম">
                <input
                  className="w-full rounded-lg border bg-[#F0F5FF] px-3 py-2 text-sm outline-none"
                  placeholder="আপনার নাম লিখুন"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </Field>
              <Field label="আপনার মোবাইল নাম্বার">
                <input
                  className="w-full rounded-lg border bg-[#F0F5FF] px-3 py-2 text-sm outline-none"
                  placeholder="মোবাইল নাম্বার লিখুন"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Field>
              <Field label="আপনার সম্পূর্ণ ঠিকানা">
                <input
                  className="w-full rounded-lg border bg-[#F0F5FF] px-3 py-2 text-sm outline-none"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
              </Field>
              <Field label="পাসওয়ার্ড">
                <input
                  type="password"
                  className="w-full rounded-lg border bg-[#F0F5FF] px-3 py-2 text-sm outline-none"
                  placeholder="********"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </Field>

              {/* Shipping */}
              <div>
                <h4 className="mb-2 text-sm font-semibold">ডেলিভারি টাইপ</h4>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {Object.entries(SHIPPING_OPTIONS).map(([key, opt]) => (
                    <label key={key} className={cn("flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-sm", shipping === key ? "ring-2 ring-primary" : "")}>
                      <input
                        type="radio"
                        name="shipping"
                        className="accent-primary"
                        checked={shipping === (key as ShippingKey)}
                        onChange={() => setShipping(key as ShippingKey)}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment portion */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold">পেমেন্ট টাইপ</label>
                  <select
                    className="w-full rounded-lg border bg-background px-3 py-2 text-sm"
                    value={portion}
                    onChange={(e) => setPortion(e.target.value as PaymentPortion)}
                  >
                    <option value="slightly">Slightly (৳{SLIGHTLY_AMOUNT})</option>
                    <option value="half">Half (50%)</option>
                    <option value="full">Full Payment</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold">টাকা দিন</label>
                  <input
                    disabled
                    value={`৳ ${payable.toLocaleString("bn-BD")}`}
                    className="w-full cursor-not-allowed rounded-lg border bg-muted/40 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              {/* Payment media */}
              <div>
                <h4 className="mb-2 text-sm font-semibold">পেমেন্ট মাধ্যম</h4>
                <div className="flex flex-wrap items-center gap-4">
                  <LogoRadio id="ssl" label="SSLCOMMERZ" checked={gateway === "ssl"} onChange={() => setGateway("ssl")} src="/logo/sslcommerz.svg" />
                  <LogoRadio id="bkash" label="bKash" checked={gateway === "bkash"} onChange={() => setGateway("bkash")} src="/logo/bkash.svg" />
                  <LogoRadio id="nagad" label="Nagad" checked={gateway === "nagad"} onChange={() => setGateway("nagad")} src="/logo/nagad.svg" />
                </div>
              </div>

              <button className="mt-2 w-full rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                অর্ডার কনফার্ম
              </button>
            </div>
          </div>

          {/* Right: Cart + Summary */}
          <div className="md:col-span-6">
            <div className="space-y-4">
              {/* Cart */}
              <div className="rounded-2xl border">
                <div className="border-b px-4 py-3 text-sm font-semibold">Cart ({cart.length} item{cart.length > 1 ? "s" : ""})</div>
                <div>
                  {cart.map((it) => (
                    <div key={it.id} className="flex items-center gap-3 border-b px-4 py-3 last:border-b-0">
                      <div className="relative h-14 w-14 overflow-hidden rounded-lg border">
                        <Image src={it.image} alt={it.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold">{it.title}</div>
                        <div className="text-xs text-muted-foreground">size: {it.size} | color: {it.color}</div>
                      </div>
                      <div className="hidden w-20 text-sm sm:block">৳{it.price.toLocaleString("bn-BD")}</div>
                      <div className="inline-flex items-center rounded-lg border bg-background">
                        <button className="px-2 py-1" onClick={() => updateQty(it.id, -1)} aria-label="Decrease"><Minus className="size-4" /></button>
                        <span className="min-w-[32px] text-center text-sm">{it.qty}</span>
                        <button className="px-2 py-1" onClick={() => updateQty(it.id, 1)} aria-label="Increase"><Plus className="size-4" /></button>
                      </div>
                      <div className="w-24 text-right text-sm">৳{(it.price * it.qty).toLocaleString("bn-BD")}</div>
                      <button className="ml-2 rounded-md p-1 hover:bg-muted" onClick={() => removeItem(it.id)} aria-label="Remove">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="rounded-2xl border">
                <div className="border-b px-4 py-3 text-sm font-semibold">Order Summary</div>
                <div className="space-y-2 p-4 text-sm">
                  <Row label="Sub Total" value={`৳${subTotal.toLocaleString("bn-BD")}`} />
                  <Row label="Discount" value={discount ? `৳${discount}` : "-"} />
                  <Row label="Shipping" value={`৳${shippingCost.toLocaleString("bn-BD")}`} />
                  <hr />
                  <Row label="Total" value={`৳${total.toLocaleString("bn-BD")}`} bold />
                  <Row label="Payable amount" value={<span className="text-emerald-600">৳{payable.toLocaleString("bn-BD")}</span>} />
                  <Row label="Due" value={<span className="text-rose-600">৳{due.toLocaleString("bn-BD")}</span>} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  );
}

/* --------------------------------- Bits ---------------------------------- */
function Field({ label, children }: React.PropsWithChildren<{ label: string }>) {
  return (
    <label className="block text-sm">
      <div className="mb-1 font-semibold text-foreground">{label}</div>
      {children}
    </label>
  );
}

function Row({ label, value, bold = false }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn("tabular-nums", bold && "font-semibold text-foreground")}>{value}</span>
    </div>
  );
}

function LogoRadio({ id, label, src, checked, onChange }: { id: string; label: string; src: string; checked: boolean; onChange: () => void }) {
  return (
    <label htmlFor={id} className={cn("flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2", checked ? "ring-2 ring-primary" : "")}> 
      <input id={id} type="radio" className="hidden" checked={checked} onChange={onChange} />
      <div className="relative h-6 w-[120px]"><Image src={src} alt={label} fill className="object-contain" /></div>
    </label>
  );
}
