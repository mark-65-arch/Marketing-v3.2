// 🎨 Tailwind CSS Configuration
// Purpose: Design system tokens, custom utilities, and performance optimization
// Features: Semantic color palette, responsive typography, custom components

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    // 🎯 Performance: Only scan files that contain Tailwind classes
  ],

  theme: {
    extend: {
      // 🎨 Brand Color System
      colors: {
        // Ocean theme palette for brand consistency
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Primary blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6', // Primary teal
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Semantic colors for better UX
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },

      // 📝 Typography Scale
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },

      fontSize: {
        // Responsive typography with optimal line heights
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '3.25rem' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // 📏 Consistent Spacing Scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },

      // 🎭 Custom Border Radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      // 🌟 Custom Shadows
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.15)',
      },

      // 🎨 Custom Gradients
      backgroundImage: {
        'gradient-ocean': 'linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },

      // ⚡ Animation & Transitions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },

      // 📱 Custom Breakpoints
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // 🎯 Custom Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
          '2xl': '3rem',
        },
      },
    },
  },

  plugins: [
    // 🎨 Custom component classes
    function({ addComponents, theme }) {
      addComponents({
        // Button components
        '.btn-primary': {
          '@apply bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-200 shadow-md': {},
        },
        '.btn-secondary': {
          '@apply bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-blue-200': {},
        },

        // Card components
        '.card-glass': {
          '@apply bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50': {},
        },
        '.card-featured': {
          '@apply bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-2xl shadow-xl border border-blue-500/30': {},
        },

        // Form components
        '.form-input': {
          '@apply w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 transition-all duration-200 placeholder-gray-500': {},
        },

        // Organic shapes
        '.organic-blob': {
          'border-radius': '30% 70% 70% 30% / 30% 30% 70% 70%',
        },
        '.organic-droplet': {
          'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
        },
        '.organic-leaf': {
          'border-radius': '20% 80% 20% 80% / 80% 20% 80% 20%',
        },

        // Gradient backgrounds
        '.gradient-ocean': {
          'background': 'linear-gradient(135deg, #0c4a6e, #3b82f6)',
        },
        '.gradient-ocean-teal': {
          'background': 'linear-gradient(135deg, #3b82f6, #14b8a6)',
        },

        // Typography utilities
        '.text-gradient': {
          '@apply bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent': {},
        },
        '.heading-xl': {
          '@apply font-heading font-black text-4xl md:text-5xl lg:text-6xl leading-tight': {},
        },
        '.heading-lg': {
          '@apply font-heading font-bold text-2xl md:text-3xl lg:text-4xl leading-tight': {},
        },
        '.heading-md': {
          '@apply font-heading font-bold text-xl md:text-2xl lg:text-3xl leading-tight': {},
        },

        // Layout utilities
        '.section-padding': {
          '@apply py-16 md:py-20 lg:py-24': {},
        },
        '.container-padding': {
          '@apply px-4 sm:px-6 lg:px-8': {},
        },

        // Animation utilities
        '.animate-on-scroll': {
          'opacity': '0',
          'transform': 'translateY(20px)',
          'transition': 'all 0.6s ease-out',
        },
        '.animate-on-scroll.in-view': {
          'opacity': '1',
          'transform': 'translateY(0)',
        },
      })
    },

    // 🎯 Custom utilities
    function({ addUtilities, theme }) {
      addUtilities({
        // Backdrop blur utilities
        '.backdrop-blur-xs': {
          'backdrop-filter': 'blur(2px)',
          '-webkit-backdrop-filter': 'blur(2px)',
        },
        '.backdrop-blur-sm': {
          'backdrop-filter': 'blur(4px)',
          '-webkit-backdrop-filter': 'blur(4px)',
        },

        // Scroll behavior
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },

        // Text shadow utilities
        '.text-shadow': {
          'text-shadow': '0 2px 4px rgba(0,0,0,0.1)',
        },
        '.text-shadow-lg': {
          'text-shadow': '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },

        // Performance utilities
        '.gpu-accelerated': {
          'will-change': 'transform',
          'transform': 'translateZ(0)',
        },
      })
    }
  ],

  // 🎯 Performance: Minimize unused CSS
  corePlugins: {
    // Remove unused plugins for better performance
    aspectRatio: false, // Use modern aspect-ratio CSS property
  },

  // 🔧 Future-proofing
  future: {
    hoverOnlyWhenSupported: true,
  },
}