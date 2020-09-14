import React, { useState } from 'react'
import { Link as RouterLink } from '@reach/router'
import { Button, Typography, Link, Grid } from '@material-ui/core'
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles'
import { spacing } from '@material-ui/system'
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
    link: {
      fontSize: '16px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    button: {
      marginBottom: "20px",
      [theme.breakpoints.up("sm")]: {
        marginBottom: "40px",
      },
    },
  }),
)

type PropsType = {
  value?: number;
};

export const Step4: React.FC<PropsType> = (props) => {
  const classes = useStyles()
  const [disableButton, setDisableButton] = useState(true)

  return (
    <>
      <Typography className="body1-big-bottom-indent" variant="body1">Watch this 2-minute program overview to learn many Redibs agents <strong>earn more money by doubling their buyer retention rates.</strong></Typography>

      <a href="#0" target="_blank" className="video-preview">
        <img src="https://fakeimg.pl/600x208/" alt="Image alt" />
      </a>

      <Typography className="body1-bottom-indent" variant="body1">Agent Participation Agreement</Typography>
      <ul className="styled-ul-list">
        <li>By signing up, agent is allowed to participate in the Redibs program but has no obligation to do so</li>
        <li>There are absolutely no fees required to participate; nothing up-front, nothing recurring, no subscription to cancel later</li>
        <li>A Forward Listing Right (FLR) Agreement pays you twice</li>
        <li>In exchange for this guarantee, the Agent will pay Redibs a referral fee of 35-45% of their future commission</li>
      </ul>

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
      <Button color="primary" variant="contained" disabled={disableButton} className={classes.button}>ACCEPT</Button>
      <br />
      <Grid
        container
        alignItems="center"
        justify="space-between"
      >
        <Link
          underline="always"
          component={RouterLink}
          to="/"
          className={classes.link}
        >With prop forwarding</Link>
        <Link
          underline="always"
          component={'span'}
          className={classes.link}
          color="textSecondary"
        >Skip for now</Link>
      </Grid>
    </>
  )
}
