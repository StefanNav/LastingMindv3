import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CategoryNodeCard } from '@/components/cards/CategoryNodeCard'
import type { Category } from '@/types'

const familyCategory: Category = {
  id: 'cat-family',
  title: 'Family',
  image: '/images/Family 1.png',
  imageHeight: 156,
  imageWidth: 147,
  status: 'flourishing',
  totalModules: 2,
}

export function FamilyDetailSlide() {
  const [filledStars, setFilledStars] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setFilledStars(1), 600)
    const t2 = setTimeout(() => setFilledStars(2), 1200)
    const t3 = setTimeout(() => setFilledStars(3), 1800)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex justify-center px-4"
    >
      <div className="w-full">
        <CategoryNodeCard
          category={familyCategory}
          overrideFilledStars={filledStars}
          starSize={28}
          interactive={false}
        />
      </div>
    </motion.div>
  )
}
