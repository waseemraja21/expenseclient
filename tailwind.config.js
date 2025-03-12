/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // Enables dark mode via a CSS class
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Ensures Tailwind scans your files
    theme: {
        extend: {},
    },
    plugins: [],
};
