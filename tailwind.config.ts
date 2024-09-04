import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "bg-color-default": "#f9fafa",
        "color-text-base": "#11111A",
        "color-text-alt": "#5E5E5E",
        "color-primary": "#6100FF",
        "color-secondary": "#f0e8fc",
      },
      boxShadow: {
        "card-shadow": "2px 1px 20px 0px #0000000D",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        sm: ["14px", "20px"],
        base: ["16px", "24px"],
        md: ["18px", "24px"],
        lg: ["20px", "28px"],
        xl: ["24px", "32px"],
        "2xl": ["32px", "32px"],
      },
    },
  },
  plugins: [],
} satisfies Config;
