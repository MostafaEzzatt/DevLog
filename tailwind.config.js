module.exports = {
  mode: "jit",
  purge: ["./src/**/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        elephant: "#0E2439",
        "cornflower-blue": "#5AA3ED",
        "bermuda-gray": "#6B8AA8",
        "rock-blue": "#9CB3C9",
        "cloud-burst": "#1F364D",
        cranberry: "#E052A0",
        flamingo: "#F15C41",
      },
      minHeight: {
        screen: "calc(100vh - 58px)",
      },
    },
  },
  variants: {},
  plugins: [],
};
