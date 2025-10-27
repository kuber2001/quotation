import { motion } from 'framer-motion'
import { marbleTypes } from './MurtiForm'

function MurtiList({ murtis, onRemove, onClearAll }) {
  // Calculate subtotals for each marble type
  const subtotals = marbleTypes.reduce((acc, type) => {
    acc[type.key] = murtis.reduce((sum, murti) => {
      const price = murti[type.key] && murti[type.key].trim() !== '' ? parseInt(murti[type.key], 10) : 0
      return sum + price
    }, 0)
    return acc
  }, {})
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card marble-texture rounded-3xl shadow-xl overflow-hidden mb-8"
    >
      <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-marble-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-marble-800">Quotation Items</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="px-4 py-2 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors shadow-md"
          >
            Clear All
          </motion.button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-marble-100 border-b border-marble-200">
              <th className="px-6 py-4 text-left text-xs font-bold text-marble-600 uppercase tracking-wider">
                Statue Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-marble-600 uppercase tracking-wider">
                Size
              </th>
              {marbleTypes.map(type => (
                <th key={type.key} className="px-6 py-4 text-right text-xs font-bold text-marble-600 uppercase tracking-wider">
                  {type.label}
                </th>
              ))}
              <th className="px-6 py-4 text-center text-xs font-bold text-marble-600 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {murtis.map((murti, index) => (
              <motion.tr
                key={murti.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-marble-50'
                } border-b border-marble-100 hover:bg-gold-50 transition-colors`}
              >
                <td className="px-6 py-4 text-sm font-medium text-marble-800">
                  {murti.statueName}
                </td>
                <td className="px-6 py-4 text-sm text-marble-600">
                  {murti.size} ft
                </td>
                {marbleTypes.map(type => (
                  <td key={type.key} className="px-6 py-4 text-sm font-semibold text-marble-800 text-right">
                    {murti[type.key] && murti[type.key].trim() !== '' 
                      ? `₹${parseInt(murti[type.key], 10).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`
                      : '-'}
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(murti.id)}
                    className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                    title="Remove"
                  >
                    🗑️
                  </motion.button>
                </td>
              </motion.tr>
            ))}
            {/* Subtotal Row */}
            <tr className="bg-gradient-to-r from-gold-100 to-amber-100 border-t-2 border-gold-400 font-bold">
              <td className="px-6 py-4 text-sm text-marble-800">Total</td>
              <td className="px-6 py-4"></td>
              {marbleTypes.map(type => (
                <td key={type.key} className="px-6 py-4 text-sm text-marble-800 text-right">
                  {subtotals[type.key] > 0 
                    ? `₹${subtotals[type.key].toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`
                    : '-'}
                </td>
              ))}
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden p-4 space-y-4">
        {murtis.map((murti, index) => (
          <motion.div
            key={murti.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-5 shadow-md border border-marble-200"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-marble-800 text-lg">{murti.statueName}</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(murti.id)}
                className="text-red-500 text-xl"
              >
                🗑️
              </motion.button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-marble-600 text-sm">Size:</span>
                <span className="text-marble-800 font-medium text-sm">{murti.size} ft</span>
              </div>
              <div className="border-t border-marble-200 pt-2 mt-2">
                <p className="text-marble-600 text-xs font-semibold mb-2">Marble Type Prices:</p>
                {marbleTypes.map(type => (
                  murti[type.key] && murti[type.key].trim() !== '' ? (
                    <div key={type.key} className="flex justify-between mb-1">
                      <span className="text-marble-600 text-sm">{type.label}:</span>
                      <span className="text-marble-800 font-semibold">
                        ₹{parseInt(murti[type.key], 10).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MurtiList

