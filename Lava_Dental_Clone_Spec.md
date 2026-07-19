# Pixeltech Agency Project Specification: Luxury Dental Platform

**Project:** LAVA Dental Studio Clone & UI Upgrade
**Author:** M. A. Muneeb Ghori | Pixeltech Agency
**Target Reference:** [https://lavadental.lv/en](https://lavadental.lv/en)
**Primary Tech Stack:** Next.js (App Router), React, Tailwind CSS, Framer Motion, Lottie-React.

---

## 1. Project Requirements & Objectives

### Business Goal
Develop a high-conversion, B2B/B2C digital portfolio and service platform for a luxury dental practice. The application must shift the user's psychological state from "clinical anxiety" to "premium spa hospitality" using advanced frontend interactions.

### Technical Requirements
*   **Framework:** Next.js with React Server Components (where applicable) and Client Components for heavy animations.
*   **Styling:** Tailwind CSS. The environment must strictly adhere to a "Warm Light Mode" palette (Alabaster base, Cashmere Taupe surfaces, Lava Terracotta accents) to maintain the luxury aesthetic.
*   **Animations:** Framer Motion for scroll-jacking, parallax, and "Anti-Gravity" physics.
*   **Chat Widget:** Integration of `lottie-react` to render a 2D animated concierge character within a floating, glassmorphic UI bubble.

### Tool Integrations (Antigravity IDE)
*   **21dev MCP:** Required for local file system operations, terminal command execution, and live DOM scraping of the target URL.
*   **UI UX PRO MAX SKILL:** GitHub skill required for repository initialization, semantic branching (`feature/luxury-architecture`), automated commits, and remote syncing.

---

## 2. Technical Architecture & UI Mechanics

### The "Anti-Gravity" UI System
The platform relies on weightlessness and fluid motion:
*   **Spring Physics:** UI elements (like the chat popup) should use Framer Motion's spring transitions (`stiffness: 120, damping: 20`) rather than linear eases.
*   **Macro-Whitespace:** Layouts must utilize massive padding (e.g., `py-32`) to let content breathe.
*   **Floating Elements:** Cards should feature ultra-soft drop shadows (`box-shadow: 0 20px 40px -10px rgba(42,41,39,0.05)`) and gently levitate on hover (`-translate-y-2`).

### Scroll-Linked Sequences (The `#about` section)
The core architectural challenge is the Experience section. As the user scrolls vertically:
1.  The left column (containing introductory text) becomes `sticky`.
2.  The right column (containing 6 experience pillars) slides horizontally or stacks dynamically based on the 0-1 progress of the `useScroll` hook.

---

## 3. The Master Loop Prompt (Antigravity Agent Directive)

*Copy the section below and feed it directly into your Google Antigravity IDE Agent.*

```text
# SYSTEM DIRECTIVE: ELITE AUTONOMOUS CLONE (CONTINUOUS LOOP)
You are an autonomous AI software architect operating within the Google Antigravity IDE. Your objective is to build a pixel-perfect, highly animated replica of a luxury dental website.

**Target URL:** [https://lavadental.lv/en](https://lavadental.lv/en)
**Tech Stack:** Next.js (App Router), React, Tailwind CSS, Framer Motion, Lottie-React.

## TOOL ACTIVATION & PROTOCOLS
1. **21dev MCP:** Use this protocol for file system writing, dependency installation via terminal, and live DOM analysis of the target URL.
2. **UI UX PRO MAX SKILL:** Invoke this GitHub skill for repository initialization, branching, and automated commits.


