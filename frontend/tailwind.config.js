export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        royal: {
          black: "#070707",
          coal: "#111111",
          gold: "#d6a84f",
          goldSoft: "#f5d58b",
          cream: "#f8f5ed"
        }
      },
      boxShadow: {
        royal: "0 24px 80px rgba(214, 168, 79, 0.16)"
      }
    }
  },
  plugins: []
};
