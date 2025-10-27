import { motion } from 'framer-motion'

const firms = [
  {
    name: 'MARBLE MOORTIS',
    gst: '08CEYPV0867EIZP',
    address: '3467, Vajpayee Bhawan, Kalyan Ji Ka Rasta, Chandpole Bazar, Jaipur',
    email: 'marblemoortis@gmail.com',
    phones: ['7877350555', '7690078269'],
    contact: 'Mr. Jitendra Vajpayee'
  },
  {
    name: 'SURAJ MOORTI KALA KENDRA',
    address: '3475, Kalyan Ji Ka Rasta, 1th Crossing, Chandpole Bazar, Chandpole, Pink City, Jaipur, Rajasthan 302001',
    email: 'smkk3467@gmail.com',
    phones: ['0141 2311864', '+91 9828340547', '+91 8890655797']
  },
]

function FirmSelect({ selectedFirm, setSelectedFirm }) {
  const currentFirm = firms.find(f => f.name === selectedFirm)

  return (
    <div className="mb-8">
      <label className="block text-marble-700 text-sm font-semibold mb-3">
        Select Firm
      </label>
      <select
        value={selectedFirm}
        onChange={(e) => setSelectedFirm(e.target.value)}
        className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 font-medium shadow-sm"
      >
        {firms.map(firm => (
          <option key={firm.name} value={firm.name}>
            {firm.name}
          </option>
        ))}
      </select>

      {/* Firm Details Preview */}
      <motion.div
        key={selectedFirm}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3 }}
        className="mt-4 p-5 bg-gradient-to-br from-gold-50 to-amber-50 rounded-2xl border border-gold-200"
      >
        <h3 className="font-bold text-marble-800 text-lg mb-2">{currentFirm.name}</h3>
        {currentFirm.gst && (
          <p className="text-sm text-marble-600 mb-1">
            <span className="font-semibold">GST:</span> {currentFirm.gst}
          </p>
        )}
        <p className="text-sm text-marble-600 mb-1">
          <span className="font-semibold">Address:</span> {currentFirm.address}
        </p>
        <p className="text-sm text-marble-600 mb-1">
          <span className="font-semibold">Email:</span> {currentFirm.email}
        </p>
        <p className="text-sm text-marble-600">
          <span className="font-semibold">Phone:</span> {currentFirm.phones.join(', ')}
        </p>
        {currentFirm.contact && (
          <p className="text-sm text-marble-600 mt-1 italic">
            Contact: {currentFirm.contact}
          </p>
        )}
      </motion.div>
    </div>
  )
}

export default FirmSelect
export { firms }

