import { motion } from 'framer-motion'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { firms } from './FirmSelect'
import { marbleTypes } from './MurtiForm'

function PDFGenerator({ documentType, firmName, customerName, customerPhone, customerAddress, advanceAmount, notes, murtis }) {
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
    
    // Calculate subtotals for each marble type
    const subtotals = marbleTypes.reduce((acc, type) => {
      acc[type.key] = murtis.reduce((sum, murti) => {
        const price = murti[type.key] && murti[type.key].trim() !== '' ? parseInt(murti[type.key], 10) : 0
        return sum + price
      }, 0)
      return acc
    }, {})
    
    const tableData = murtis.map((murti, index) => {
      const row = [
        index + 1,
        murti.statueName,
        `${murti.size} ft`
      ]
      // Add marble type prices
      marbleTypes.forEach(type => {
        const price = murti[type.key] && murti[type.key].trim() !== '' 
          ? `Rs. ${parseInt(murti[type.key], 10).toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`
          : '-'
        row.push(price)
      })
      return row
    })
    
    // Add subtotal row
    const subtotalRow = ['', 'Total', '']
    marbleTypes.forEach(type => {
      const total = subtotals[type.key] > 0 
        ? `Rs. ${subtotals[type.key].toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`
        : '-'
      subtotalRow.push(total)
    })
    tableData.push(subtotalRow)
    
    autoTable(doc, {
      startY: yPos,
      head: [['#', 'Statue Name', 'Size', ...marbleTypes.map(t => t.label)]],
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
        0: { halign: 'center', cellWidth: 8 },
        1: { halign: 'left', cellWidth: 38 },
        2: { halign: 'center', cellWidth: 18 },
        3: { halign: 'right', cellWidth: 21 },
        4: { halign: 'right', cellWidth: 21 },
        5: { halign: 'right', cellWidth: 21 },
        6: { halign: 'right', cellWidth: 21 },
        7: { halign: 'right', cellWidth: 21 }
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      margin: { left: 20, right: 20 },
      tableWidth: 'auto',
      didParseCell: function (data) {
        // Style the subtotal row
        if (data.row.index === tableData.length - 1) {
          data.cell.styles.fillColor = [255, 245, 220] // Gold background
          data.cell.styles.fontStyle = 'bold'
          data.cell.styles.textColor = [80, 50, 0]
        }
      }
    })
    
    // Get position after table
    let finalY = doc.lastAutoTable.finalY + 10
    
    // Grand Total Section - ONLY for Orders
    if (documentType === 'Order') {
      // Calculate grand total from all marble types
      const grandTotal = murtis.reduce((sum, murti) => {
        const vietnam = murti.vietnam && murti.vietnam.trim() !== '' ? parseInt(murti.vietnam, 10) : 0
        const makrana1st = murti.makrana1st && murti.makrana1st.trim() !== '' ? parseInt(murti.makrana1st, 10) : 0
        const makrana15 = murti.makrana15 && murti.makrana15.trim() !== '' ? parseInt(murti.makrana15, 10) : 0
        const makrana2nd = murti.makrana2nd && murti.makrana2nd.trim() !== '' ? parseInt(murti.makrana2nd, 10) : 0
        const black = murti.black && murti.black.trim() !== '' ? parseInt(murti.black, 10) : 0
        return sum + vietnam + makrana1st + makrana15 + makrana2nd + black
      }, 0)
      
      // Total Amount Box
      doc.setFillColor(255, 245, 220) // Gold background
      doc.roundedRect(20, finalY, 170, 15, 3, 3, 'F')
      
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(80, 50, 0)
      doc.text('Total Amount:', 25, finalY + 10)
      doc.text(`Rs. ${grandTotal.toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`, 185, finalY + 10, { align: 'right' })
      
      finalY += 25 // Move position down for next sections
    }
    
    // Notes Section (if provided)
    if (notes && notes.trim()) {
      const notesStartY = finalY + 5
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(80, 50, 0)
      doc.text('Notes:', 20, notesStartY)
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(60, 60, 60)
      const notesLines = doc.splitTextToSize(notes, 170)
      let notesY = notesStartY + 6
      notesLines.forEach(line => {
        doc.text(line, 20, notesY)
        notesY += 5
      })
    }
    
    // Advance Amount Section for Orders (if provided)
    if (documentType === 'Order' && advanceAmount && advanceAmount.toString().trim() !== '') {
      const advance = parseInt(advanceAmount, 10)
      const advanceY = notes && notes.trim() ? finalY + 35 : finalY + 5
      
      doc.setFillColor(220, 255, 220) // Light green background
      doc.roundedRect(20, advanceY, 170, 10, 2, 2, 'F')
      
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(60, 100, 60) // Green
      doc.text('Advance Amount Received:', 25, advanceY + 7)
      doc.text(`Rs. ${advance.toLocaleString('en-IN', { maximumFractionDigits: 0, minimumFractionDigits: 0 })}`, 185, advanceY + 7, { align: 'right' })
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

