import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            danger: string;
            input: string;
			inputText: string;
        };
    }

    interface PaletteOptions {
        custom?: {
            danger?: string;
            input?: string;
			inputText?: string;
        };
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#654321',
        },
        secondary: {
            main: '#A0A797',
        },
        background: {
            default: '#FFF',
        },
        custom: {
            danger: '#FF0000',
            input: '#747D67',
			inputText: 'black'
        },
    },
    typography: {
        fontFamily: '"Tektur", "Helvetica", "Arial", sans-serif',
		button: {
			textTransform: 'none'
		}
    },
});

export default theme;
