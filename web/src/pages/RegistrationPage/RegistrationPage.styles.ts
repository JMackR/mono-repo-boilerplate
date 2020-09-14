import { createStyles, Theme, makeStyles, withStyles } from "@material-ui/core/styles"
import StepConnector from "@material-ui/core/StepConnector"

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: theme.spacing(6),
      paddingTop: "3rem",
      "& .MuiButton-root": {
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      },
    },

    myAccount: {
      fontWeight: "bold",
      fontSize: 26,
      lineHeight: 2,
      color: "#000000",
    },
    basicInfo: {
      fontWeight: "bold",
      fontSize: 20,
      lineHeight: 2,
      color: "#000000",
    },
    stepperRoot: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  }),
)

export const QontoConnector = withStyles({
  alternativeLabel: {
    top: 15,
  },
  active: {
    "& $line": {
      backgroundImage: "linear-gradient( 95deg,rgb(73,206,171) 0%,rgb(73,206,171) 50%,rgb(73,206,171) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage: "linear-gradient( 95deg,rgb(73,206,171) 0%,rgb(73,206,171) 50%,rgb(73,206,171) 100%)",
    },
  },
  line: {
    height: 4,
    border: 0,
    paddingLeft: 0,
    backgroundColor: "#DAE9E5",
    borderRadius: 4,
  },
})(StepConnector)

export const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#DAE9E5;",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    fontWeight: "bold",
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage: "linear-gradient( 136deg, rgb(73,206,171) 0%, rgb(73,206,171) 50%, rgb(73,206,171) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage: "linear-gradient( 136deg, rgb(73,206,171) 0%, rgb(73,206,171) 50%, rgb(73,206,171) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    color: "#fff",
  },
})
