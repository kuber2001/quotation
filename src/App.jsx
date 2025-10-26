import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import FirmSelect from './components/FirmSelect'
import MurtiForm from './components/MurtiForm'
import MurtiList from './components/MurtiList'
import PDFGenerator from './components/PDFGenerator'

function App() {
  const [documentType, setDocumentType] = useState('Quotation')
  const [selectedFirm, setSelectedFirm] = useState('MARBLE MOORTIS')
  const [customerName, setCustomerName] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [advanceAmount, setAdvanceAmount] = useState('')
  const [murtis, setMurtis] = useState([])

  const addMurti = (murti) => {
    setMurtis([...murtis, { ...murti, id: Date.now() }])
  }

  const removeMurti = (id) => {
    setMurtis(murtis.filter(murti => murti.id !== id))
  }

  const clearAll = () => {
    setMurtis([])
  }

  const totalPrice = murtis.reduce((sum, murti) => sum + Number(murti.price || 0), 0)

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card marble-texture rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 mb-8"
        >
          {/* Document Type Selection */}
          <div className="mb-8">
            <label className="block text-marble-700 text-sm font-semibold mb-3">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-gold-300 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-gradient-to-r from-gold-50 to-amber-50 text-marble-800 font-bold shadow-md text-lg"
            >
              <option value="Quotation">Quotation</option>
              <option value="Order">Order</option>
            </select>
          </div>

          <div className="border-t-2 border-marble-200 pt-6"></div>

          {/* Firm Selection */}
          <FirmSelect 
            selectedFirm={selectedFirm} 
            setSelectedFirm={setSelectedFirm} 
          />

          {/* Customer Information */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-marble-700 text-sm font-semibold mb-2">
                Customer Name (Optional)
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-marble-700 text-sm font-semibold mb-2">
                Customer Phone (Optional)
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm"
              />
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-marble-700 text-sm font-semibold mb-2">
                Customer Address (Optional)
              </label>
              <input
                type="text"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                placeholder="Enter customer address"
                className="w-full px-4 py-3 rounded-2xl border-2 border-marble-200 focus:border-gold-400 focus:outline-none focus:ring-2 focus:ring-gold-200 transition-all bg-white text-marble-800 shadow-sm"
              />
            </div>
          </div>

          {/* Advance Amount - Only for Orders */}
          {documentType === 'Order' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <label className="block text-marble-700 text-sm font-semibold mb-2">
                Advance Amount Received (Optional)
              </label>
              <input
                type="number"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                placeholder="Enter advance amount"
                className="w-full px-4 py-3 rounded-2xl border-2 border-green-300 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all bg-green-50 text-marble-800 shadow-sm font-semibold"
              />
            </motion.div>
          )}

          <div className="border-t border-marble-200 pt-6">
            <h3 className="text-lg font-bold text-marble-700 mb-4">Add Items to Quotation</h3>
            {/* Murti Form */}
            <MurtiForm onAdd={addMurti} />
          </div>
        </motion.div>

        {/* Murti List */}
        {murtis.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MurtiList 
              murtis={murtis} 
              onRemove={removeMurti}
              onClearAll={clearAll}
            />

            {/* Summary Section */}
            <div className="glass-card marble-texture rounded-3xl shadow-xl p-6 sm:p-8 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-marble-500 text-sm font-medium">Total Items</p>
                  <p className="text-3xl font-bold text-marble-800">{murtis.length}</p>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-marble-500 text-sm font-medium">Total Price</p>
                  <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                    ₹{totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                  </p>
                </div>
              </div>
            </div>

            {/* PDF Generator Button */}
            <PDFGenerator 
              documentType={documentType}
              firmName={selectedFirm}
              customerName={customerName}
              customerPhone={customerPhone}
              customerAddress={customerAddress}
              advanceAmount={advanceAmount}
              murtis={murtis} 
              totalPrice={totalPrice}
            />
          </motion.div>
        )}

        {/* Empty State */}
        {murtis.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="float-animation inline-block text-6xl mb-4">🪔</div>
            <p className="text-marble-400 text-lg">Add murti items to create your quotation</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default App

