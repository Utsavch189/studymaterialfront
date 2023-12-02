/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "./node_modules/tw-elements/dist/js/**/*.js",
        'node_modules/flowbite-react/lib/esm/**/*.js'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },

        },
    },
    plugins: [require("tw-elements/dist/plugin.cjs"), require('flowbite/plugin')],
}