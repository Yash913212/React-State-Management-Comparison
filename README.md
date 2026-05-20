# React State Management Comparison

Ever wonder which state management library is actually best for your React app? Context API is built-in but can trigger unnecessary re-renders. Zustand is lightweight and fast. Redux Toolkit is battle-tested but feels heavy. 

This project takes the guesswork out by building the same shopping cart app three different ways and profiling exactly what each approach costs in terms of performance, bundle size, and developer experience.

## What's Inside

**Three implementations of the same app:**
- `context-version/` – React's built-in Context API, tested both as a single naive provider and split across granular providers
- `zustand-version/` – Zustand's lightweight store with selector-based subscriptions
- `redux-version/` – Redux Toolkit with actions, slices, and the full middleware ecosystem

**Supporting files:**
- `profiling/` – React DevTools Profiler screenshots showing component render counts for each approach
- `bundle-analysis/` – Visual bundle size comparisons between implementations
- `RESULTS.md` – The actual benchmark data and a quick decision guide for choosing the right tool

## Quick Start – Try Each Version Yourself

Want to run the app and see the differences? It's easy. Just pick one and run:

**Context API version:**
```bash
cd context-version && npm install && npm run dev
```

**Zustand version:**
```bash
cd zustand-version && npm install && npm run dev
```

**Redux Toolkit version:**
```bash
cd redux-version && npm install && npm run dev
```

Then open the dev server (usually `http://localhost:5173`) and start clicking around. Open React DevTools to watch render counts change as you add items to the cart.

## How We Measured Performance

The benchmark is simple but rigorous: we measure component render counts as you repeatedly add items to the cart, then compare bundle sizes. Here's what we did:

1. Opened React DevTools Profiler and checked **"Record why each component rendered"**
2. Added the same product to the cart ten times, one click at a time
3. Recorded how many times each component rendered:
   - Header
   - ProductListPage
   - ProductCard
   - CartSidebar
   - CartItem
4. Built each version for production and analyzed the bundle size
5. Filled in the results table with actual numbers

This tells us which library causes unnecessary re-renders and which keeps bundles lean—not just theory, but hard data.

## Running Redux in Production (with Docker)

If you want to see the Redux version running in a production-like environment:

```bash
docker compose up --build -d
curl -I http://localhost:8080/
```

The app will be available at `http://localhost:8080`. The health check endpoint returns `200 OK` when everything is running smoothly.

## What We Actually Found

Check out `RESULTS.md` for the full benchmark data and a simple decision guide. The short version:

- **Context API (naive)** – Free, no dependencies, but tends to re-render more components than necessary. Good for learning, risky for scale.
- **Context API (split)** – Better. Breaking providers into pieces helps avoid some re-renders, but you're fighting against React's default behavior.
- **Zustand** – Minimal setup, great performance, and just enough features. A solid choice for most teams.
- **Redux Toolkit** – More boilerplate, bigger bundle, but comes with time-travel debugging and architectural discipline. Worth it if your team is large or your state is complex.

The real takeaway? Measure your own app before committing to one approach. Performance characteristics depend heavily on your specific component tree and update patterns.
