# Design System — Portfolio

> Mantine UI · React Router · White-base · Vibrant accents

---

## 1. Design Philosophy

A clean, light, and confident portfolio that lets the work speak first.
White space provides breathing room; vivid accent colors draw the eye to actions and highlights without overwhelming the content.
Every component should feel precise and intentional — no decoration for decoration's sake.

---

## 2. Color Palette

### Foundation

| Token          | Value                | Usage                                    |
| -------------- | -------------------- | ---------------------------------------- |
| `background`   | `#FFFFFF`            | Page background, card surfaces           |
| `surface`      | `#F8F9FA`            | Subtle section backgrounds, code blocks  |
| `border`       | `#DEE2E6`            | Dividers, card borders, input borders    |
| `text-primary` | `#212529`            | Headings, body text                      |
| `text-muted`   | `#868E96`            | Captions, secondary labels, timestamps   |

### Accent — Primary (Blue)

| Token              | Value                | Usage                                      |
| ------------------ | -------------------- | ------------------------------------------ |
| `primary`          | `#228BE6`            | CTAs, active nav, links, focus rings       |
| `primary-light`    | `#D0EBFF`            | Badge backgrounds, hover tints             |
| `primary-dark`     | `#1971C2`            | Hover/pressed state for primary buttons    |

### Accent — Secondary (Lime / Yellow-Green)

| Token              | Value                | Usage                                          |
| ------------------ | -------------------- | ---------------------------------------------- |
| `secondary`        | `#82C91E`            | Skill badges, status indicators, highlights    |
| `secondary-light`  | `#E9FAC8`            | Tag backgrounds, subtle callouts               |
| `secondary-dark`   | `#66A80F`            | Hover/pressed state for secondary elements     |

### Accent — Supporting

| Token       | Value                | Usage                                        |
| ----------- | -------------------- | -------------------------------------------- |
| `cyan`      | `#15AABF`            | Technology badges, info callouts             |
| `violet`    | `#7950F2`            | Category badges, decorative accents          |
| `orange`    | `#FD7E14`            | Warnings, "in progress" status               |
| `red`       | `#FA5252`            | Errors, destructive actions, validation      |
| `teal`      | `#12B886`            | Success states, "completed" indicators       |

### Gradient Presets

```
hero-gradient:    linear-gradient(135deg, #228BE6 0%, #15AABF 50%, #82C91E 100%)
card-accent:      linear-gradient(135deg, #228BE6 0%, #7950F2 100%)
badge-highlight:  linear-gradient(90deg, #82C91E 0%, #15AABF 100%)
```

Use gradients sparingly — hero section background accents, decorative borders on featured cards, and hover states only.

---

## 3. Typography

Mantine's default system font stack (`-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, ...`).

| Role        | Weight     | Size          | Letter-spacing | Usage                          |
| ----------- | ---------- | ------------- | -------------- | ------------------------------ |
| Display     | 800        | 48–64px       | -0.02em        | Hero heading only              |
| H1          | 700        | 36px          | -0.01em        | Page titles                    |
| H2          | 700        | 28px          | -0.01em        | Section headings               |
| H3          | 600        | 22px          | 0              | Card titles, sub-sections      |
| Body        | 400        | 16px          | 0              | Paragraphs, descriptions       |
| Body Small  | 400        | 14px          | 0              | Captions, metadata, timestamps |
| Label       | 600        | 12px          | 0.04em         | Overline labels, badge text    |

---

## 4. Spacing & Layout

- Base unit: **4px** (Mantine default)
- Page max-width: **1120px**, centered with `px="md"` responsive padding
- Section vertical spacing: `py="xl"` to `py={80}` — generous whitespace between sections
- Card grid: `SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}` with `spacing="lg"`
- Consistent `gap` and `p` values using Mantine's spacing scale (`xs` through `xl`)

---

## 5. Component Specifications

### 5.1 Header / Navigation

```
Container:       White background, bottom border (border color), sticky top
                 backdrop-filter: blur(8px), background-opacity: 0.9
Height:          64px
Logo:            Text weight 700, size 20px, color text-primary
                 Hover → primary color transition
Nav links:       Text weight 500, size 14px, color text-muted
                 Hover → text-primary, underline offset 4px with primary color
Active link:     Color primary, underline visible
Mobile:          Burger menu → Drawer from right, full-height
                 Nav items stacked, size 18px, spacing md
```

### 5.2 Hero Section

```
Layout:          Full-width, min-height 80vh, centered content
Background:      White with a subtle gradient orb (hero-gradient at 8% opacity)
                 positioned top-center, 60% width ellipse
Role badge:      Pill shape, primary-light background, primary text, size xs
                 Icon (Code2 or similar) inline-start
Name:            Display size (48–64px), weight 800, text-primary
Tagline:         Body size, text-muted, max-width 560px, centered
CTA primary:     Button variant="filled", color="blue", size="lg", radius="md"
                 Right arrow icon, hover → primary-dark
CTA secondary:   Button variant="outline", color="gray", size="lg", radius="md"
Meta row:        Inline items, text-muted, size xs
                 Location pin icon + "Japan"
                 Divider dot
                 Green dot (teal) + "Open to work"
Scroll cue:      Animated down-arrow, opacity 0.4, subtle bounce
```

### 5.3 Project Card

```
Container:       Card with border (border color), radius="md", padding="lg"
                 Background white, height 100% (flex column)
                 Hover → translateY(-3px), shadow-md, border transitions to primary at 35% opacity
Category badge:  Top-right of header, Badge color="blue", variant="light", size="sm"
Title:           H3 weight 600, size 16px, single line or 2-line clamp
Summary:         Body small, text-muted, 3-line clamp
Tech stack:      Bottom of card, horizontal wrap
                 TechnologyBadge components (max 5 shown)
                 Overflow → "+N" badge, variant="outline"
```

### 5.4 Technology Badge

```
Variant small:   Inline-flex, gap 4px, px 8px, py 2px, radius "sm"
                 Border (border color), background surface, text 12px weight 500
Variant medium:  gap 6px, px 12px, py 4px, text 14px
Icon:            Technology-specific icon from react-icons
                 Color: use the technology's brand color at 70% saturation
                 (e.g., React → cyan, TypeScript → blue, Python → yellow)
Fallback:        No icon, text-only badge
```

### 5.5 Skill Section

```
Layout:          Grouped by SkillCategory
Category label:  H3, weight 600, with a colored left-border accent (4px, primary)
Skill items:     Grid of cards or horizontal badge-rows
Each skill:      Technology icon + name + proficiency indicator
Proficiency:     Mantine Progress component, color mapped to level:
                 Expert → primary, Advanced → cyan, Intermediate → secondary (lime)
                 Or: simple dot/star rating, max 5
```

### 5.6 Experience Timeline

```
Layout:          Vertical timeline, left-aligned
Connector:       2px line, border color, with colored dots at each node
Node dot:        10px circle, filled with primary (work) or violet (education)
Card:            Right of timeline, Card with subtle border
                 Period (date range) as overline label, text-muted
                 Organization name: H3, weight 600
                 Role: Body small, weight 500, primary color
                 Description: Body small, text-muted
```

### 5.7 Contact Form

```
Container:       Card, max-width 640px, centered, padding xl
Fields:          TextInput for name, email, subject
                 Textarea for message body
                 All with radius="md", size="md"
Labels:          Weight 500, size 14px, text-primary
Placeholder:     text-muted at 60% opacity
Focus ring:      Primary color, 2px ring offset
Validation:      Error text in red, size xs, below field
                 Input border turns red on error
Submit button:   Full-width, variant="filled", color="blue", size="lg", radius="md"
                 Loading state → Loader inside button, disabled
Success:         Alert color="teal", icon check-circle
                 "Message sent successfully" with fade-in
Error:           Alert color="red", icon alert-circle
```

### 5.8 Filter Bar (Projects Page)

```
Layout:          Horizontal row, wrapping on mobile
Category filter: SegmentedControl or chip group
                 Active chip → primary filled
                 Inactive → outline, text-muted
Tech filter:     Multi-select chips or Mantine MultiSelect
                 Selected → primary-light background, primary text
                 Unselected → surface background, border
Clear button:    Text button, size sm, text-muted, hover → text-primary
```

### 5.9 Buttons

```
Primary:         variant="filled", color="blue", radius="md"
                 Background primary, text white
                 Hover → primary-dark
                 Active → darken 10%
Secondary:       variant="outline", color="gray", radius="md"
                 Border border-color, text text-primary
                 Hover → surface background
Ghost:           variant="subtle", color="gray"
                 No border, no background
                 Hover → surface background
Sizes:           sm (32px h), md (40px h), lg (48px h)
Icon buttons:    ActionIcon component, same color rules
```

### 5.10 Footer

```
Container:       Border-top (border color), background white
                 Padding y lg, max-width 1120px centered
Left:            Copyright text, size xs, text-muted
Right:           Social icons row (GitHub, X/Twitter, LinkedIn)
                 Icon size 24px, color text-muted
                 Hover → text-primary, scale 1.1 transition
```

### 5.11 Page Section Wrapper

```
Container:       Max-width 1120px, centered
                 Padding y 64–80px
Section heading: H2, weight 700, text-primary
                 Optional colored accent bar below (3px, 40px wide, primary or secondary)
                 Margin-bottom lg before content
```

### 5.12 About Page

```
Profile area:    Avatar (120px, radius full, border 3px primary-light)
                 Name H1, tagline body text-muted
Bio:             Body text, max-width 720px, leading relaxed
Values:          Card grid (2 cols), each with icon (primary color) + title + description
Social links:    Inline icon buttons, same style as footer
```

---

## 6. Shadows & Elevation

| Level   | Value                                          | Usage                        |
| ------- | ---------------------------------------------- | ---------------------------- |
| None    | `none`                                         | Default cards, inputs        |
| Subtle  | `0 1px 3px rgba(0,0,0,0.06)`                  | Hover cards                  |
| Medium  | `0 4px 12px rgba(0,0,0,0.08)`                 | Dropdowns, popovers          |
| Large   | `0 8px 24px rgba(0,0,0,0.10)`                 | Modals, drawers              |

Cards rely on borders by default. Shadows appear only on hover or elevated overlays.

---

## 7. Border Radius

| Token   | Value  | Usage                                |
| ------- | ------ | ------------------------------------ |
| `sm`    | 4px    | Small badges, inline elements        |
| `md`    | 8px    | Cards, buttons, inputs               |
| `lg`    | 12px   | Large cards, modals                  |
| `xl`    | 16px   | Hero elements, featured cards        |
| `full`  | 9999px | Avatars, pill badges, status dots    |

---

## 8. Animation Guidelines

All animations use `framer-motion` (or Mantine's built-in transitions where sufficient).

| Trigger              | Animation                        | Duration | Easing          |
| -------------------- | -------------------------------- | -------- | --------------- |
| Page enter           | Fade-in + slide-up (12px)        | 400ms    | ease-out        |
| Section scroll-in    | Fade-in + slide-up (16px)        | 500ms    | ease-out        |
| Card hover           | translateY(-3px) + shadow-md     | 180ms    | ease-out        |
| Filter change        | Layout animation (reorder)       | 300ms    | spring(0.3)     |
| Modal/Drawer open    | Fade + scale from 0.96           | 250ms    | ease-out        |
| Modal/Drawer close   | Fade + scale to 0.96             | 200ms    | ease-in         |
| Button press         | Scale 0.97                       | 100ms    | ease-out        |
| Badge appear         | Fade-in + scale from 0.9         | 200ms    | ease-out        |

Respect `prefers-reduced-motion`: disable all transforms, keep only opacity fades at 150ms.

---

## 9. Responsive Breakpoints

Follow Mantine's default breakpoints:

| Name  | Min-width | Typical usage                        |
| ----- | --------- | ------------------------------------ |
| `xs`  | 576px     | Single column → minor adjustments    |
| `sm`  | 768px     | 2-column grids, show desktop nav     |
| `md`  | 992px     | 3-column project grid                |
| `lg`  | 1200px    | Max-width container kicks in         |

Mobile-first approach. Stack everything on `base`, expand at `sm`+.

---

## 10. Accessibility

- Minimum contrast ratio: 4.5:1 for body text, 3:1 for large text (WCAG AA target)
- All interactive elements have visible focus indicators (primary color ring, 2px offset)
- Icon-only buttons include `aria-label`
- Color is never the sole indicator of state — always pair with text, icon, or shape
- `prefers-reduced-motion` fully supported
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Skip-to-content link at top of page

---

## 11. Mantine Theme Configuration (Reference)

```ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'blue',
  colors: {
    // Use Mantine's built-in blue, lime, cyan, violet, orange, red, teal
    // Override specific shades if needed
  },
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
  headings: {
    fontWeight: '700',
  },
  radius: {
    xs: '2px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  defaultRadius: 'md',
  white: '#FFFFFF',
  black: '#212529',
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
    Card: {
      defaultProps: {
        radius: 'md',
        withBorder: true,
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'md',
      },
    },
    Textarea: {
      defaultProps: {
        radius: 'md',
      },
    },
    Badge: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});
```

---

## 12. Do's and Don'ts

**Do:**
- Use white space generously — let content breathe
- Apply accent colors to interactive elements and key highlights only
- Keep card borders subtle; let hover states add emphasis
- Use the gradient presets for hero and featured elements only
- Pair every color-based status with a text label or icon

**Don't:**
- Fill large areas with solid accent colors — accents are for punctuation
- Use more than 2 accent colors in a single component
- Mix rounded and sharp corners in the same view
- Add shadows to static elements — shadows are for hover and overlays
- Use animation for pure decoration — every motion should guide attention
