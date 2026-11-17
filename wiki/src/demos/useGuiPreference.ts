import { useEffect, useState } from "react"
import { defaultGuiPreference, GUI_PREFERENCE_KEY, parseGuiPreference, type GuiPreference } from "../prompts"

const preferenceEvent = "xray-design-gui-change"

/** Hydrate after mount so SSR stays stable; keep demos in this tab and other tabs in sync. */
export function useGuiPreference() {
  const [preference, setPreference] = useState<GuiPreference>(defaultGuiPreference)

  useEffect(() => {
    try {
      setPreference(parseGuiPreference(localStorage.getItem(GUI_PREFERENCE_KEY)))
    } catch {
      // Choices still work for the current page when storage is unavailable.
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === GUI_PREFERENCE_KEY || event.key === null) setPreference(parseGuiPreference(event.newValue))
    }
    const onChange = (event: Event) => setPreference((event as CustomEvent<GuiPreference>).detail)
    window.addEventListener("storage", onStorage)
    window.addEventListener(preferenceEvent, onChange)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(preferenceEvent, onChange)
    }
  }, [])

  const updatePreference = (next: GuiPreference) => {
    setPreference(next)
    try {
      localStorage.setItem(GUI_PREFERENCE_KEY, JSON.stringify(next))
    } catch {
      // Disabled storage must not prevent generating or copying a prompt.
    }
    window.dispatchEvent(new CustomEvent(preferenceEvent, { detail: next }))
  }

  return [preference, updatePreference] as const
}
