/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "outfit": ['Outfit', 'sans-serif']
    },
    colors: {
      "content-background": "rgba(106, 126, 127, 0.5)",
      "content-background-hover" : "rgba(99,114,115,0.3)",
      "background" : "rgba(36, 1, 75, 1)",
      "background-opacity" : "rgba(36, 1, 75, 0.8)",
      "background-complementary" : "rgba(133, 0, 230, 1)",
      "background-complementary-opacity" : "rgba(133, 0, 230, 0.6)",
      
    }
    },
  },
  plugins: [],
}

