/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{ 
        'pink':{
          100:'#ff738d',
          200:'#ff5374'
        }
      }      
    },
  },
  plugins: [],
}
