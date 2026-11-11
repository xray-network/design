import type { ReactNode } from "react"

import "./showcase.css"

type ThemePairProps = {
  label: string
  children: ReactNode
}

function ThemePair({ label, children }: ThemePairProps) {
  return (
    <div className="xray-reference" aria-label={`${label} in light and dark themes`}>
      <section className="xray-stage xray-stage--light">
        <span className="xray-stage__label">Light</span>
        {children}
      </section>
      <section className="xray-stage xray-stage--dark">
        <span className="xray-stage__label">Dark</span>
        {children}
      </section>
    </div>
  )
}

export function ReferenceStatus() {
  return (
    <aside className="xray-reference-status">
      <strong>Protocol specimen</strong>
      <span>
        Target package: <code>@xray-network/xray-ui</code>. The package is not published yet, so
        this page documents the required visual contract rather than a production implementation.
      </span>
    </aside>
  )
}

export function ButtonShowcase() {
  return (
    <ThemePair label="Button">
      <div className="xray-stack">
        <div className="xray-row">
          <button className="xray-button xray-button--primary" type="button">Primary</button>
          <button className="xray-button xray-button--gray" type="button">Gray</button>
          <button className="xray-button xray-button--outline" type="button">Outline</button>
          <button className="xray-button xray-button--success" type="button">Success</button>
        </div>
        <div className="xray-row">
          <button className="xray-button xray-button--primary xray-button--focus" type="button">Focus visible</button>
          <button className="xray-button xray-button--primary" type="button" disabled>Disabled</button>
        </div>
      </div>
    </ThemePair>
  )
}

export function TagShowcase() {
  return (
    <ThemePair label="Tag and badge">
      <div className="xray-stack">
        <div className="xray-row">
          <span className="xray-tag xray-tag--preview">preview</span>
          <span className="xray-tag xray-tag--mainnet">mainnet</span>
          <span className="xray-tag xray-tag--beta">beta</span>
        </div>
        <div className="xray-row">
          <span className="xray-status"><i className="xray-dot xray-dot--online" />Online</span>
          <span className="xray-status"><i className="xray-dot xray-dot--down" />Down</span>
          <span className="xray-status"><i className="xray-dot xray-dot--slow" />Slow</span>
          <span className="xray-delta xray-delta--positive">+12.8%</span>
          <span className="xray-delta xray-delta--negative">−4.2%</span>
        </div>
      </div>
    </ThemePair>
  )
}

function Avatar({ palette, label }: { palette: string; label: string }) {
  return (
    <div className={`xray-avatar xray-avatar--${palette}`} role="img" aria-label={`${label} account avatar`}>
      <span /><span /><span /><span />
    </div>
  )
}

export function AccountAvatarShowcase() {
  return (
    <ThemePair label="Account Avatar">
      <div className="xray-avatar-list">
        {[["ada", "ADA"], ["btc", "BTC"], ["night", "NIGHT"], ["xray", "XRAY"], ["cool", "Cool"]].map(([palette, label]) => (
          <div className="xray-avatar-item" key={palette}>
            <Avatar palette={palette} label={label} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </ThemePair>
  )
}

function AssetRow({ filled, negative }: { filled?: boolean; negative?: boolean }) {
  return (
    <div className={`xray-asset-row ${filled ? "xray-asset-row--filled" : ""}`}>
      <Avatar palette={negative ? "btc" : "ada"} label={negative ? "BTC" : "ADA"} />
      <div className="xray-asset-row__identity">
        <strong>{negative ? "BTC" : "ADA"}</strong>
        <span>{negative ? "Bitcoin" : "Cardano"}</span>
      </div>
      <div className="xray-asset-row__balance">
        <strong>{negative ? "0.4821" : "12,842.91"}</strong>
        <span className={`xray-delta ${negative ? "xray-delta--negative" : "xray-delta--positive"}`}>
          {negative ? "−4.2%" : "+12.8%"}
        </span>
      </div>
    </div>
  )
}

export function AssetRowShowcase() {
  return (
    <ThemePair label="Asset Row">
      <div className="xray-stack xray-stack--wide">
        <AssetRow filled />
        <AssetRow negative />
      </div>
    </ThemePair>
  )
}

export function BalanceCardShowcase() {
  return (
    <ThemePair label="Balance Card">
      <article className="xray-balance-card">
        <span className="xray-balance-card__label">Total balance</span>
        <div className="xray-balance-card__value">
          <strong>1,252,251</strong><span className="xray-balance-card__fraction">.254221</span><span className="xray-balance-card__ticker">ADA</span>
        </div>
        <span className="xray-delta xray-delta--positive">+8.4% this month</span>
      </article>
    </ThemePair>
  )
}

function PaymentForm() {
  return (
    <form className="xray-payment-form">
      <header>
        <span className="xray-payment-form__eyebrow">Transfer</span>
        <h3>Send Assets</h3>
      </header>
      <label className="xray-field">
        <span>From account</span>
        <span className="xray-account-chip"><Avatar palette="ada" label="ADA" /><strong>Main Wallet</strong><code>addr1q…azf5ek</code></span>
      </label>
      <label className="xray-field">
        <span>To address</span>
        <input type="text" defaultValue="addr1q8…9km2fe" aria-label="To address" />
      </label>
      <div className="xray-field-grid">
        <label className="xray-field">
          <span>Asset</span>
          <select defaultValue="ADA" aria-label="Asset"><option>ADA</option><option>BTC</option><option>XRAY</option></select>
        </label>
        <label className="xray-field">
          <span>Amount</span>
          <span className="xray-amount"><input type="text" defaultValue="250.00" aria-label="Amount" /><button type="button">MAX</button><code>ADA</code></span>
        </label>
      </div>
      <div className="xray-field">
        <span>Network fee</span>
        <div className="xray-fees" role="radiogroup" aria-label="Network fee">
          <span className="xray-fee" role="radio" aria-checked="false"><i />Slow<small>~5 min · 0.12 ADA</small></span>
          <span className="xray-fee xray-fee--selected" role="radio" aria-checked="true"><i />Standard<small>~20 s · 0.17 ADA</small></span>
          <span className="xray-fee" role="radio" aria-checked="false"><i />Fast<small>~5 s · 0.42 ADA</small></span>
        </div>
      </div>
      <div className="xray-payment-form__total"><span>Total with fee</span><strong>250.17 ADA</strong></div>
      <button className="xray-button xray-button--primary xray-payment-form__submit" type="button">Send Assets</button>
      <p className="xray-secured"><span className="xray-dot xray-dot--online" />Secured transaction</p>
    </form>
  )
}

export function PaymentFormShowcase() {
  return <ThemePair label="Payment Form"><PaymentForm /></ThemePair>
}
