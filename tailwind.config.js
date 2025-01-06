/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        anuphan: ["Anuphan", "sans-serif"],
      },
      colors: {
        primary: "#C19D60",
        secondary: "#F2EEE9",
      },
    },
  },
  plugins: [],
};
