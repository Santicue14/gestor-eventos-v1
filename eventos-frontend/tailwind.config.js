/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "Blue": "#4525D1",
        "AlmostBlue": "#341CA9",
        "RealBlue": "#231381",
        "AlmostDarkBlue": "#11095A",
        "DarkBlue": "#000032",
        "TransparentGray": "rgba(73, 73, 73, 0.5)",
        "BackgroundBlue": "#374ca9",
        "BackgroundInputBlue": "#bcc7f9",
        "BackgroundLightBlue": "#c8faf9",
        "LightBlue": "#E9F1FA",
        "LightingBlue": "#00ABE4",
        "White": "#FFF"
      }
    },
  },
  plugins: [],
}

