# Native GUI

Use this reference when implementing XRAY/Design in a native or non-DOM GUI. It covers SwiftUI,
UIKit/AppKit, JavaFX, Android and adaptation to other frameworks. The catalog ships tested HTML/React
implementations and native porting guidance; it does not ship or certify native component libraries.

Read the protocol first, then the sections relevant to the target:
[setup](#setup), [tokens](#translate-tokens), [components and blocks](#implement-components-and-blocks),
[framework notes](#framework-notes), [status and upgrades](#status-and-upgrades), [verification](#verification).

## Setup

1. Identify the UI framework, language, target OS and supported SDK versions from the app being changed.
   Swift may mean SwiftUI, UIKit or AppKit. Java may mean JavaFX, Swing or Android Views; Compose uses
   Kotlin. React Native is a native target despite its React dependency. Preserve the existing stack;
   ask only when the requested target cannot be determined. Consult official docs for its SDK version.
2. Choose `uiRoot` within the app's existing source/resource structure. Keep the lock there even when
   the framework requires implementation files in several subfolders. Use a separate lock for each
   independently implemented UI target in a repository with multiple apps.
3. Translate the protocol's YAML tokens into the project's theme layer as described below. Do not load
   browser CSS, copy TSX as native code, or embed a WebView merely to reuse the web implementation.
4. Connect the OS appearance, text scaling, focus/accessibility and reduced-motion settings. When the
   framework does not expose an OS motion setting, use the host app's accessibility preference and
   document the limitation. Do not silently retain motion when a reduction setting is available.
5. Write `<uiRoot>/design.lock.json`. For a new SwiftUI iOS target, before adding components:

   ```json
   {
     "version": "1.0.0",
     "stack": "native",
     "framework": "swiftui",
     "platforms": ["ios"],
     "components": [],
     "blocks": [],
     "files": {}
   }
   ```

   Use the installed `Protocol-Version`, actual framework and platforms. `base` is a web-reset option
   and is omitted for native targets. After creating native source/theme files, fill `files` with their
   SHA-256 digests, keyed by paths relative to `uiRoot`. Include theme resources as well as component
   code. These digests record the initial implementation baseline, not equality with catalog files.
6. Add the Design section to the project's `AGENTS.md` and the Claude Code skill link, when applicable,
   as described in the main skill's Setup steps 7–8. Include the actual framework and link to this
   reference in that section. The installed `.agents/design/` catalog stays read-only.

Keep platform adaptations in `<uiRoot>/design-adaptations.md`: framework/OS versions, token-name and
unit mappings, system-controlled presentation differences, and verification gaps. Update it when an
implementation decision changes. It is project documentation, not another design-token source.

## Translate tokens

Read `DESIGN-PROTOCOL.md`'s YAML header. Generate or implement named values in one theme module or
resource set, retaining a traceable mapping such as `bg-panel` → `DesignTokens.bgPanel`. Components
consume semantic tokens; raw palette values belong only in that theme layer. Keep exact light/dark
color values and alpha. Rebrands follow the main skill's "Theme or rebrand": project overrides live in one separate
theme file or resource set that applies over the translated tokens (including forced-theme subtrees) and is
recorded as the lock's `theme`. Keep it separate from the translated kit tokens, so upgrades can update those
without touching the project's brand.

| Token kind | Native translation |
|---|---|
| Colors | Resolve each light/dark pair to a dynamic color, theme property or resource. Convert CSS color notation explicitly; preserve alpha and color space. |
| Spacing, radius, size | Map web-reference lengths to the framework's logical units (Apple points, Android dp, or the toolkit's layout units). Preserve the 4-unit rhythm and nested-corner relationships at the base scale; never multiply by display density into layout dimensions. |
| Typography | Use system sans and mono equivalents, mapped weights and scalable text styles. Preserve hierarchy and numeral emphasis; do not paste CSS font stacks into native font APIs. Allow controls to grow and text to wrap with user font scaling. |
| Durations and easing | Convert milliseconds to the animation API's units. Map the cubic-bezier easing and spring intent; do not substitute the platform default animation for every transition. |
| Overlay layers | Express menu/toast/tooltip ordering with framework presentation, not literal CSS z-index values. |

The `spring` and `spring-soft` sampled curves live in `core/tokens.css`, outside the YAML token list.
Use those curves as references when tuning a native spring or sampling equivalent keyframes. Document
an approximation where the framework cannot reproduce it. Browser motion helpers in `core/motion.js`
are behavioral references, not native runtime dependencies. Reduced motion removes movement and
overshoot; state changes still complete and controls remain usable.

Do not equate a CSS pixel, a physical pixel and a typographic point across platforms. Document the base
mapping, then check it on target devices. Use device-aligned hairlines and intrinsic/scalable control
heights. A visually compact icon or button can have a larger, non-overlapping accessible hit area.
For example, Android recommends at least 48×48 dp for touch targets; this need not turn a 20-unit icon
into a 48-unit drawing. See [Android accessibility guidance](https://developer.android.com/guide/topics/ui/accessibility/apps).

## Implement components and blocks

Read `components/<id>/COMPONENT.md` or `blocks/<id>/COMPONENT.md` and its declared dependencies first.
Use CSS/HTML/TSX and controllers to resolve details missing from the prose: component token defaults,
layout, selection rules, loading behavior, dismissal and event order. Inspect only what the task needs.

Implement the component with the target framework's controls and composition. Keep its visual states
and behavioral contract. Web-only invariants prescribe web mechanisms; map their outcomes as follows:

| Web reference | Native outcome |
|---|---|
| `data-variant`, `data-size`, component CSS variables | Typed variant/size properties and component theme overrides. |
| `disabled`, `aria-busy`, `aria-selected`, `aria-expanded` | Framework state bound to appearance, input availability and accessibility values. |
| Labels, descriptions, `role="alert"` | Associated accessible names, help/error text and platform announcements where appropriate. |
| `<dialog>`, Popover API, focus restoration | Framework modal/popup presentation, contained focus where modal, dismissal rules and focus return. |
| Layout breakpoints | Layout based on available content width and platform size classes; preserve the intended compact/wide behavior. |

Prefer styling or composing accessible controls over drawing controls on a canvas. If a custom control
is necessary, implement its role, value, actions, focus and input behavior alongside its appearance.
Do not suppress text scaling or accessibility semantics to match a screenshot. Native system pickers,
keyboards or sheets may own presentation details: record the difference and preserve the selection,
validation and dismissal contract. Keep hover only where pointer input exists.

Build component dependencies before their block. Blocks compose those components and receive data;
they do not fetch it or introduce another token palette. Follow the framework's project layout, then
record catalog IDs in the lock's `components`/`blocks` and actual native file digests in `files`.
New project-only components get their own contract but are not listed as catalog components.

Preserve the supplied icon geometry and brand marks when converting SVG into native vector assets;
do not replace them with approximately similar system symbols. Decorative icons remain hidden from
accessibility. For avatars, port the hash, seed iteration, 32-bit arithmetic, random sequence, rounding,
color order and transform order exactly; compare seed/palette outputs with `avatarShapes` in the web
controller, including non-ASCII seeds. A different runtime's random generator changes account identity.

## Framework notes

These are implementation directions, not separate native SDKs. Check availability against the app's
supported versions before choosing an API.

| Target | Apply the design through |
|---|---|
| SwiftUI | A named token/theme layer in the environment or asset resources, reusable control styles and bindings. Connect appearance and Reduce Motion; use Dynamic Type/scaled metrics, flexible layouts and framework focus/accessibility. Preserve the app's navigation/presentation architecture. |
| UIKit / AppKit | Shared colors, fonts and component configuration/subclasses; layout constraints and native control state. Use platform text scaling, accessibility and presentation APIs appropriate to iOS/macOS. Do not introduce SwiftUI just to apply this protocol. |
| JavaFX | Shared theme values and JavaFX `-fx-*` styling, supported control skins, observable properties and pseudo-classes. JavaFX CSS is a different dialect: translate properties instead of loading browser `tokens.css`, `var()` or `light-dark()`. Retain keyboard/focus behavior when changing skins. |
| Android Views (Java/Kotlin) | Named color/dimension/style resources or the existing theme layer, state lists, native controls and accessible state. Use dp for layout and sp for scalable text; retain safe insets and platform touch targets. Do not migrate a Java app to Compose implicitly. |
| Compose (Kotlin) | Shared named tokens, theme/composable control styling, state and semantics. Preserve XRAY colors/radii instead of accepting unrelated Material defaults. Connect platform settings and verify minimum hit areas after customization. |
| Other GUI frameworks | Locate the equivalents of theme resources, state bindings, control templates/styles, semantics, scalable layout and overlays. For Flutter, Qt, WPF, Swing or React Native, follow the existing framework and SDK; apply the same token and contract mapping before writing components. |

Useful official references: [SwiftUI scaled metrics](https://developer.apple.com/documentation/swiftui/scaledmetric),
[SwiftUI Reduce Motion](https://developer.apple.com/documentation/swiftui/environmentvalues/accessibilityreducemotion),
[JavaFX CSS](https://openjfx.io/javadoc/25/javafx.graphics/javafx/scene/doc-files/cssref.html) (choose the installed release),
and [Android Views accessibility](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views).
For another framework, consult its official documentation for the project's version rather than
assuming browser behavior or changing frameworks.

## Status and upgrades

For status, report the lock's source protocol version, framework/platforms, implemented catalog IDs and, if
recorded, the `theme` layer with the tokens it overrides.
Compare each native file with its recorded digest: unchanged since baseline, modified, or missing.
If no digest exists, report it as untracked; do not claim it matches the catalog. Report adaptations
and verification gaps. Status never refreshes digests or overwrites source files.

Upgrade only when asked. Use version control as the rollback path; preserve local work. Keep the old
catalog outside `.agents/` as the comparison base. Clone `https://github.com/xray-network/design.git`
into a temporary directory, using `--branch v<version>` when a version was requested, or `main` otherwise.
Compare its `protocol/` with the old catalog, even if version strings are equal. If the relevant sources
are identical, restore the old catalog and report no changes. Otherwise install the new `protocol/`
as `.agents/design/` and use this native procedure in place of the web copying/merge steps.

1. Review the changelog, protocol tokens/rules, and the contracts plus web sources of implemented
   components, blocks and their dependencies against the old catalog. Consult the new skill/reference.
2. Apply relevant design and behavior changes to the existing native implementation while preserving
   project adaptations, including the `theme` layer (update an override only when the changelog renames or
   removes its token). Do not replace native files with CSS/TSX, compare their bytes with web sources,
   or attempt a 3-way merge between different languages. Regenerate into a temporary location only
   when useful for review; merge the intended native changes into project code.
3. Re-run relevant platform verification. After all tracked implementations have been reviewed and
   required changes resolved, update the lock's version and file digests to the reviewed baseline.
   Normal project edits do not reset those digests. Retain framework, platform and component IDs.
4. Report changes, preserved adaptations and checks. If work remains unresolved, leave the previous
   lock version/digests, retain the old catalog as a review base, and list what still needs attention.
   Record the retained base location and target version in the project's adaptation notes.
   Remove the temporary catalog only after the upgrade review is complete.

## Verification

- Build with the target framework's tooling and test the changed behavior on a simulator/device or
  desktop runtime. The wiki's typecheck, protocol check and web parity checks do not validate native code.
- Inspect light and dark themes and applicable resting, pressed, focused, selected, disabled, loading,
  invalid and expanded states. Compare against the reference at the documented base scale.
- Check keyboard/focus paths where supported, screen-reader names/values/actions, announcements and
  modal focus return. Confirm touch targets do not overlap and unavailable actions cannot activate.
- Check narrow/wide windows, safe areas, software keyboard, enlarged text and long/localized labels.
  Content must remain reachable without clipping essential controls.
- Enable reduced motion and test entry/exit and selection changes. Verify any ported deterministic
  identity drawing against the web generator, not just a visually similar screenshot.

Record the target versions/devices and any checks that could not run. Guidance alone is not evidence
that an implementation works on a platform; do not claim native parity without the relevant runtime checks.
