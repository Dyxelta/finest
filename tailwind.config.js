import withMT from "@material-tailwind/react/utils/withMT";
import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = withMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                roboto: ["Roboto", "sans-serif"],
                dancing: ["Dancing Script", "cursive"],
                vina: ["Vina Sans", "sans-serif"],
                alfa: ["Alfa Slab One", "serif"],
                oxanium: ["Oxanium", "sans-serif"],
            },

            colors: {
                primary: "#2D5074",
                "darker-primary": "#1B3046",
                "lighter-primary": "#CAD8E7",
                light: "#FDFDFD",
                dark: "#202020",
                grey: "#8F8F8F",
                "light-grey": "#C6C6C6",
                "dark-grey": "#585858",
                background: "#EBF0F6",
                income: "#317E3D",
                warning: "#ECE41D",
                expense: "#C02317",
                "off-white": "#E5E5E5",
            },
            screens: {
                tablet: "950px",
                large: "1200px",
            },
        },
    },

    plugins: [forms],
});

export default tailwindConfig;
