/// <reference types="vite/client" />

declare module "*.png" {
  const value: string;
  export default value;
}

// Google Analytics gtag
interface Window {
  gtag?: (
    command: "event" | "config" | "js",
    targetId: string | Date,
    config?: Record<string, unknown>
  ) => void;
}
