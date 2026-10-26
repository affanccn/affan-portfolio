import typography from '@tailwindcss/typography';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [typography],
};