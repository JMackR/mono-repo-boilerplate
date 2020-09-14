import React, { useState, SyntheticEvent } from 'react'
import { Button, Typography } from '@material-ui/core'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { UserAgreementCheckbox } from '@web-components/UserAgreementCheckbox'
// import { translate } from "shared-lib"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollbar: {
      height: "368px",
      [theme.breakpoints.up('sm')]: {
        height: "368px"
      }
    },
  }),
)

type PropsType = {
  handleNextStep: (e: SyntheticEvent) => void;
};

export const Step2: React.FC<PropsType> = props => {
  const classes = useStyles()
  const [disableButton, setDisableButton] = useState(true)

  return (
    <>
      {/* <Typography>{translate('page.registration.step2.top-text')}</Typography> */}
      <Typography className="body1-big-bottom-indent" variant="body1">Please review these terms and conditions, and indicate that you’ve read, understand, and agree to them.</Typography>
      <OverlayScrollbarsComponent className={classes.scrollbar}>
        <div className="content-wrapper">
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est quisquam suscipit quos aperiam facere illo impedit tempora sunt earum unde?</p>
        </div>
      </OverlayScrollbarsComponent>
      <UserAgreementCheckbox onChange={(event) => {
        setDisableButton(!event.target.checked)
      }} />
      <Button color="primary" variant="contained" disabled={disableButton}>ACCEPT</Button>
    </>
  )
}
