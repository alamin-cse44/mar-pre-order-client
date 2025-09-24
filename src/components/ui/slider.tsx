"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number[];
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
  "aria-label"?: string;
}

// Minimal slider compatible with shadcn/ui API used in the project
export function Slider({
  value,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  className,
  ...props
}: SliderProps) {
  const current = Number(Array.isArray(value) ? value[0] ?? 0 : 0);

  return (
    <div className={cn("w-full", className)} {...props}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(e) => onValueChange?.([Number(e.target.value)])}
        className={cn(
          "h-2 w-full appearance-none rounded-full bg-muted",
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-4",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary",
          "[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary"
        )}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
      />
    </div>
  );
}

export default Slider;
