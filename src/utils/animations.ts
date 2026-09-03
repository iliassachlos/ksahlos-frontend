import type { Variants } from "framer-motion";

/** Shared easing curve and duration for all scroll-reveal animations. */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.7;
export const STAGGER_DELAY = 0.15;

type RevealOptions = {
  /** Pixels the element travels before settling. */
  distance?: number;
  duration?: number;
  /** Fixed delay, in seconds, before the animation starts. */
  delay?: number;
};

/** Fades in while sliding up from below. */
export const slideUp = ({
  distance = 64,
  duration = REVEAL_DURATION,
  delay = 0,
}: RevealOptions = {}): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: EASE_OUT_EXPO },
  },
});

/** Fades in while sliding in from the right. */
export const slideInFromRight = ({
  distance = 64,
  duration = REVEAL_DURATION,
  delay = 0,
}: RevealOptions = {}): Variants => ({
  hidden: { opacity: 0, x: distance },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, delay, ease: EASE_OUT_EXPO },
  },
});

/**
 * Same as `slideUp`, but the delay comes from the `custom` prop on the
 * motion element, so list items can cascade by index.
 */
export const slideUpStaggered = ({
  distance = 64,
  duration = REVEAL_DURATION,
  step = 0.12,
}: RevealOptions & { step?: number } = {}): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration, delay: index * step, ease: EASE_OUT_EXPO },
  }),
});

/** Parent wrapper that cascades its `variants`-driven children. */
export const staggerContainer = (
  staggerChildren: number = STAGGER_DELAY,
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren } },
});

/** Default `viewport` config for `whileInView` reveals. */
export const viewportOnce = (amount: number = 0.3) => ({
  once: true,
  amount,
});
