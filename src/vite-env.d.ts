
/// <reference types="vite/client" />

// Extend the Window interface to include Buffer
interface Window {
  Buffer: typeof Buffer;
  global: Window;
}

declare global {
  interface Window {
    Buffer: typeof Buffer;
    global: Window;
  }
}
