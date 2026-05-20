# React State Management Comparison

This repository benchmarks a single shopping cart app implemented with:

- React Context API (`context-version`, with naive and split-provider modes)
- Zustand (`zustand-version`)
- Redux Toolkit (`redux-version`)

## Repository Structure

- `context-version/`: React Context implementation with two modes:
  - `Naive`: single `AppContext.Provider` holding cart, user, and ui state
  - `Split`: `UserProvider`, `UIProvider`, and `CartProvider`
- `zustand-version/`: Zustand implementation using selector-based subscriptions
- `redux-version/`: Redux Toolkit implementation with `configureStore` + `createSlice`
- `profiling/`: React DevTools Profiler screenshots
- `bundle-analysis/`: bundle visualizer screenshots
- `RESULTS.md`: benchmark table and decision guide

## Run Each Version

### Context

```bash
cd context-version
npm install
npm run dev
```

### Zustand

```bash
cd zustand-version
npm install
npm run dev
```

### Redux Toolkit

```bash
cd redux-version
npm install
npm run dev
```

## Benchmark Protocol

1. Open React DevTools Profiler.
2. Enable **Record why each component rendered**.
3. Click **Add to cart** on product #1 ten times.
4. Record render counts from components with `data-testid="render-count"`:
   - Header
   - ProductListPage
   - ProductCard
   - CartSidebar
   - CartItem
5. Build and analyze bundle size.
6. Fill in `RESULTS.md`.

## Containerized Production Run (Redux Version)

```bash
docker compose up --build -d
curl -I http://localhost:8080/
```

The service is healthy when `/health` returns `200 OK`.

## Key Findings Summary

See `RESULTS.md` for quantitative and qualitative comparison guidance.
