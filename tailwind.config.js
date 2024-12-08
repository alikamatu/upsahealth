/** @type {import('tailwindcss').Config} */
module.exports = {
  rules: [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
    },
],
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        'wallpaper': "url('./dashboard/assets/wallpaper.png')",
      },
    },
  },
  plugins: [],
};
