import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const GENERAL_CONFIG = {
  secondary: "#F8B6C2",
  "secondary-content": "#FFFFFF",

  info: "#F9A8D4",
  "info-content": "#610e3b",
  error: "#F43F5E",
  "error-content": "#FFFFFF",
  success: "#14b850",
  "success-content": "#FFFFFF",
  warning: "#FB923C",
  "warning-content": "#FFFFFF",

  "--tab-radius": ".5rem",
};

export default {
  content: [
    "./src/**/*.{js,vue,ts,tsx}",
    "node_modules/daisyui/dist/**/*.{css,js}",
  ],

  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0.7rem",
      },
    },
    extend: {
      colors: {
        "rose-light": "#FFC0CB",
        "rose-dark": "#D81B60",
        "rose-muted": "#FADADD",
      },
      width: {
        88: "22rem",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        xxs: ".55rem",
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.5715" }],
        base: ["1rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        lg: ["1.125rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        xl: ["1.25rem", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        "2xl": ["1.5rem", { lineHeight: "1.415", letterSpacing: "-0.01em" }],
        "2.5xl": ["1.75rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
        "3xl": ["1.875rem", { lineHeight: "1.333", letterSpacing: "-0.01em" }],
        "4xl": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "5xl": ["2.75rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "6xl": ["3.25rem", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.4em",
      },
      margin: {
        22: "5.6rem",
      },
      padding: {
        22: "5.6rem",
      },
      keyframes: {
        fade: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeIn: {
          from: {
            scale: "0.95",
            transform: "translate3d(0, 5px, 0)",
            opacity: "0",
          },
          to: {
            scale: "1",
            transform: "translate3d(0, 0px, 0)",
            opacity: "1",
          },
        },
        fadeOut: {
          from: {
            transform: "translate3d(0, 0, 0)",
            opacity: "1",
          },
          to: {
            transform: "translate3d(0, 5px, 0)",
            opacity: "0",
          },
        },
        shine: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "marquee-right": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "marquee2-right": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        fade: "fade 0.3s ease-in-out",
        fadeIn: "fadeIn 0.2s ease-in-out",
        fadeOut: "fadeOut 0.2s ease-in-out",
        shine: "shine 6s linear infinite",
        marquee: "marquee 70s linear infinite",
        "marquee-right": "marquee-right 70s linear infinite",
        marquee2: "marquee2 70s linear infinite",
        "marquee2-right": "marquee2-right 70s linear infinite",
      },
      borderRadius: {
        default: "0.5rem",
        avatar: "0.25rem",
      },
    },
  },

  daisyui: {
    styled: true,
    themes: [
      {
        light: {
          ...GENERAL_CONFIG,
          accent: "#FF007F",
          "accent-content": "#FFFFFF",
          primary: "#FF66B2",
          "primary-content": "#5E003E",
          secondary: "#FF9AC2",
          "secondary-content": "#5E003E",
          neutral: "#FCEEF3",
          "neutral-content": "#5E003E",
          "base-100": "#FFF5FA",
          "base-200": "#FCEEF3",
          "base-300": "#FAD1DC",
          "base-content": "#5E003E",
        },
      },
      {
        dark: {
          ...GENERAL_CONFIG,
          accent: "#FFFFFF",
          "accent-content": "#94004A",
          primary: "#FF007F",
          "primary-content": "#FFCCE5",
          secondary: "#FF66B2",
          "secondary-content": "#1E1E1E",
          neutral: "#2A2A2A",
          "neutral-content": "#FFCCE5",
          "base-100": "#1E1E1E",
          "base-200": "#2A2A2A",
          "base-300": "#3A3A3A",
          "base-content": "#FFCCE5",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },

  plugins: [typography, daisyui],
} satisfies Config;
