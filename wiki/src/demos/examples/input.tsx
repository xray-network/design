import { useState } from "react"
import { Button } from "@protocol/components/button/button"
import { Field, Input, TextArea, TextField } from "@protocol/components/input/input"

const Icon = ({ d }: { d: string }) => <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
const ICONS = {
  search: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
}

export default function InputExample() {
  const [note, setNote] = useState("")
  const [touched, setTouched] = useState(false)
  const error = touched && note.length > 64 ? `Notes are limited to 64 characters (${note.length})` : undefined
  return (
    <>
      <TextField label="To" placeholder="name@company.com" hint="We send the invoice here" spellCheck={false} autoComplete="off" />
      <TextField
        label="Amount"
        size="lg"
        inputMode="decimal"
        placeholder="0.00"
        hint="Available $12,480.25"
        suffix={<><Button variant="chip">Max</Button><span className="x-input-affix">USD</span></>}
      />
      <TextField
        label="Note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder="Type more than 64 characters, then leave the field"
        error={error}
      />
      <Field label="Message" hint="Shown on the invoice to your customer">{(p) => <TextArea {...p} placeholder="Attach a note to this payment" />}</Field>
      <Input size="sm" aria-label="Search mini apps" placeholder="Search mini apps" prefix={<Icon d={ICONS.search} />} />
    </>
  )
}
