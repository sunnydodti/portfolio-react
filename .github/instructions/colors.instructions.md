---
applyTo: '**'
---

# Portfolio UI Color System Guidelines

fundamental principles and structure for defining the UI color palette in this portfolio project, ensuring a professional, harmonious, and dual-theme (light/dark) aesthetic.

## 1. Preferred Color Formats: HSL and OKLCH

**Instruction:** All color logic should utilize HSL (Hue, Saturation, Lightness) or the modern, perceptually uniform OKLCH format for better control over creating harmonious shades. Avoid raw Hex or RGB for generating palettes, as they make shade creation guesswork.

- **HSL:** Use the `L` (Lightness) component to generate shades while keeping `H` (Hue) and `S` (Saturation) consistent.
- **OKLCH:** Utilize this format for superior lightness perception across different hues.

## 2. The Three Color Roles

Every color in the UI must serve a specific role: Neutrals, Primary, or Semantics.

### A. Neutral Colors (Background, Text, Borders)

- **Goal:** Provide structure and ensure maximum legibility.
- **Method:** Set **Saturation (S) to 0** (or Chroma to 0 in OKLCH). Shades are created by varying the **Lightness (L)** value.
- **Hierarchy:**
  - Use multiple shades of neutral background colors to visually stack elements (e.g., base background, surface elements, raised elements).
  - Keep text color high contrast but avoid pure white/black (L=100% or L=0%) for primary text, opting for a slightly muted shade to reduce eye strain.

### B. Primary/Brand Color (Main Actions)

- **Goal:** Highlight key actions and represent the portfolio's brand identity.
- **Preference:** Use a **Blue Hue** (e.g., HSL Hue ≈ 220-240) for the primary color.
- **Implementation:** Maintain a high Saturation (S) and adjust Lightness (L) to create variations for hover, active, and focus states.

### C. Semantic Colors (System States)

- **Goal:** Communicate state information (e.g., Success, Error, Warning).
- **Implementation:** Define distinct hues for each state (e.g., Green for Success, Red for Error) and ensure they pass contrast checks in both light and dark modes.

## 3. Light and Dark Mode Strategy

**Principle:** Create two mirrored color sets by manipulating the Lightness component.

- **Dark Mode:** Base background lightness should be low (e.g., L=0% to 10%). Elements that feel "closer" or "raised" to the user should have progressively **higher lightness values** (e.g., 5%, 10%).
- **Light Mode:** Base background lightness should be high (e.g., L=90% to 100%). Elements that are "raised" should have the **highest lightness values** (e.g., 95%, 100%), reinforcing the effect of light coming from above.
- **Text/Background Flip:** Text colors in Dark Mode (high L) should be the inverse of Light Mode (low L).

## 4. CSS Variable Structure

Use the following structure for defining theme-aware colors:
update the hues accordingly for the primary and semantic colors.

```css
:root {
  /* HSL Blue Hue for Primary */
  --hue-brand: 220;

  /* == LIGHT MODE DEFAULTS == */
  --bg-base: hsl(0, 0%, 100%); /* The darkest background neutral */
  --bg-raised: hsl(0, 0%, 95%); /* Lighter element background */
  --text-primary: hsl(0, 0%, 5%);
  --text-secondary: hsl(0, 0%, 40%);

  /* Primary Color (Blue) */
  --color-primary: hsl(var(--hue-brand), 90%, 50%);
  --color-primary-hover: hsl(var(--hue-brand), 90%, 40%);

  /* == SEMANTIC COLORS == */
  --color-success: hsl(140, 70%, 40%);
  --color-error: hsl(350, 70%, 45%);
}

[data-theme='dark'] {
  /* == DARK MODE OVERRIDES == */
  --bg-base: hsl(0, 0%, 0%); /* The darkest background neutral */
  --bg-raised: hsl(0, 0%, 10%); /* Lighter element background */
  --text-primary: hsl(0, 0%, 95%);
  --text-secondary: hsl(0, 0%, 60%);

  /* Primary Color (Blue) - Adjusted for contrast on dark background */
  --color-primary: hsl(var(--hue-brand), 80%, 65%);
  --color-primary-hover: hsl(var(--hue-brand), 80%, 75%);
}
```
