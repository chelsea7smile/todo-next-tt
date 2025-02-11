import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    'custom-toast',
    'custom-toast-error',
  ],
  theme: {
    extend: {
      keyframes: {
        strikeIn: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        strikeIn: "strikeIn 0.5s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-out forwards",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;