# DEMO Dental Studio 🦷✨
**Author**: M A Muneeb Ghori | All rights reserved.

A next-generation, ultra-premium web experience built for modern dental clinics. Designed with a luxury aesthetic, fluid animations, and an integrated AI Clinical Concierge to completely transform patient acquisition and booking.

![Project Status](https://img.shields.io/badge/Status-Active_Development-success)
![Framework](https://img.shields.io/badge/Framework-Next.js_15-black)
![Styling](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC)
![Animations](https://img.shields.io/badge/Animations-Framer_Motion-FF0055)

---

## 🌟 Key Features

### 💎 Ultra-Premium UI/UX
- **Luxury Aesthetic**: Deep forest green (`#0D241C`) and gold (`#c9a973`) color palette, exuding trust, hygiene, and high-end exclusivity.
- **Fluid Micro-Interactions**: Built extensively with **Framer Motion**, featuring buttery-smooth parallax scrolling, sticky scroll reveals, and elegant page transitions.
- **Bento Box Galleries**: A custom drag-to-scroll interactive portfolio gallery for showcasing clinical case studies.
- **Before & After Sliders**: Interactive image comparison sliders to powerfully demonstrate cosmetic dentistry results.
- **Stacking Service Cards**: A gorgeous animated stacking card deck for showcasing signature treatments.

### 🤖 AI Clinical Concierge
- A globally persistent, floating AI chatbot that follows the user across the entire site.
- **Powered by Llama 3.1 (via OpenRouter)**, perfectly prompted to act as a highly professional, empathetic dental specialist.
- Capable of guiding patients, answering clinical questions, and gracefully collecting patient details for appointments.
- Includes a dedicated **"Virtual Consultation"** trigger that instantly pops open the AI for remote evaluation.

### 📅 Advanced Appointment Engine
- Multi-step, state-driven booking flow.
- Seamlessly integrates traditional booking with AI-assisted consultations.
- Fully responsive, ensuring a flawless booking experience on mobile and 4k displays.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & Lottie React
- **Icons**: Lucide React
- **AI Integration**: OpenRouter API (`meta-llama/llama-3.1-8b-instruct`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm
- An [OpenRouter](https://openrouter.ai/) API key for the AI Concierge.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/demo-dental-studio.git
   cd demo-dental-studio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your OpenRouter API Key:
   ```env
   # Inside app/api/chat/route.ts, ensure this key is securely loaded
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to explore the luxury.

---

## 📂 Project Architecture

```text
src/
├── app/
│   ├── api/chat/        # AI Concierge backend endpoint (OpenRouter)
│   ├── appointment/     # Multi-step booking engine
│   ├── services/        # Dynamic individual service pages
│   ├── team/            # Dynamic specialist profiles
│   ├── layout.tsx       # Global layout (Contains persistent AI Widget)
│   └── page.tsx         # Stunning Parallax Homepage
├── components/          
│   ├── ui/              # Reusable micro-components (Bento, Sliders, Cards)
│   └── *Section.tsx     # Major page sections (Hero, Portfolio, Services)
└── data/                # Mock data (Services, Team, FAQs, Pricing)
```

---

## 🎨 Design Philosophy
*"Dentistry that will make you smile."*
This project breaks away from the clinical, sterile, and boring white/blue templates of traditional medical websites. It treats dental care as a premium, bespoke service, utilizing dark mode, high-contrast typography, and cinematic imagery to build immediate trust and awe.

---

## 📝 License
© 2026 M A Muneeb Ghori. All rights reserved.
