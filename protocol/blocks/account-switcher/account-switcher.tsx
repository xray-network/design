"use client";

import { useEffect, useId, useRef } from "react";
import { Avatar } from "../../components/avatar/avatar";
import type { AvatarPalette } from "../../components/avatar/avatar.controller.js";
import { bindMenu } from "../../components/menu/menu.controller.js";
import "../../components/menu/menu.css";
import "./account-switcher.css";

export type Account = {
  id: string;
  /** Short label, usually the address tail: "…lkgc86". */
  label: string;
  /** Seed for the avatar. */
  address: string;
  palette?: AvatarPalette;
  /** Formatted: "12,480.25 ADA". */
  balance: string;
};

export type AccountSwitcherProps = {
  accounts: Account[];
  value: string;
  onValueChange: (id: string) => void;
  /** Shows an "Add account" row at the end. */
  onAdd?: () => void;
  className?: string;
};

const Check = () => (
  <svg className="x-account-switcher-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

export function AccountSwitcher({ accounts, value, onValueChange, onAdd, className }: AccountSwitcherProps) {
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const current = accounts.find((a) => a.id === value) ?? accounts[0];

  useEffect(() => {
    if (!triggerRef.current || !menuRef.current) return;
    return bindMenu(triggerRef.current, menuRef.current);
  }, []);

  const choose = (id: string) => {
    onValueChange(id);
    menuRef.current?.hidePopover();
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <div className={className ? `x-account-switcher ${className}` : "x-account-switcher"}>
      <button ref={triggerRef} type="button" className="x-account-switcher-trigger" popoverTarget={menuId} aria-label={`Account ${current?.label}, switch account`}>
        {current && <Avatar seed={current.address} palette={current.palette} />}
        <span className="x-account-switcher-text">
          <span className="x-account-switcher-label">{current?.label}</span>
          <span className="x-account-switcher-sub">{current?.balance}</span>
        </span>
        <svg className="x-account-switcher-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div ref={menuRef} id={menuId} popover="auto" role="menu" aria-label="Accounts" className="x-menu x-account-switcher-menu">
        <div className="x-menu-heading" role="presentation">Accounts</div>
        {accounts.map((a) => (
          <button key={a.id} type="button" role="menuitemradio" aria-checked={a.id === value} className="x-menu-item" data-id={a.id} onClick={() => choose(a.id)}>
            <Avatar seed={a.address} palette={a.palette} size="sm" />
            <span className="x-account-switcher-text">
              <span className="x-account-switcher-label">{a.label}</span>
              <span className="x-account-switcher-sub">{a.balance}</span>
            </span>
            <Check />
          </button>
        ))}
        {onAdd && (
          <>
            <div className="x-menu-separator" role="separator" />
            <button type="button" role="menuitem" className="x-menu-item x-account-switcher-add" onClick={onAdd}>
              <span className="x-account-switcher-add-icon" aria-hidden="true">
                <svg className="x-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5v15m7.5-7.5h-15" /></svg>
              </span>
              Add account
            </button>
          </>
        )}
      </div>
    </div>
  );
}
