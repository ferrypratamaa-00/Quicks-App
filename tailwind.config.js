/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,jsx}",
        "./components/**/*.{js,jsx}",
        "./app/**/*.{js,jsx}",
        "./src/**/*.{js,jsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
            colors: {
                primary: {
                    DEFAULT: "#2F80ED",
                    dark: "#4F4F4F",
                    grey: "#828282",
                    light: "#E0E0E0",
                },
                indicator: {
                    purple: "#8785FF",
                    red: "#EB5757",
                    yellow: "#F2C94C",
                    orange: "#F8B76B",
                },
                "chat-badge": {
                    green: "#43B78D",
                    purple: "#9B51E0",
                    orange: "#E5A443",
                },
                chat: {
                    lightPurple: "#EEDCFF",
                    lightGreen: "#D2F2EA",
                    lightOrange: "#FCEED3",
                },
                stiker: {
                    lightOrange: "#FDCFA4",
                    lightGreen: "#AFEBDB",
                    lightPurple: "#CFCEF9",
                    lightPink: "#F9E0FD",
                    lightBlue: "#E9F3FF",
                    yellow: "#F9E9C3",
                    green: "#CBF1C2",
                },
            },
            fontFamily: {
                sans: ["Lato", "sans-serif"],
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
