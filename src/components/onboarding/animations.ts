export const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.18, staggerDirection: -1 } },
  exit: { opacity: 0, filter: 'blur(4px)', transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] as const } },
}

export const horizontalSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
}

export const dissolveVariants = {
  initial: {
    opacity: 0,
    y: 12,
    clipPath: 'inset(60% 0 0 0)',
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    filter: 'blur(0px)',
    transition: { duration: 1.7, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    y: 0,
    clipPath: 'inset(0% 0 0 0)',
    filter: 'blur(4px)',
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
  },
}
