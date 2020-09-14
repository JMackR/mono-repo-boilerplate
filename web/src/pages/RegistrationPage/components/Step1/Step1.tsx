import React, { SyntheticEvent } from "react"
import { useStyles } from "./Step1.styles"
import { UploadPhoto } from "./components/UploadPhoto"
import { Typography, Grid, Button, Link } from "@material-ui/core"
import TextField from "@web-components/TextField"

type PropsType = {
  handleNextStep: (e: SyntheticEvent) => void
}

export const Step1: React.FC<PropsType> = props => {
  const classes = useStyles()
  return (
    <div>
      <Typography variant="subtitle1" gutterBottom className={classes.basicInfo}>
        Basic info
      </Typography>
      <Grid container direction="row" alignItems="flex-start" spacing={3}>
        <Grid item>
          <TextField label="First name"></TextField>
        </Grid>
        <Grid item>
          <TextField label="Last name"></TextField>
        </Grid>
      </Grid>
      <div className={classes.marginTop}>
        <UploadPhoto
          name="Test Name"
          onUpload={value => {
            console.log(value)
          }}
        />
      </div>
      <div className={classes.marginTop}>
        <Button variant="contained" color="primary" className={classes.button}>
          Next
        </Button>
        <Link href="/" className={classes.link}>
          Skip for now
        </Link>
      </div>
    </div>
  )
}
