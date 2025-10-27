import { useState } from 'react'
import { motion } from 'framer-motion'

const statueNames = [
  'Radha Krishna',
  'Shankar Parvati',
  'Ganesh Ji',
  'Ram Darbar',
  'Shiv Parivar',
  'Durga Mata Ji',
  'Iskon Radha Krishna',
  'Mahadev',
  'Buddha',
  'Hanuman Ji',
  'Ganesh Laxmi Saraswati',
  'Murgan Swamy',
  'Jugal Radha Krishna',
  'Cow',
  'Shivling',
  'Custom'
]

const marbleTypes = [
  { key: 'vietnam', label: 'Vietnam' },
  { key: 'makrana1st', label: '1st' },
  { key: 'makrana15', label: '1.5' },
  { key: 'makrana2nd', label: '2nd' },
  { key: 'black', label: 'Black' }
]

function MurtiForm({ onAdd }) {
  const [formData, setFormData] = useState({
    statueName: 'Radha Krishna',
    customStatueName: '',
    size: '',
    vietnam: '',
    makrana1st: '',
    makrana15: '',
    makrana2nd: '',
    black: ''
  })

  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (formData.statueName === 'Custom' && !formData.customStatueName.trim()) {
      newErrors.customStatueName = 'Please enter custom statue name'
    }
    
    if (!formData.size.trim()) {
      newErrors.size = 'Size is required'
    } else if (isNaN(formData.size) || parseFloat(formData.size) <= 0) {
      newErrors.size = 'Please enter valid size'
    }
    
    // Check if at least one marble type has a price
    const hasPrice = marbleTypes.some(type => formData[type.key] && formData[type.key].trim() !== '')
    if (!hasPrice) {
      newErrors.prices = 'Please enter at least one marble type price'
    }
    
    // Validate each marble type price if provided
    marbleTypes.forEach(type => {
      if (formData[type.key] && formData[type.key].trim() !== '') {
        if (isNaN(formData[type.key]) || parseFloat(formData[type.key]) <= 0) {
          newErrors[type.key] = 'Please enter valid price'
        }
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return

    const finalStatueName = formData.statueName === 'Custom' 
      ? formData.customStatueName 
      : formData.statueName

    onAdd({
      statueName: finalStatueName,
      size: formData.size,
      vietnam: formData.vietnam,
      makrana1st: formData.makrana1st,
      makrana15: formData.makrana15,
      makrana2nd: formData.makrana2nd,
      black: formData.black
    })

    // Reset form
    setFormData({
      statueName: 'Radha Krishna',
      customStatueName: '',
      size: '',
      vietnam: '',
      makrana1st: '',
      makrana15: '',
      makrana2nd: '',
      black: ''
    })

    // Show success animation
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Statue Name */}
      <div>
        <label className="block text-marble-700 text-sm font-semibold mb-2">
          Statue Name
        </label>
        <select
          name="statueName"
          value={formData.statueName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm"
        >
          {statueNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Custom Statue Name */}
      {formData.statueName === 'Custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-marble-700 text-sm font-semibold mb-2">
            Custom Statue Name
          </label>
          <input
            type="text"
            name="customStatueName"
            value={formData.customStatueName}
            onChange={handleChange}
            placeholder="Enter custom statue name"
            className={`w-full px-4 py-3 rounded-2xl border-2 ${
              errors.customStatueName ? 'border-red-400' : 'border-marble-200'
            } focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm`}
          />
          {errors.customStatueName && (
            <p className="text-red-500 text-xs mt-1">{errors.customStatueName}</p>
          )}
        </motion.div>
      )}

      {/* Size */}
      <div>
        <label className="block text-marble-700 text-sm font-semibold mb-2">
          Size (in feet)
        </label>
        <input
          type="text"
          name="size"
          value={formData.size}
          onChange={handleChange}
          placeholder="e.g., 2.5"
          className={`w-full px-4 py-3 rounded-2xl border-2 ${
            errors.size ? 'border-red-400' : 'border-marble-200'
          } focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm`}
        />
        {errors.size && (
          <p className="text-red-500 text-xs mt-1">{errors.size}</p>
        )}
      </div>

      {/* Marble Type Prices */}
      <div>
        <label className="block text-marble-700 text-sm font-semibold mb-3">
          Marble Type Prices (Enter at least one)
        </label>
        {errors.prices && (
          <p className="text-red-500 text-xs mb-2">{errors.prices}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {marbleTypes.map(type => (
            <div key={type.key}>
              <label className="block text-marble-600 text-xs font-medium mb-1">
                {type.label}
              </label>
              <input
                type="number"
                name={type.key}
                value={formData[type.key]}
                onChange={handleChange}
                placeholder="Optional"
                className={`w-full px-4 py-3 rounded-2xl border-2 ${
                  errors[type.key] ? 'border-red-400' : 'border-marble-200'
                } focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm`}
              />
              {errors[type.key] && (
                <p className="text-red-500 text-xs mt-1">{errors[type.key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
      >
        {showSuccess ? (
          <span className="flex items-center justify-center gap-2">
            ✅ Added Successfully!
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            ➕ Add Murti
          </span>
        )}
      </motion.button>
    </form>
  )
}

export default MurtiForm
export { marbleTypes }

