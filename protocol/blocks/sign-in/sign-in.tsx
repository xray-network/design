"use client";

import { useId, type ReactNode } from "react";
import { Button } from "../../components/button/button";
import { Checkbox } from "../../components/checkbox/checkbox";
import { Input, TextField } from "../../components/input/input";
import "./sign-in.css";

export type SignInValues = { email: string; password: string; remember: boolean };

export type SignInProps = {
  title?: ReactNode;
  text?: ReactNode;
  /** "Continue with …" buttons above the form. */
  providers?: { id: string; label: ReactNode; icon?: ReactNode }[];
  onProvider?: (id: string) => void;
  /** The app authenticates and answers with `error` or a redirect. */
  onSubmit: (values: SignInValues) => void;
  /** Shown under the password. Never say which of the two was wrong. */
  error?: ReactNode;
  /** A request is on its way: spinner in the button, no second submit. */
  submitting?: boolean;
  /** Where "Forgot password?" goes. Leave out to hide it. */
  forgotHref?: string;
  /** Where "Create one" goes. Leave out to hide the line. */
  signUpHref?: string;
  /** Shows "Keep me signed in". */
  remember?: boolean;
  className?: string;
};

/** The sign-in form. A real form: password managers fill it and Enter submits. The app authenticates. */
export function SignIn({ title = "Sign in", text, providers = [], onProvider, onSubmit, error, submitting, forgotHref, signUpHref, remember = true, className }: SignInProps) {
  const id = useId();
  return (
    <form
      className={className ? `x-sign-in ${className}` : "x-sign-in"}
      aria-labelledby={`${id}-title`}
      onSubmit={(event) => {
        event.preventDefault();
        if (submitting) return;
        const data = new FormData(event.currentTarget);
        onSubmit({ email: String(data.get("email") ?? ""), password: String(data.get("password") ?? ""), remember: data.get("remember") === "on" });
      }}
    >
      <header className="x-sign-in-head">
        <h2 className="x-sign-in-title" id={`${id}-title`}>{title}</h2>
        {text != null && <p className="x-sign-in-text">{text}</p>}
      </header>
      {providers.length > 0 && (
        <>
          <div className="x-sign-in-providers">
            {providers.map((provider) => (
              <Button key={provider.id} variant="ghost" fullWidth onClick={() => onProvider?.(provider.id)}>{provider.icon}{provider.label}</Button>
            ))}
          </div>
          <div className="x-sign-in-divider">or</div>
        </>
      )}
      <TextField label="Email" name="email" type="email" autoComplete="username" placeholder="you@company.com" required />
      <div className="x-field">
        <span className="x-sign-in-label">
          <label className="x-field-label" htmlFor={`${id}-password`}>Password</label>
          {forgotHref && <a className="x-sign-in-forgot" href={forgotHref}>Forgot password?</a>}
        </span>
        <Input id={`${id}-password`} name="password" type="password" autoComplete="current-password" required aria-invalid={error ? true : undefined} aria-describedby={error ? `${id}-error` : undefined} />
        {error && <p className="x-field-error" id={`${id}-error`} role="alert">{error}</p>}
      </div>
      {remember && <Checkbox name="remember" defaultChecked>Keep me signed in</Checkbox>}
      <Button type="submit" size="lg" fullWidth loading={submitting}>Sign in</Button>
      {signUpHref && <p className="x-sign-in-foot">No account? <a href={signUpHref}>Create one</a></p>}
    </form>
  );
}
