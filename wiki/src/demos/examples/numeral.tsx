import { useState } from "react"
import { Numeral } from "@protocol/components/numeral/numeral"
import { Switch } from "@protocol/components/switch/switch"
import { Row } from "../Demo"

export default function NumeralExample() {
  const [masked, setMasked] = useState(false)
  return (
    <>
      <Numeral value="12,480.254221" ticker="ADA" size="hero" masked={masked} />
      <Row>
        <Numeral value="5,000.000000" ticker="NIGHT" masked={masked} />
        <Numeral value="0.04215000" ticker="BTC" size="sm" masked={masked} />
        <Numeral value="1.248300" ticker="ETH" size="sm" masked={masked} />
      </Row>
      <Switch checked={masked} onChange={(e) => setMasked(e.target.checked)}>Hide balances</Switch>
    </>
  )
}
