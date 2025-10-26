import { motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { firms } from './FirmSelect'

function PDFGenerator({ documentType, firmName, customerName, customerPhone, customerAddress, advanceAmount, murtis, totalPrice }) {
  const generatePDF = () => {
    const doc = new jsPDF()
    const firm = firms.find(f => f.name === firmName)
    
    // Set font
    doc.setFont('helvetica')
    
    // Add decorative header
    doc.setFillColor(255, 245, 220) // Light gold background
    doc.rect(0, 0, 210, 45, 'F')
    
    // Firm Name
    doc.setFontSize(22)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(80, 50, 0) // Dark brown
    doc.text(firm.name, 105, 15, { align: 'center' })
    
    // Decorative line
    doc.setDrawColor(218, 165, 32) // Gold color
    doc.setLineWidth(0.5)
    doc.line(20, 20, 190, 20)
    
    // GST (if available)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    let yPos = 26
    if (firm.gst) {
      doc.text(`GST: ${firm.gst}`, 105, yPos, { align: 'center' })
      yPos += 5
    }
    
    // Address
    doc.setFontSize(9)
    const addressLines = doc.splitTextToSize(firm.address, 170)
    addressLines.forEach(line => {
      doc.text(line, 105, yPos, { align: 'center' })
      yPos += 4
    })
    
    // Contact Info
    doc.setFontSize(9)
    doc.text(`Email: ${firm.email}`, 105, yPos, { align: 'center' })
    yPos += 4
    doc.text(`Phone: ${firm.phones.join(' | ')}`, 105, yPos, { align: 'center' })
    
    // Date and Document Type Title
    yPos += 10
    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(80, 50, 0)
    doc.text(documentType.toUpperCase(), 20, yPos)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(100, 100, 100)
    const date = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    doc.text(`Date: ${date}`, 190, yPos, { align: 'right' })
    
    // Customer Information (if provided)
    if (customerName && customerName.trim()) {
      yPos += 7
      doc.setFontSize(10)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(80, 50, 0)
      doc.text(`Customer: ${customerName}`, 20, yPos)
    }
    
    if (customerPhone && customerPhone.trim()) {
      yPos += 5
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(80, 50, 0)
      doc.text(`Phone: ${customerPhone}`, 20, yPos)
    }
    
    if (customerAddress && customerAddress.trim()) {
      yPos += 5
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(80, 50, 0)
      doc.text(`Address: ${customerAddress}`, 20, yPos)
    }
    
    // Items Table
    yPos += 5
    const tableData = murtis.map((murti, index) => [
      index + 1,
      murti.godName,
      murti.quality,
      `${murti.size} ft`,
      `Rs. ${Number(murti.price).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`,
      murti.notes || '-'
    ])
    
    autoTable(doc, {
      startY: yPos,
      head: [['#', 'God Name', 'Quality', 'Size', 'Price', 'Notes']],
      body: tableData,
      theme: 'striped',
      headStyles: {
        fillColor: [218, 165, 32], // Gold
        textColor: [255, 255, 255],
        fontSize: 10,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        fontSize: 9,
        textColor: [60, 60, 60]
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 10 },
        1: { halign: 'left', cellWidth: 45 },
        2: { halign: 'center', cellWidth: 20 },
        3: { halign: 'center', cellWidth: 20 },
        4: { halign: 'right', cellWidth: 30 },
        5: { halign: 'left', cellWidth: 'auto' }
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      margin: { left: 20, right: 20 }
    })
    
    // Total Section
    const finalY = doc.lastAutoTable.finalY + 10
    
    // Calculate balance for orders with advance - ensure proper number handling
    const advance = documentType === 'Order' && advanceAmount && advanceAmount.trim() !== '' 
      ? Math.round(Number(advanceAmount)) 
      : 0
    const balance = Math.round(totalPrice - advance)
    
    // Total Amount Box
    doc.setFillColor(255, 245, 220)
    const boxHeight = documentType === 'Order' && advance > 0 ? 30 : 15
    doc.roundedRect(20, finalY, 170, boxHeight, 3, 3, 'F')
    
    doc.setFontSize(14)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(80, 50, 0)
    doc.text('Total Amount:', 25, finalY + 10)
    doc.text(`Rs. ${totalPrice.toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`, 185, finalY + 10, { align: 'right' })
    
    // Show advance and balance for orders
    if (documentType === 'Order' && advance > 0) {
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(60, 100, 60) // Green for advance
      doc.text('Advance Received:', 25, finalY + 20)
      doc.text(`Rs. ${advance.toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`, 185, finalY + 20, { align: 'right' })
      
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(200, 50, 50) // Red for balance
      doc.text('Balance Due:', 25, finalY + 30)
      doc.text(`Rs. ${balance.toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`, 185, finalY + 30, { align: 'right' })
    }
    
    // Footer
    const pageHeight = doc.internal.pageSize.height
    doc.setFontSize(10)
    doc.setFont('helvetica', 'italic')
    doc.setTextColor(150, 150, 150)
    doc.text('Thank you for your business!', 105, pageHeight - 20, { align: 'center' })
    
    doc.setFontSize(8)
    const footerText = documentType === 'Order' ? 'This is a computer-generated order confirmation.' : 'This is a computer-generated quotation.'
    doc.text(footerText, 105, pageHeight - 15, { align: 'center' })
    
    // Save PDF
    const fileName = `${documentType}_${firmName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(fileName)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <motion.button
        onClick={generatePDF}
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white font-bold py-5 px-12 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-xl inline-flex items-center gap-3"
      >
        <span className="text-2xl">📄</span>
        Create PDF {documentType}
        <span className="text-2xl">✨</span>
      </motion.button>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-marble-500 text-sm mt-4"
      >
        Generate a professional PDF with all {documentType.toLowerCase()} details
      </motion.p>
    </motion.div>
  )
}

export default PDFGenerator

