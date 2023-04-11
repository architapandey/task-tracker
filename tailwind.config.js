/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

module.exports = {
  darkMode: "class",
  content: [
    "./node_modules/@rhythm-ui/react/lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        secondary: colors.gray,
        info: colors.blue,
        success: colors.green,
        warning: colors.amber,
        danger: colors.red,
        gray: colors.gray,
        dark: colors.neutral,
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      selectStyles: {
        background: colors.white,
        borderRadius: defaultTheme?.borderRadius.lg,
        padding: "2px 4px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({ strategy: "class" }),
    require("@tailwindcss/typography"),
  ],
};
