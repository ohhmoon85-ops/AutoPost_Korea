import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function getChannelMaxLength(channel: string): number {
  const limits: Record<string, number> = {
    instagram: 2200,
    naver_blog: 4000,
    threads: 500,
    kakao: 1000,
  };
  return limits[channel] ?? 2000;
}
