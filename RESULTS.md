# Benchmark Results

## Comparison Table

| Metric | Context (naive) | Context (split) | Zustand | Redux Toolkit |
| --- | --- | --- | --- | --- |
| Add-to-cart (10 clicks) total commit time (ms) | TBD | TBD | TBD | TBD |
| Header render count | TBD | TBD | TBD | TBD |
| ProductListPage render count | TBD | TBD | TBD | TBD |
| ProductCard render count (first card) | TBD | TBD | TBD | TBD |
| CartSidebar render count | TBD | TBD | TBD | TBD |
| CartItem render count (first item) | TBD | TBD | TBD | TBD |
| State-management bundle size (gzipped) | 0 KB | 0 KB | TBD | TBD |
| State layer files changed/added | TBD | TBD | TBD | TBD |
| State layer LOC | TBD | TBD | TBD | TBD |
| Time-travel debugging support out of box | No | No | No | Yes |

## Profiling Screenshots

- Context optimized: `profiling/context-optimized-profile.png`
- Zustand: `profiling/zustand-profile.png`
- Redux Toolkit: `profiling/redux-toolkit-profile.png`

## Bundle Analysis Screenshots

- Zustand: `bundle-analysis/zustand-bundle.png`
- Redux Toolkit: `bundle-analysis/redux-toolkit-bundle.png`

### Decision Guide

Choose **Context (naive)** only for educational demos or tiny apps where global re-render cost is negligible.

Choose **Context (split)** for small-to-medium apps that need zero dependencies and can keep state domains relatively simple. It balances low bundle cost with acceptable performance when providers are granular.

Choose **Zustand** when you want minimal boilerplate, fast implementation, and good default performance through selector subscriptions. This is often the best fit for solo developers and small teams shipping quickly.

Choose **Redux Toolkit** when the app and team are both large, action history and debug tooling are critical, and strict architecture conventions matter. It has the highest setup overhead but the best built-in debugging and scale-oriented structure.
