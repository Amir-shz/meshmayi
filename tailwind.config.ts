import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#f1e8e8',
  				'100': '#d3b9b9',
  				'200': '#bd9797',
  				'300': '#9f6767',
  				'400': '#8d4949',
  				'500': '#701c1c',
  				'600': '#661919',
  				'700': '#501414',
  				'800': '#3e0f0f',
  				'900': '#2f0c0c',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontSize: {
  			h1_SB_desktop: [
  				'2.281rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h2_SB_desktop: [
  				'2.027rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h3_SB_desktop: [
  				'1.802rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h4_SB_desktop: [
  				'1.602rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h5_SB_desktop: [
  				'1.424rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h6_SB_desktop: [
  				'1.266rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h1_B_desktop: [
  				'2.281rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h2_B_desktop: [
  				'2.027rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h3_B_desktop: [
  				'1.802rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h4_B_desktop: [
  				'1.602rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h5_B_desktop: [
  				'1.424rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h6_B_desktop: [
  				'1.266rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			p1_R_desktop: [
  				'1.125rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p2_R_desktop: [
  				'1.000rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p3_R_desktop: [
  				'0.889rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p4_R_desktop: [
  				'0.790rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p1_M_desktop: [
  				'1.125rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p2_M_desktop: [
  				'1.000rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p3_M_desktop: [
  				'0.889rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p4_M_desktop: [
  				'0.790rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p1_SB_desktop: [
  				'1.125rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			p2_SB_desktop: [
  				'1.000rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			p3_SB_desktop: [
  				'0.889rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			p4_SB_desktop: [
  				'0.790rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			lb1_desktop: [
  				'0.889rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			lb2_desktop: [
  				'0.79rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			link_desktop: [
  				'0.625rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			h1_SB_mobile: [
  				'1.574375rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h2_SB_mobile: [
  				'1.475625rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h3_SB_mobile: [
  				'1.383125rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h4_SB_mobile: [
  				'1.29625rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h5_SB_mobile: [
  				'1.215rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h6_SB_mobile: [
  				'1.13875rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			h1_B_mobile: [
  				'1.574375rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h2_B_mobile: [
  				'1.475625rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h3_B_mobile: [
  				'1.383125rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h4_B_mobile: [
  				'1.29625rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h5_B_mobile: [
  				'1.215rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			h6_B_mobile: [
  				'1.13875rem',
  				{
  					fontWeight: '700'
  				}
  			],
  			p1_R_mobile: [
  				'1.066875rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p2_R_mobile: [
  				'1.000rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p3_R_mobile: [
  				'0.9375rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p4_R_mobile: [
  				'0.878125rem',
  				{
  					fontWeight: '400'
  				}
  			],
  			p1_M_mobile: [
  				'1.066875rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p2_M_mobile: [
  				'1.000rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p3_M_mobile: [
  				'0.9375rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p4_M_mobile: [
  				'0.878125rem',
  				{
  					fontWeight: '500'
  				}
  			],
  			p1_SB_mobile: [
  				'1.066875rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			p2_SB_mobile: [
  				'1.000rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			p3_SB_mobile: [
  				'0.9375rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			p4_SB_mobile: [
  				'0.878125rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			lb1_mobile: [
  				'0.878125rem',
  				{
  					fontWeight: '600'
  				}
  			],
  			lb2_mobile: [
  				'0.771875rem',
  				{
  					fontWeight: '600'
  				}
  			]
  		},
  		boxShadow: {
  			'3': '2px 2px 6px 0px rgba(23, 23, 23, 0.16)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
