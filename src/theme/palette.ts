import { colors } from './colors'

const palette = {
  primary: {
    light: colors.blue[300],
    main: colors.blue[500],
    dark: colors.blue[700],
    contrastText: colors.base.white,
  },
  secondary: {
    light: colors.amber[300],
    main: colors.amber[500],
    dark: colors.amber[700],
    contrastText: colors.base.black,
  },
  error: {
    main: colors.red[500],
  },
  warning: {
    main: colors.orange[500],
  },
  info: {
    main: colors.cyan[500],
  },
  success: {
    main: colors.green[500],
  },
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[600],
  },
  background: {
    default: colors.gray[50],
    paper: colors.base.white,
  },
  ...colors,
}

export default palette
