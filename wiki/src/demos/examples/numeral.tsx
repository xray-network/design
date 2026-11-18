import { useState } from "react"
import { Numeral } from "@protocol/components/numeral/numeral"
import { Switch } from "@protocol/components/switch/switch"
import { Row } from "../Demo"

export default function NumeralExample() {
  const [masked, setMasked] = useState(false)
  return (
    <>
      <Numeral value="12,480.25" ticker="USD" size="hero" masked={masked} />
      <Row>
        <Numeral value="5,000.00" ticker="EUR" masked={masked} />
        <Numeral value="1,250.00" ticker="GBP" size="sm" masked={masked} />
        <Numeral value="184,500" ticker="JPY" size="sm" masked={masked} />
      </Row>
      <Switch checked={masked} onChange={(e) => setMasked(e.target.checked)}>Hide balances</Switch>
    </>
  )
}
