import typography from "@tailwindcss/typography";
import daisyui from "daisyui";
import type { Config } from "tailwindcss";

const GENERAL_CONFIG = {
  secondary: "#FFB600",
  "secondary-content": "#FDFEFE",

  info: "#3abff8",
  "info-content": "#ffffff",
  error: "#ef4444",
  "error-content": "#ffffff",
  success: "#22c55e",
  "success-content": "#ffffff",
  warning: "#fbbd23",
  "warning-content": "#ffffff",

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
        "dark-purple": "#280B3D",
        "light-yellow": "#F6C565",
        "light-violet": "#F2EAF8",
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
          accent: "hsl(0, 0%, 0%)",
          primary: "hsl(274, 65%, 32%)",
          "primary-content": "hsl(0, 0%, 100%)",
          "base-100": "hsl(220, 33%, 97%)",
          "base-200": "hsl(0, 0%, 100%)",
          "base-300": "hsl(220, 33%, 93%)",
          "base-content": "hsl(220, 33%, 15%)",
          neutral: "hsl(0, 0%, 95%)",
          "neutral-content": "hsl(0, 0%, 30%)",
          "neutral-focus": "hsl(0, 0%, 80%)",
        },
      },
      {
        dark: {
          ...GENERAL_CONFIG,
          accent: "hsl(180, 0%, 100%)",
          primary: "hsl(258, 100%, 87%)",
          "primary-content": "hsl(0, 0%, 0%)",
          "base-100": "hsl(0, 0%, 3%)",
          "base-200": "hsl(0, 0%, 7%)",
          "base-300": "hsl(0, 0%, 11%)",
          "base-content": "hsl(220, 15%, 90%)",
          neutral: "hsl(0, 1%, 15%)",
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
