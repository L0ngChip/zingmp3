/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js}', './public/index.html'],
    theme: {
        extend: {
            backgroundColor: {
                'main-100': '#E7EDED',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'overlay-30': 'rgba(0,0,0,0.3)',
            },
            colors: {
                'main-100': '#E7EDED',
                'main-200': '#DDE4E4',
                'main-300': '#CED9D9',
                'main-400': '#C0D8D8',
                'main-500': '#0E8080',
                'main-text': '#32323d',
                'text-secondary': '#696969',
            },
            boxShadow: {
                'header-box-shadow': '0 3px 5px rgba(0,0,0,0.08)',
            },

            keyframes: {
                'slide-right': {
                    '0%': {
                        '-webkit-transform': 'translateX(-500px);',
                        transform: 'translateX(-500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0px);',
                        transform: 'translateX(0px);',
                    },
                },
                'slide-left': {
                    '0%': {
                        '-webkit-transform': 'translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0px);',
                        transform: 'translateX(0px);',
                    },
                },
                'slide-left2': {
                    '0%': {
                        '-webkit-transform': 'translateX(500px);',
                        transform: 'translateX(500px);',
                    },
                    '100%': {
                        '-webkit-transform': 'translateX(0px);',
                        transform: 'translateX(0px);',
                    },
                },
                'rotate-center': {
                    '0%': {
                        '-webkit-transform': 'rotate(0deg);',
                        transform: 'rotate(0deg);',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(360deg);',
                        transform: 'rotate(360deg);',
                    },
                },
                'rotate-center-pause': {
                    '0%': {
                        '-webkit-transform': 'rotate(360deg);',
                        transform: 'rotate(360deg);',
                        'border-radius': '9999px',
                    },
                    '100%': {
                        '-webkit-transform': 'rotate(0deg);',
                        transform: 'rotate(0deg);',
                    },
                },
                'scale-up-center': {
                    '0%': {
                        '-webkit-transform': 'scale(0);',
                        transform: 'scale(0);',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);',
                    },
                },
                'scale-up-image': {
                    '0%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1.2);',
                        transform: 'scale(1.2);',
                    },
                },
                'scale-down-image': {
                    '0%': {
                        '-webkit-transform': 'scale(1.2);',
                        transform: 'scale(1.2);',
                    },
                    '100%': {
                        '-webkit-transform': 'scale(1);',
                        transform: 'scale(1);',
                    },
                },
                'text-focus-in': {
                    '0%': {
                        '-webkit-filter': 'blur(12px)',
                        filter: 'blur(12px)',
                        opacity: 0,
                    },
                    '100%': {
                        '-webkit-filter': 'blur(0px)',
                        filter: 'blur(0px)',
                        opacity: 1,
                    },
                },
            },
            animation: {
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'rotate-center': 'rotate-center 10s linear infinite;',
                'rotate-center-pause': 'rotate-center-pause 0.3s linear 2 both;',
                'scale-up-center': 'scale-up-center 0.3s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
                'scale-up-image': 'scale-up-image 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
                'scale-down-image': 'scale-down-image 0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
                'text-focus-in': 'text-focus-in 4s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
            },
            flex: {
                3: '3 3 0%',
                4: '4 4 0%',
                6: '6 6 0%',
                7: '7 7 0%',
            },
        },
    },
    plugins: [],
};
