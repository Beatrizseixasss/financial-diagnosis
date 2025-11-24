# Contributing to FinFit

This document provides guidelines for contributing to the FinFit project, especially for AI agents like Gemini.

## Agent Instructions

As an AI development assistant, your primary goal is to help build and maintain this project efficiently. Adhere strictly to the following instructions:

1.  **Project Context:** This is an MVP (Minimum Viable Product) of a financial education app named "FinFit". The core philosophy is **simplicity and completeness**. Avoid over-engineering, complex integrations, or premature optimizations.
2.  **Existing Architecture:** The project is built with Next.js (App Router), TypeScript, and styled with Tailwind CSS using `shadcn/ui` components.
    *   **Adhere to Conventions:** Rigorously follow the existing code style, component structure, and architectural patterns.
    *   **Use Existing Components:** Before creating new UI elements, check the `components/ui/` directory. Reuse and extend existing `shadcn/ui` components whenever possible.
    *   **File Structure:**
        *   Pages/Routes go in the `app/` directory.
        *   Feature-specific, complex components go in `components/`.
        *   Reusable, atomic UI components go in `components/ui/`.
        *   Utility functions go in `lib/`.
3.  **Code Changes:**
    *   **Simplicity First:** Implement features in the most straightforward way that meets the requirements.
    *   **No Complex State Management:** For now, local component state (`useState`, `useReducer`) is sufficient. Do not add global state management libraries (like Redux, Zustand, or Jotai) without explicit instruction.
    *   **No Backend/Database:** This is a frontend-only prototype. All data is hardcoded locally (e.g., the `initialPaths` array in `journey-section.tsx`). Do not attempt to add a database, API endpoints, or user authentication.
4.  **Verification:** Always ensure the project remains buildable. After making changes, you should be prepared to run the appropriate build command (e.g., `pnpm run build`) to verify that no compilation errors have been introduced.

## Project Documentation

### Overview

FinFit is a gamified web application designed to make financial education engaging and accessible. It uses game-like elements such as experience points (XP), levels, and rankings to motivate users to learn about finance.

### Core Features

1.  **Diagnostic Quiz (`app/page.tsx`):** A multi-step questionnaire that assesses the user's initial financial knowledge and assigns them a starting level.
2.  **Learning Journeys (`components/journey-section.tsx`):** The main educational content is structured into "journeys." These are presented as a map where completing one topic unlocks the next.
3.  **Gamified Flashcards (`components/flashcards-section.tsx`):** The core interactive element. Users answer questions related to a journey, earn XP for correct answers, and manage a limited number of "lives."

### Technology Stack

*   **Framework:** Next.js (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** `shadcn/ui` (built on Radix UI)
*   **Icons:** `lucide-react`
