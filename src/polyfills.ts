
// Buffer polyfill for Solana libraries
import { Buffer } from 'buffer';

window.Buffer = Buffer;

// Ensure global is defined for web3.js
if (typeof window.global === 'undefined') {
  window.global = window;
}
