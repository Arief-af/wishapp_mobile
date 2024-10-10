/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'dark': '#202020',
        'dark-cover': "#0C0C0C",
        'primary': '#21BF73'
      },
      textColor: {
        'primary': '#21BF73',
        'dark': '#202020',
        'dark-cover': "#0C0C0C",
      }
    },
  },
  plugins: [require('daisyui'),],
  daisyui: {
    themes:["light","dark"],
  },
}