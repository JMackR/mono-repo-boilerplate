import React from "react"
import "./Stepper.scss"

type PropsType = {
  activeStep: number
}

export const Stepper: React.FC<PropsType> = props => {
  return (
    <div className="stepper">
      <div className="stepper-icons-wrapper">
        <div className="stepper-icon active">1</div>
        <div className="stepper-icon">2</div>
        <div className="stepper-icon">3</div>

        <div className="stepper-connector">
          <div className="stepper-connector-active" style={{ width: "20%" }}></div>
        </div>
      </div>
      <div className="stepper-labels-wrapper">
        <div className="stepper-label">Account</div>
        <div className="stepper-label">Agent Profile</div>
        <div className="stepper-label">Legal Stuff</div>
      </div>
    </div>
  )
}
