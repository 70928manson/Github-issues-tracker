import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "primaryPurple": "var(--primaryPurple)",
        "black-1": "var(--black-1)",
        "black-2": "var(--black-2)",
        "bg-1": "var(--bg-1)",
        "bg-2": "var(--bg-2)",
        "bg-3": "var(--bg-3)",
        "gray-1": "var(--gray-1)",
        "gray-2": "var(--gray-2)",
        "black": "var(--black)",
        "white": "var(--white)",
        "background-color": "var(--bg-1)",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      opacity: {
        '5': '.5',
      },
      spacing: {
        '8rem': "0.8rem",
      },
      fontSize: {
        '16rem': "1.6rem",
      },
    },
  },
  plugins: [],
}
export default config
