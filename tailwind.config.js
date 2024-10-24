/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
   darkMode: "class",
   theme: {
      extend: {
         colors: {
            primary: "#333",
         },
      },
      fontFamily: {
         rock: ["RockSalt-Regular", "sans-serif"],
      },
   },
   plugins: [],
}
