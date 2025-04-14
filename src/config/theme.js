import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#792FD2', // Purple 600
          },
          background: {
            default: '#FAFBFB', // Off-White
            paper: '#FAFBFB',   // Lavender 100
          },
          text: {
            primary: '#1C1B1E', // Charcoal
            secondary: '#5C5C5C',
          },
          info: {
            main: '#A2DBDF', // Aqua 300 (Accent)
          },
        }
      : {
          primary: {
            main: '#792FD2',
          },
          background: {
            default: '#1C1B1E',
            paper: '#2D2D2D',
          },
          text: {
            primary: '#FAFBFB',
            secondary: '#A0A0A0',
          },
          info: {
            main: '#A2DBDF',
          },
        }),
  },

  typography: {
    fontFamily: `'Satoshi', 'Arial', sans-serif`,
    h1: { fontWeight: 900, fontSize: '3rem' },
    h2: { fontWeight: 700, fontSize: '2.25rem' },
    h3: { fontWeight: 600, fontSize: '1.875rem' },
    h4: { fontWeight: 600, fontSize: '1.5rem' },
    h5: { fontWeight: 500, fontSize: '1.25rem' },
    h6: { fontWeight: 500, fontSize: '1rem' },
    body1: { fontSize: '1rem' },
    body2: { fontSize: '0.875rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 20px',
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#792FD2',
          '&:hover': {
            backgroundColor: '#5A20A6',
          },
        },
        outlinedPrimary: {
          borderColor: '#792FD2',
          color: '#792FD2',
          '&:hover': {
            backgroundColor: '#ECE3F0',
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: mode === 'light' ? '#FFFFFF' : '#2D2D2D',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? '#D0D0D0' : '#4A5568',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A2DBDF',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#792FD2',
            borderWidth: '2px',
          },
        },
        input: {
          padding: '12px 14px',
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? '#5C5C5C' : '#A0A0A0',
          '&.Mui-focused': {
            color: '#792FD2',
          },
        },
      },
    },
  },
});


export const createAppTheme = (mode = 'light') => createTheme(getDesignTokens(mode));
