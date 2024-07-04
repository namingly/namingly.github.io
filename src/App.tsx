import * as React from "react"
import * as Base from "./base"
import "./App.css"

function App() {
  React.useRef<HTMLDivElement>(null)

  return (
    <>
      <Base.NameSearcher></Base.NameSearcher>
    </>
  )
}

export default App
