import { useState } from "react"
import { ApiKeys, type ApiKey } from "@protocol/blocks/api-keys/api-keys"
import { Button } from "@protocol/components/button/button"

const START: ApiKey[] = [
  { id: "1", name: "Backend, production", masked: "key_live_···· 81f2", note: "Used 2 minutes ago" },
  { id: "2", name: "Mobile app", masked: "key_live_···· 3c90", note: "Used 1 hour ago" },
  { id: "3", name: "Old staging", masked: "key_test_···· 07bd", note: "Revoked on Mar 2", revoked: true },
]

export default function ApiKeysExample() {
  const [keys, setKeys] = useState(START)
  const [creating, setCreating] = useState(false)
  const [secret, setSecret] = useState<string>()
  return (
    <div style={{ display: "grid", gap: "var(--x-space-4)", alignSelf: "stretch" }}>
      <div><Button size="sm" disabled={creating || !!secret} onClick={() => setCreating(true)}>New key</Button></div>
      <ApiKeys
        keys={keys}
        creating={creating}
        secret={secret}
        onCancel={() => setCreating(false)}
        onCreate={(name) => {
          const tail = Math.random().toString(16).slice(2, 6)
          setKeys((list) => [{ id: String(Date.now()), name, masked: `key_live_···· ${tail}`, note: "Never used" }, ...list])
          setSecret(`key_live_9f2c41b7d0a84e6f8c3d5b1a7e90${tail}`)
          setCreating(false)
        }}
        onDone={() => setSecret(undefined)}
        onRevoke={(id) => setKeys((list) => list.map((key) => (key.id === id ? { ...key, revoked: true, note: "Revoked just now" } : key)))}
      />
    </div>
  )
}
