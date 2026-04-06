import { motion } from 'framer-motion'

const categories = [
  { label: 'Family', image: '/images/Family 1.png' },
  { label: 'Friends', image: '/images/Freinds 1.png' },
  { label: 'Career', image: '/images/Career 1.png' },
  { label: 'What matters', image: '/images/Favorites 1.png' },
]

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
}

export function CategoryGridSlide() {
  return (
    <motion.div
      className="grid grid-cols-2 gap-5"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      {categories.map((cat) => (
        <motion.div
          key={cat.label}
          variants={item}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex h-[80px] w-[110px] items-center justify-center">
            <img
              src={cat.image}
              alt={cat.label}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <span className="font-sans text-[14px] font-medium text-foreground">
            {cat.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}
