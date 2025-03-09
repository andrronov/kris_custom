import baseConfig from "../codestyle/config-prettier/index.js";

const config = {
  ...baseConfig,
  tailwindConfig: "./tailwind.config.ts",
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;