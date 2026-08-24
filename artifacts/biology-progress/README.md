# GCSE Biology Progress — Priya

A single-screen student progress tracker for AQA GCSE Biology, built with Next.js App Router, React, TypeScript, and Tailwind CSS v4.

## Design decisions

**1. Priority score over simple sorting.** The recommended topic is derived from a weighted formula combining mastery deficit, practice volume shortfall, and days since last study — not a hardcoded answer. This makes the recommendation explainable and defensible to a student. Respiration naturally surfaces as the top priority because it scores worst on all three signals simultaneously.

**2. "Not started" is distinct from "0%".** Homeostasis and Inheritance have zero questions attempted and no study date. Displaying them as "0%" would imply the student tried and failed. Instead they are labelled "Not started" with a first-action CTA, and excluded from the average mastery calculation so the headline metric is not artificially dragged down.

## AI tools used

Antigravity IDE (Google DeepMind) was used throughout. One thing the AI got wrong: after migrating from Vite to Next.js App Router, the Tailwind v4 CSS pipeline silently failed to apply any styles. The page rendered raw browser HTML with no visual styling. The AI had not accounted for missing native platform binaries (`@tailwindcss/oxide-win32-x64-msvc`, `lightningcss-win32-x64-msvc`) required by Turbopack on Windows, and had not configured `postcss.config.mjs`. This was caught by opening the browser and observing default styling, then diagnosed through build error logs.
