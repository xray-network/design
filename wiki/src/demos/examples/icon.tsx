import { Icon } from "@protocol/components/icon/icon"
import { bell, envelope, paperAirplane, wallet } from "@protocol/components/icon/icons.js"
import { github, telegram, x } from "@protocol/components/icon/brands.js"
import { Button, IconButton } from "@protocol/components/button/button"
import { Row } from "../Demo"

export default function IconExample() {
  return (
    <>
      <Row>
        <Icon icon={envelope} size="sm" />
        <Icon icon={envelope} size="md" />
        <Icon icon={envelope} />
        <Icon icon={envelope} style={{ ["--x-icon-size" as string]: "28px" }} />
        <Icon icon={envelope} style={{ ["--x-icon-size" as string]: "28px", ["--x-icon-stroke" as string]: 1.25 }} />
      </Row>
      <Row>
        <Button><Icon icon={paperAirplane} size="md" />Send</Button>
        <Button variant="ghost"><Icon icon={wallet} size="md" />Receive</Button>
        <IconButton aria-label="Notifications"><Icon icon={bell} /></IconButton>
      </Row>
      <Row>
        <IconButton aria-label="XRAY on GitHub"><Icon icon={github} /></IconButton>
        <IconButton aria-label="XRAY on X"><Icon icon={x} /></IconButton>
        <IconButton aria-label="XRAY on Telegram"><Icon icon={telegram} /></IconButton>
      </Row>
    </>
  )
}
