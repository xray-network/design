import { Code, Kbd, Paragraph, Text, Title } from "@protocol/components/typography/typography"

export default function TypographyExample() {
  return (
    <div style={{ display: "grid", gap: "var(--x-space-3)" }}>
      <Title level={1}>Get paid faster</Title>
      <Title level={2}>Payments</Title>
      <Title level={3}>Payouts</Title>
      <Title level={4}>Pro plan</Title>
      <Text>Invoices for this period go out on the 1st.</Text>
      <Text size="sm" tone="secondary">Last updated 2 minutes ago</Text>
      <Text size="xs" tone="muted">Fees are shown before you confirm.</Text>
      <Text>
        <Text as="span" tone="success" weight="label">Paid</Text> · <Text as="span" tone="danger">Card expired</Text> · <Text as="span" weight="title">$12,480.25</Text>
      </Text>
      <Text>Use account ID <Code>acct_1Nv0FGQ9</Code>, or press <Kbd>⌘</Kbd> <Kbd>K</Kbd> to search.</Text>
      <div>
        <Paragraph size="lead">Get paid in more than 40 currencies, with payouts to your bank in two days.</Paragraph>
        <Paragraph>
          Invoices go out on the 1st of each month. Customers can pay by card or bank transfer, and you see each payment the
          moment it clears. <a href="#billing">Change your billing settings</a> at any time.
        </Paragraph>
        <Paragraph>Refunds return to the original payment method within <strong>5 to 10 business days</strong>.</Paragraph>
        <Paragraph size="lg">Each payout lists the payments it includes, so your books match your bank.</Paragraph>
        <Paragraph size="sm">Fees are shown before you confirm. Taxes may apply.</Paragraph>
      </div>
    </div>
  )
}
