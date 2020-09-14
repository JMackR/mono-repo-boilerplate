import React, { useState, SyntheticEvent } from "react"
import { RouteComponentProps, navigate } from "@reach/router"
import { Container, Grid, Typography } from "@material-ui/core"
import { Header, Step1, Step2, Step3, Step4, Stepper } from "./components"
import { useStyles } from "./RegistrationPage.styles"

export const RegistrationPage: React.FC<RouteComponentProps> = () => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const stepsLength = 4

  const handleNextStep = (e: SyntheticEvent) => {
    e.preventDefault()
    if (activeStep < stepsLength) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrevStep = (e: SyntheticEvent) => {
    e.preventDefault()
    if (activeStep > 0) {
      setActiveStep(activeStep - 1)
    } else {
      navigate("/")
    }
  }

  return (
    <>
      <Header handlePrevStep={handlePrevStep} />
      <div className={classes.root}>
        <Container>
          <Grid container direction="row" justify="center" alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom className={classes.myAccount}>
                {(activeStep === 0 || activeStep === 1 || activeStep === 2) && "My account"}
                {activeStep === 3 && "Agent profile"}
                {activeStep === 4 && "Legal stuff"}
              </Typography>

              <Stepper activeStep={activeStep} />
              {activeStep === 0 && <Step1 handleNextStep={handleNextStep} />}
              {activeStep === 1 && <Step2 handleNextStep={handleNextStep} />}
              {activeStep === 2 && <Step3 handleNextStep={handleNextStep} value={123} />}
              {activeStep === 3 && <Step4 value={123} />}
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  )
}
