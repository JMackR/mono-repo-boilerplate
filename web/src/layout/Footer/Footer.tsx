import React from "react"
import { useStyles } from "./Footer.styles"
import { Grid, Link } from "@material-ui/core"
import RedibsLogo from "../../stories/assets/Icon/RedibsLogo"
import Facebook from "../../stories/assets/Icon/Facebook"
import Instagram from "../../stories/assets/Icon/Instagram"

export const Footer: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.footer}>
        <div className={classes.logo}>
          <RedibsLogo />
        </div>
        <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={6}>
          <Grid item>
            <Link className={classes.link} href="tel:+1-469-551-5515">
              (469) 551-5515
            </Link>{" "}
            -{" "}
            <Link className={classes.email} href="mailto:contact@redibs.com">
              contact@redibs.com
            </Link>{" "}
            -{" "}
            <Link className={classes.link} target="_blank" href="https://goo.gl/maps/s7QGQadRsLHYghaj8">
              <span itemProp="streetAddress">7950 Legacy Drive, Plano, TX 75024 </span>
            </Link>
          </Grid>
          <Grid item>
            <Link className={classes.link} target="_blank" href="https://goo.gl/maps/s7QGQadRsLHYghaj8">
              Carrers
            </Link>{" "}
            <Link className={classes.link} target="_blank" href="https://goo.gl/maps/s7QGQadRsLHYghaj8">
              Privacy Policy
            </Link>
            <span className={classes.socialIcon}>
              <Facebook />
            </span>
            <span className={classes.socialIcon}>
              <Instagram />
            </span>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.description}>
              REDIBS operates in the state of Texas under AMWCo (TX), LLC. TREC brokerage license number 9008490. The Texas
              Real Estate Commission (TREC) regulates real estate brokers and sales agents, real estate inspectors, home
              warranty companies, easement and right-of-way agents, and timeshare interest providers. You can find more
              information and check the status of a license holder online at:{" "}
              <Link className={classes.link} target="_blank" href="https://www.trec.texas.gov/">
                www.trec.texas.gov
              </Link>
            </div>
            <div className={classes.description}>
              You can send a complaint against a license holder to TREC. A complaint form is available on the TREC website.
              TREC administers two recovery funds which may be used to satisfy a civil court judgment against a Broker, Sales
              Agent, Real Estate Inspector, or Easement or Right-Of-Way Agent, if certain requirements are met.{" "}
            </div>
            <div className={classes.description}>
              If you have questions or issues about the activities of a license holder, the complaint process or the recovery
              funds, please visit the website or contact TREC at: Texas Real Estate Commission; P.O. BOX 12188 Austin, TX
              78711-2188. Phone: 512.936.3000
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
