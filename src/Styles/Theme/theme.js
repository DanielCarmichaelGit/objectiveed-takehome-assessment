import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'purple',
          height: "30px",
          '&:hover': {
            backgroundColor: 'rgba(128, 0, 128, 0.1)',
          },
          '&:hover .MuiIcon-root': {
            color: 'orange',
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused:after': {
            borderBottomColor: '#f1f1f1',
          },
          '&.MuiInput-underline:before': {
            borderBottomColor: '#333',
          },
        },
        input: {
          fontSize: '17px',
          padding: '14px 14px',
          backgroundColor: 'white',
          borderRadius: '5px',
          border: '1px solid transparent',
          maxHeight: '50px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '17px',
          '&.Mui-focused': {
            color: '#333',
          },
        },
      },
    },
  },
});

export default theme;
