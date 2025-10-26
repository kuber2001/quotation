import { motion } from 'framer-motion'

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="text-center mb-12"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="inline-block text-6xl sm:text-7xl mb-4"
      >
        🪔
      </motion.div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-marble-800 mb-3">
        Marble Murti Quotation Generator
      </h1>
      <p className="text-marble-500 text-base sm:text-lg max-w-2xl mx-auto">
        Create professional quotations for your marble moorti business with ease
      </p>
    </motion.div>
  )
}

export default Header

