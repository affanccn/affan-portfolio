export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}