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
            },

            flex: {
                4: '4 4 0%',
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
            },
            animation: {
                'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
                'rotate-center': 'rotate-center 10s linear infinite;',
                'rotate-center-pause': 'rotate-center-pause 0.3s linear 2 both;',
            },
        },
    },
    plugins: [],
};
