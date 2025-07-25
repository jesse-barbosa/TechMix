/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/*.{ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          customYellow: '#D4E300',
        },
      },
    }
  }