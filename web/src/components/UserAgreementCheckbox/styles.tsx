import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    label: {
      verticalAlign: 'top',
      alignItems: 'flex-start',
      margin: '35px 0 40px 0',
      [theme.breakpoints.up('sm')]: {
        margin: '40px 0 50px 0',
      },
      '& .MuiFormControlLabel-label': {
        paddingTop: '5px',
        fontSize: '17px',
        lineHeight: 1.2,
        fontWeight: 400
      }
    },
    root: {
      padding: '0 10px 0 0',
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    icon: {
      borderRadius: theme.shape.borderRadius,
      width: 30,
      height: 30,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.palette.grey.A100,
      'input:hover ~ &': {
        borderColor: theme.palette.grey.A200,
      }
    },
    checkedIcon: {
      borderColor: theme.palette.primary.main,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: "url(\"data:image/svg+xml;charset=utf8,%3Csvg width='14' height='13' viewBox='0 0 14 13' " +
        " fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.39482 7.82888L2.80845 5.65641C2.28236 4.93805" +
        " -0.459372 6.75713 0.066718 7.48128L3.02091 11.525C3.27585 11.8703 3.66331 12.1056 4.09906 12.1797C4.5348 12.2538" +
        " 4.98359 12.1608 5.34785 11.9208C5.55477 11.7834 5.72578 11.6024 5.84763 11.3917V11.3763C5.88679 11.3102 5.91996" +
        " 11.2411 5.94678 11.1697C6.56392 9.91831 9.51003 3.81995 14 0.577665C14 0.577665 8.6177 0.504283 4.39482 7.82888Z' fill='%23431AD8'/%3E%3C/svg%3E\")",
      'input:hover ~ &': {
        borderColor: theme.palette.primary.main,
      },
    },
  }),
)

export default useStyles
