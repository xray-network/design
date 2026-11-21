import { Timeline } from "@protocol/components/timeline/timeline"

export default function TimelineExample() {
  return (
    <>
      <Timeline
        events={[
          { title: "Submitted", time: "14:02", dateTime: "2026-11-20T14:02" },
          { title: "Included in block 21,480,112", time: "14:03", dateTime: "2026-11-20T14:03", tone: "accent", text: "Network fee 0.00042 ETH" },
          { title: "Confirmed", time: "14:05", dateTime: "2026-11-20T14:05", tone: "success" },
          { title: "Finalized", time: "About 12 min", pending: true },
        ]}
      />
      <Timeline
        events={[
          { title: "Sign-in blocked", time: "Nov 19", dateTime: "2026-11-19", tone: "danger", text: "New device in Lisbon. You did not approve it." },
          { title: "Password reset requested", time: "Nov 18", dateTime: "2026-11-18", tone: "warning" },
          { title: "Two-factor authentication on", time: "Nov 2", dateTime: "2026-11-02" },
        ]}
      />
    </>
  )
}
