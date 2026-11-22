import { useEffect, useState } from "react"
import { DEFAULT_THEME, THEME_EVENT, THEME_KEY, applyTheme, readTheme, saveTheme, type UserTheme } from "./userTheme"

/** The reader's theme, kept in step across components and tabs. Reads storage after mount, so the server render and
    the first client render agree. */
export function useUserTheme(): [UserTheme, (theme: UserTheme) => void] {
  const [theme, setTheme] = useState<UserTheme>(DEFAULT_THEME)
  useEffect(() => {
    setTheme(readTheme())
    const onChange = (event: Event) => setTheme((event as CustomEvent<UserTheme>).detail)
    const onStorage = (event: StorageEvent) => { if (event.key === THEME_KEY || event.key === null) setTheme(readTheme()) }
    window.addEventListener(THEME_EVENT, onChange)
    window.addEventListener("storage", onStorage)
    return () => { window.removeEventListener(THEME_EVENT, onChange); window.removeEventListener("storage", onStorage) }
  }, [])
  return [theme, saveTheme]
}

/** Mounted once in the layout: puts the reader's theme on every preview, and keeps it current. */
export function UserThemeStyle() {
  const [theme] = useUserTheme()
  useEffect(() => applyTheme(theme), [theme])
  return null
}
