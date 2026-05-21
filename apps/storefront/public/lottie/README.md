# Lottie assets

Animated icons / loops used by the `<Lottie>` primitive
(`@/components/motion`). Reference them by absolute public path, e.g.:

```tsx
import { Lottie } from "@/components/motion";

<Lottie src="/lottie/placeholder.json" ariaLabel="Loading" className="size-16" />
```

## Files

| File | Used for | Status |
|------|----------|--------|
| `placeholder.json` | Generic pulse — temporary stand-in / template | placeholder |

## Conventions

- Prefer `.lottie` (compressed) for anything large; small icons can be `.json`.
- Keep brand color `#ff3131` (`--color-primary-500`) where an accent is needed.
- Drop replacements in here and swap the `src`; no code changes needed.
- Source free assets from https://lottiefiles.com (check the license).
