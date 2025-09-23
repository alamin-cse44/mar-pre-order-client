"use client";

import * as React from "react";
import Image from "next/image";
import Shell from "@/components/ui/core/Shell";
import {
  ArrowRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Main footer card (dark) */}
      <Shell>
        <div className="rounded-3xl border border-border bg-neutral-900 px-6 py-8 text-neutral-100 md:px-8">
          {/* Top CTA + Groups (inside black area). Right-aligned on large, stacked on small */}
          <div className="mb-8 flex flex-col items-stretch gap-3 md:flex-row md:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 self-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow ring-1 ring-primary/40 transition-colors hover:bg-primary/90 md:self-auto"
            >
              আমাদের সাথে যোগ দিন <ArrowRight className="size-4" />
            </a>

            <a
              href="#whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-2xl bg-emerald-600 px-4 py-2 text-white shadow ring-2 ring-emerald-300/60 hover:bg-emerald-700"
            >
              <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="size-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold">
                  What&#39;s app Group
                </span>
                <span className="block text-[11px] opacity-90">
                  This is just for our pre-order customers!
                </span>
              </span>
            </a>

            <a
              href="#facebook-group"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-2xl bg-[#1877F2] px-4 py-2 text-white shadow ring-2 ring-blue-300/60 hover:bg-[#1666d6]"
            >
              <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-white/20">
                <Facebook className="size-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold">
                  Facebook Group
                </span>
                <span className="block text-[11px] opacity-90">
                  This is just for our pre-order customers!
                </span>
              </span>
            </a>
          </div>

          <div className="grid gap-10 md:grid-cols-12">
            {/* Brand + about */}
            <div className="md:col-span-5">
              <Image
                src="/logo/main1.svg"
                alt="MAR GROUP logo"
                width={150}
                height={48}
                className="h-auto w-40"
                priority
              />
              <p className="mt-4 text-sm text-neutral-300">
                আপনার সৌন্দর্য এবং ত্বকের যত্নের চাহিদা পূরণের জন্য উচ্চ-মানের
                প্রসাধনী এব বকের যত্নের পণ্যের একটি বিস্তৃত নির্বাচন অফার করে।
                আমাদের কাছে আপনার পয়োজনীয় সমস্ত কিছু রয়েছে, মেকআপ থেকে
                ময়েশ্চারাইজার থেকে সানস্ক্রিন পর্যন্ত আমরা আপনার ত্বকের ধরন এবং
                চাহিদার জন্য নিখুঁত পণ্য খুঁজে পেত আপনাকে সাহায্য করতে পেরে খুশি
                হব!
              </p>
              <p className="mt-5 text-xs text-neutral-400">
                © 2025 MAR GROUP. All rights reserved.
              </p>

              {/* Socials */}
              <div className="mt-4 flex items-center gap-3">
                <SocialIcon href="https://twitter.com" label="Twitter">
                  <Twitter className="size-4" />
                </SocialIcon>
                <SocialIcon href="https://facebook.com" label="Facebook">
                  <Facebook className="size-4" />
                </SocialIcon>
                <SocialIcon href="https://instagram.com" label="Instagram">
                  <Instagram className="size-4" />
                </SocialIcon>
                <SocialIcon href="https://youtube.com" label="YouTube">
                  <Youtube className="size-4" />
                </SocialIcon>
              </div>
            </div>

            {/* Nav links */}
            <div className="md:col-span-3">
              <h4 className="text-base font-bold">আরও জানুন</h4>
              <ul className="mt-4 space-y-2 text-sm text-neutral-300">
                <li>
                  <a className="hover:underline" href="#about">
                    আমাদের সম্পর্কে
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#brand">
                    ব্র্যান্ড বিক্রেতাদের নীতিমালা
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#careers">
                    ক্যারিয়ার
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#terms">
                    শর্তাবলী
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#returns">
                    রিটার্ন এবং রিফান্ড নীতি
                  </a>
                </li>
                <li>
                  <a className="hover:underline" href="#privacy">
                    গোপনীয়তা নীতি
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-4">
              <h4 className="text-base font-bold">যোগাযোগ করুন</h4>
              <ul className="mt-4 space-y-3 text-sm text-neutral-300">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <MapPin className="size-4" />
                  </span>
                  <span>House 9/1, Road: 7/A, Dhanmondi, Dhaka 1209.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Mail className="size-4" />
                  </span>
                  <a
                    href="mailto:pndservice18@gmail.com"
                    className="hover:underline"
                  >
                    pndservice18@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex size-7 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Phone className="size-4" />
                  </span>
                  <a href="tel:+8801830093682" className="hover:underline">
                    +88 01830093682
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Shell>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white transition hover:bg-white/20"
    >
      {children}
    </a>
  );
}
