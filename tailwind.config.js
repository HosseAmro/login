/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#000720",
        "bg-test": "#ff0037",
        blue0: "#38a1d1",
      },
      borderRadius: {
        larger: "2rem",
      },
      width:{
        '30':'30rem',
      },
      fontSize: {
        '4xl' : ['2rem', 'normal'],
        
      }
    },
  },
  plugins: [],
};
