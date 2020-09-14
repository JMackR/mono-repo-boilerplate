import React from 'react'

import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import clsx from 'clsx'

import useStyles from './styles'

export const UserAgreementCheckbox: React.FC<CheckboxProps> = (props) => {
  const classes = useStyles()

  return <FormControlLabel
    className={classes.label}
    control={
      <Checkbox
        className={classes.root}
        disableRipple
        color="default"
        checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
        icon={<span className={classes.icon} />}
        inputProps={{ 'aria-label': 'decorative checkbox' }}
        {...props}
      />
    }
    label="I have read, understand, and agree to these terms and conditions."
  />
}
