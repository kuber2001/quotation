import { motion } from 'framer-motion'

function MurtiList({ murtis, onRemove, onClearAll }) {
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
                God Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-marble-600 uppercase tracking-wider">
                Quality
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-marble-600 uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-marble-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-marble-600 uppercase tracking-wider">
                Notes
              </th>
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
                  {murti.godName}
                </td>
                <td className="px-6 py-4 text-sm text-marble-600">
                  <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-700 font-semibold">
                    {murti.quality}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-marble-600">
                  {murti.size} ft
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-marble-800">
                  ₹{Number(murti.price).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                </td>
                <td className="px-6 py-4 text-sm text-marble-500 max-w-xs truncate">
                  {murti.notes || '-'}
                </td>
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
              <h3 className="font-bold text-marble-800 text-lg">{murti.godName}</h3>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => onRemove(murti.id)}
                className="text-red-500 text-xl"
              >
                🗑️
              </motion.button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-marble-600 text-sm">Quality:</span>
                <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-700 font-semibold text-sm">
                  {murti.quality}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-marble-600 text-sm">Size:</span>
                <span className="text-marble-800 font-medium text-sm">{murti.size} ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-marble-600 text-sm">Price:</span>
                <span className="text-marble-800 font-bold text-lg">
                  ₹{Number(murti.price).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                </span>
              </div>
              {murti.notes && (
                <div className="pt-2 border-t border-marble-200">
                  <span className="text-marble-600 text-xs">Notes:</span>
                  <p className="text-marble-700 text-sm mt-1">{murti.notes}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default MurtiList

