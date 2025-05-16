
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format a number with commas for thousands
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num)
}

// Truncate text with ellipsis
export function truncateText(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return `${str.slice(0, maxLength)}...`
}

// Format wallet address for display
export function formatWalletAddress(address: string): string {
  if (!address) return ""
  if (address.length < 10) return address
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Generate a random color from our solana palette
export function getRandomSolanaColor(): string {
  const colors = [
    "#6E59A5", // primary
    "#9b87f5", // secondary
    "#7E69AB", // tertiary
    "#8A73B9", // quaternary
    "#A28FCD"  // quinary
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

// Create a gradient string for CSS
export function createGradient(startColor: string, endColor: string, angle = 90): string {
  return `linear-gradient(${angle}deg, ${startColor}, ${endColor})`
}

// Random animation delay for staggered animations
export function getRandomDelay(): string {
  return `${Math.random() * 0.5}s`
}

// Convert HSL color to RGB for calculations
export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return [255 * f(0), 255 * f(8), 255 * f(4)]
}
