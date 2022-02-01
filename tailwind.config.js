module.exports = {
    mode: "jit",
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./posts/**/*..{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "var(--color-bg-primary-user, var(--color-bg-primary))",
                secondary: "var(--color-bg-secondary-user, var(--color-bg-secondary))",
                textPrimary: "var(--color-text-primary-user, var(--color-text-primary))",
                textSecondary: "var(--color-text-secondary-user, var(--color-text-secondary))",
                textAccent: "var(--color-text-accent-user, var(--color-text-accent))",
            },
            textColor: {
                primary: "var(--color-text-primary-user, var(--color-text-primary))",
                secondary: "var(--color-text-secondary-user, var(--color-text-secondary))",
                accent: "var(--color-text-accent-user, var(--color-text-accent))",
            },
            colors: {
                strong: "var(--color-hover-strong-user, var(--color-hover-strong))",
                weak: "var(--color-hover-weak-user, var(--color-hover-weak))",
            },
            fontFamily: {
                heading: ["Righteous", "sans-serif"],
                body: ["Roboto", "sans-serif"],
            },
            padding: {
                "1/3": "33.33333%",
                "2/3": "66.66667%",
            },
        },
    },
    plugins: [require("@tailwindcss/aspect-ratio")],
};
