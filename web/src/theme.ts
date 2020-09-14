import { createMuiTheme } from "@material-ui/core"

const theme = createMuiTheme({
  // https://material-ui.com/customization/default-theme/
  palette: {
    primary: {
      main: "#431ad8",
    },
    secondary: {
      main: "#f4f6f8",
    },
    grey: {
      // 50: '#000',
      // 100: '#000',
      // 200: '#000',
      // 300: '#000',
      // 400: '#000',
      // 500: '#000',
      // 600: '#000',
      // 700: '#000',
      // 800: '#000',
      // 900: '#000',
      A100: "#B4C2CF",
      A200: "#859cb1",
      // A400: '#000',
      // A700: '#000'
    },
    text: {
      primary: "#100D23",
      secondary: "#5B6F80",
    },
  },
  typography: {
    fontFamily: "'Mulish', sans-serif",
    body1: {
      fontWeight: 300,
      fontSize: "20px",
      lineHeight: 1.2,
    },
  },
  overrides: {
    // Style sheet name ⚛️
    // MuiTypography: {
    //   body1: {
    //     marginBottom: "25px",
    //   },
    // },
    MuiButton: {
      // Name of the rule
      root: {
        minWidth: "183px",
        fontWeight: 700,
        fontSize: "16px",
        textTransform: "uppercase",
      },
      text: {
        // Some CSS
      },
    },
  },
})

export default theme
