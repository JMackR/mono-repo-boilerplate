import React from "react"
import { Router } from "@reach/router"
import { Footer } from "@web-src/layout"
import {
  RegistrationPage,
  NotFoundPage,
  HomePage
} from "@web-pages/index"

function App() {
  return (
    <div>
      <div>
        <Router>
          <HomePage path="/" />
          <RegistrationPage path="/registration" />
          <NotFoundPage default />
        </Router>
      </div>
      <Footer />
    </div>
  )
}

export default App
