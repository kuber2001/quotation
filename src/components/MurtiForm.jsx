import { useState } from 'react'
import { motion } from 'framer-motion'

const godNames = [
  'Radha Krishna',
  'Shankar Parvati',
  'Ganesh Ji',
  'Ram Darbar',
  'Shiv Parivar',
  'Custom'
]

const qualities = ['1st', '2nd', '3rd']

function MurtiForm({ onAdd }) {
  const [formData, setFormData] = useState({
    godName: 'Radha Krishna',
    customGodName: '',
    quality: '1st',
    size: '',
    price: '',
    notes: ''
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
    
    if (formData.godName === 'Custom' && !formData.customGodName.trim()) {
      newErrors.customGodName = 'Please enter custom god name'
    }
    
    if (!formData.size.trim()) {
      newErrors.size = 'Size is required'
    } else if (isNaN(formData.size) || parseFloat(formData.size) <= 0) {
      newErrors.size = 'Please enter valid size'
    }
    
    if (!formData.price.trim()) {
      newErrors.price = 'Price is required'
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Please enter valid price'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validate()) return

    const finalGodName = formData.godName === 'Custom' 
      ? formData.customGodName 
      : formData.godName

    onAdd({
      godName: finalGodName,
      quality: formData.quality,
      size: formData.size,
      price: formData.price,
      notes: formData.notes
    })

    // Reset form
    setFormData({
      godName: 'Radha Krishna',
      customGodName: '',
      quality: '1st',
      size: '',
      price: '',
      notes: ''
    })

    // Show success animation
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* God Name */}
      <div>
        <label className="block text-marble-700 text-sm font-semibold mb-2">
          God Name
        </label>
        <select
          name="godName"
          value={formData.godName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm"
        >
          {godNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      {/* Custom God Name */}
      {formData.godName === 'Custom' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <label className="block text-marble-700 text-sm font-semibold mb-2">
            Custom God Name
          </label>
          <input
            type="text"
            name="customGodName"
            value={formData.customGodName}
            onChange={handleChange}
            placeholder="Enter custom god name"
            className={`w-full px-4 py-3 rounded-2xl border-2 ${
              errors.customGodName ? 'border-red-400' : 'border-marble-200'
            } focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm`}
          />
          {errors.customGodName && (
            <p className="text-red-500 text-xs mt-1">{errors.customGodName}</p>
          )}
        </motion.div>
      )}

      {/* Quality and Size - Side by side on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Marble Quality */}
        <div>
          <label className="block text-marble-700 text-sm font-semibold mb-2">
            Marble Quality
          </label>
          <select
            name="quality"
            value={formData.quality}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm"
          >
            {qualities.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>

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
      </div>

      {/* Price */}
      <div>
        <label className="block text-marble-700 text-sm font-semibold mb-2">
          Price (₹)
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
          className={`w-full px-4 py-3 rounded-2xl border-2 ${
            errors.price ? 'border-red-400' : 'border-marble-200'
          } focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm`}
        />
        {errors.price && (
          <p className="text-red-500 text-xs mt-1">{errors.price}</p>
        )}
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-marble-700 text-sm font-semibold mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Any special requirements or notes..."
          className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm resize-none"
        />
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

