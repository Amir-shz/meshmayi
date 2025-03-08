import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f1e8e8",
          100: "#d3b9b9",
          200: "#bd9797",
          300: "#9f6767",
          400: "#8d4949",
          500: "#701c1c",
          600: "#661919",
          700: "#501414",
          800: "#3e0f0f",
          900: "#2f0c0c",
        },
      },
      fontSize: {
        // DESKTOP

        // HEADERS
        // Semi-Bold headers (i converted px to rem)
        h1_SB_desktop: ["2.281rem", { fontWeight: "600" }],
        h2_SB_desktop: ["2.027rem", { fontWeight: "600" }],
        h3_SB_desktop: ["1.802rem", { fontWeight: "600" }],
        h4_SB_desktop: ["1.602rem", { fontWeight: "600" }],
        h5_SB_desktop: ["1.424rem", { fontWeight: "600" }],
        h6_SB_desktop: ["1.266rem", { fontWeight: "600" }],
        // Bold headers (i converted px to rem)
        h1_B_desktop: ["2.281rem", { fontWeight: "700" }],
        h2_B_desktop: ["2.027rem", { fontWeight: "700" }],
        h3_B_desktop: ["1.802rem", { fontWeight: "700" }],
        h4_B_desktop: ["1.602rem", { fontWeight: "700" }],
        h5_B_desktop: ["1.424rem", { fontWeight: "700" }],
        h6_B_desktop: ["1.266rem", { fontWeight: "700" }],

        // TEXT (PARAGRAPH)
        // Regular paragraph (i converted px to rem)
        p1_R_desktop: ["1.125rem", { fontWeight: "400" }],
        p2_R_desktop: ["1.000rem", { fontWeight: "400" }],
        p3_R_desktop: ["0.889rem", { fontWeight: "400" }],
        p4_R_desktop: ["0.790rem", { fontWeight: "400" }],
        // Medium paragraph (i converted px to rem)
        p1_M_desktop: ["1.125rem", { fontWeight: "500" }],
        p2_M_desktop: ["1.000rem", { fontWeight: "500" }],
        p3_M_desktop: ["0.889rem", { fontWeight: "500" }],
        p4_M_desktop: ["0.790rem", { fontWeight: "500" }],
        // Semi-Bold paragraph (i converted px to rem)
        p1_SB_desktop: ["1.125rem", { fontWeight: "600" }],
        p2_SB_desktop: ["1.000rem", { fontWeight: "600" }],
        p3_SB_desktop: ["0.889rem", { fontWeight: "600" }],
        p4_SB_desktop: ["0.790rem", { fontWeight: "600" }],

        // LABEL
        lb1_desktop: ["0.889rem", { fontWeight: "600" }],
        lb2_desktop: ["0.79rem", { fontWeight: "600" }],

        // LINK
        link_desktop: ["0.625rem", { fontWeight: "500" }],

        // MOBILE

        // HEADERS
        // Semi-Bold headers (i converted px to rem)
        h1_SB_mobile: ["1.574375rem", { fontWeight: "600" }],
        h2_SB_mobile: ["1.475625rem", { fontWeight: "600" }],
        h3_SB_mobile: ["1.383125rem", { fontWeight: "600" }],
        h4_SB_mobile: ["1.29625rem", { fontWeight: "600" }],
        h5_SB_mobile: ["1.215rem", { fontWeight: "600" }],
        h6_SB_mobile: ["1.13875rem", { fontWeight: "600" }],
        // Bold headers (i converted px to rem)
        h1_B_mobile: ["1.574375rem", { fontWeight: "700" }],
        h2_B_mobile: ["1.475625rem", { fontWeight: "700" }],
        h3_B_mobile: ["1.383125rem", { fontWeight: "700" }],
        h4_B_mobile: ["1.29625rem", { fontWeight: "700" }],
        h5_B_mobile: ["1.215rem", { fontWeight: "700" }],
        h6_B_mobile: ["1.13875rem", { fontWeight: "700" }],

        // TEXT (PARAGRAPH)
        // Regular paragraph (i converted px to rem)
        p1_R_mobile: ["1.066875rem", { fontWeight: "400" }],
        p2_R_mobile: ["1.000rem", { fontWeight: "400" }],
        p3_R_mobile: ["0.9375rem", { fontWeight: "400" }],
        p4_R_mobile: ["0.878125rem", { fontWeight: "400" }],
        // Medium paragraph (i converted px to rem)
        p1_M_mobile: ["1.066875rem", { fontWeight: "500" }],
        p2_M_mobile: ["1.000rem", { fontWeight: "500" }],
        p3_M_mobile: ["0.9375rem", { fontWeight: "500" }],
        p4_M_mobile: ["0.878125rem", { fontWeight: "500" }],
        // Semi-Bold paragraph (i converted px to rem)
        p1_SB_mobile: ["1.066875rem", { fontWeight: "600" }],
        p2_SB_mobile: ["1.000rem", { fontWeight: "600" }],
        p3_SB_mobile: ["0.9375rem", { fontWeight: "600" }],
        p4_SB_mobile: ["0.878125rem", { fontWeight: "600" }],

        // LABEL
        lb1_mobile: ["0.878125rem", { fontWeight: "600" }],
        lb2_mobile: ["0.771875rem", { fontWeight: "600" }],
      },
    },
  },
  plugins: [],
} satisfies Config;
