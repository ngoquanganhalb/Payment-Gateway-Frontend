/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2D60FF",
        "primary-light": "#EDF0F7",
        "text-main": "#343C6A",
        "text-muted": "#718EBF",
        "bg-base": "#F5F7FA",
        border: "#E6EFF5",
        green: "#41D4A8",
        red: "#FF4B4A",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
      },
      boxShadow: {
        card: "0 4px 30px rgba(0,0,0,0.05)",
        "card-hover": "0 12px 30px rgba(45,96,255,0.15)",
      },
    },
  },
  plugins: [],
};
