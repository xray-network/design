import { useState } from "react"
import { SignIn } from "@protocol/blocks/sign-in/sign-in"
import { toast } from "@protocol/components/toast/toast"

// A stand-in for the app's own check: any password but "password" is refused, after a short wait.
export default function SignInExample() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string>()
  return (
    <div onClick={(e) => { if ((e.target as Element).closest("a")) e.preventDefault() }} style={{ display: "contents" }}>
      <SignIn
        text="Welcome back. Try the password “password”."
        providers={[{ id: "apple", label: "Continue with Apple" }, { id: "google", label: "Continue with Google" }]}
        onProvider={(id) => toast(`Continue with ${id} here`)}
        forgotHref="#reset"
        signUpHref="#sign-up"
        submitting={submitting}
        error={error}
        onSubmit={({ password }) => {
          setSubmitting(true)
          setError(undefined)
          setTimeout(() => {
            setSubmitting(false)
            if (password === "password") toast("Signed in", { tone: "success" })
            else setError("The email or password is wrong.")
          }, 700)
        }}
      />
    </div>
  )
}
