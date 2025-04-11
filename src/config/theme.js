import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#5A67D8',
          },
          secondary: {
            main: '#7F9CF5',
          },
          background: {
            default: '#F7FAFC',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#2D3748',
            secondary: '#718096',
          },
          success: {
            main: '#48BB78',
          },
          error: {
            main: '#F56565',
          },
          info: {
            main: '#00B5D8',
          },
        }
      : {
          primary: {
            main: '#7F9CF5',
          },
          secondary: {
            main: '#5A67D8',
          },
          background: {
            default: '#1A202C',
            paper: '#2D3748',
          },
          text: {
            primary: '#E2E8F0',
            secondary: '#A0AEC0',
          },
          success: {
            main: '#48BB78',
          },
          error: {
            main: '#F56565',
          },
          info: {
            main: '#00B5D8',
          },
        }),
  },

  typography: {
    fontFamily: `'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 800, fontSize: '3rem' },
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
    // 🌟 Buttons
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
          backgroundColor: '#5A67D8',
          '&:hover': {
            backgroundColor: '#434190',
          },
        },
        outlinedPrimary: {
          borderColor: '#5A67D8',
          color: '#5A67D8',
          '&:hover': {
            backgroundColor: '#EDF2F7',
          },
        },
      },
    },

    // 🌟 TextField / Input
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: mode === 'light' ? '#fff' : '#2D3748',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? '#CBD5E0' : '#4A5568',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: mode === 'light' ? '#A0AEC0' : '#718096',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#5A67D8',
            borderWidth: '2px',
          },
        },
        input: {
          padding: '12px 14px',
        },
      },
    },

    // Label styling for TextField
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: mode === 'light' ? '#4A5568' : '#A0AEC0',
          '&.Mui-focused': {
            color: '#5A67D8',
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode = 'light') => createTheme(getDesignTokens(mode));
