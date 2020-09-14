import React from "react"
import { Link, RouteComponentProps } from "@reach/router"

export const HomePage: React.FC<RouteComponentProps> = () => {
  return (
    <div>
      <h1>I'm HomePage</h1>

      <Link to="registration">Go to registration page</Link>

    </div>
  )
}
